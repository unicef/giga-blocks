import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateContributeDatumDto } from './dto/create-contribute-datum.dto';
import { UpdateContributeDatumDto } from './dto/update-contribute-datum.dto';
import { PrismaAppService } from '../prisma/prisma.service';
import { Prisma, Status } from '@prisma/application';
import { MailService } from 'src/mailer/mailer.service';
import { paginate } from 'src/utils/paginate';
import { QueueService } from 'src/mailer/queue.service';
import  generateP5Image from 'src/utils/p5/generateP5';

@Injectable()
export class ContributeDataService {
  private readonly _logger = new Logger(ContributeDataService.name);

  constructor(
    private prisma: PrismaAppService,
    private mailService: MailService,
    private queueService: QueueService,
  ) {}

  async create(createContributeDatumDto: CreateContributeDatumDto, userId: string) {
    const keyValue = Object.entries(JSON.parse(createContributeDatumDto.contributed_data));
    const data = [];
    for (const [key, value] of keyValue) {
      const createdData = await this.prisma.contributedData.create({
        data: {
          contributedUserId: userId,
          contributed_data: JSON.stringify({ [key]: value }),
          school_Id: createContributeDatumDto.school_Id,
        },
      });
      data.push(createdData);
    }
    return data;
  }

  async findAll(query) {
    const { page, perPage, schoolId, contributorId, status, order, orderBy, school } = query;
    const where: Prisma.ContributedDataWhereInput = {};
    if (schoolId) {
      where.school_Id = schoolId;
    }
    if (school){
      where.school = {
        name: {
          contains: school,
          mode: 'insensitive'
        }
      };
    }
    if (contributorId) {
      where.contributedUserId = contributorId;
    }
    if (status) {
      where.status = status;
    }
    if (status) {
      where.status = status;
    }
    const args = {
      where: where,
      include: {
        contributedUser: {
          select: {
            name: true,
          },
        },
        validatedUser: {
          select: {
            name: true,
          },
        },
        school: {
          select: {
            name: true,
          },
        },
      },
    }; 

    const contributedata = await paginate(
      this.prisma.contributedData,
      { ...args },
      {
        page,
        perPage,
        order,
        orderBy
      },
    );
    return contributedata;
  }

  async findOne(id: string) {
    const data = await this.prisma.contributedData.findUnique({
      where: { id: id },
      include: {
        contributedUser: {
          select: {
            name: true,
          },
        },
        validatedUser: {
          select: {
            name: true,
          },
        },
        school: {
          select: {
            name: true,
          },
        },
      },
    });
    if (!data) {
      throw new NotFoundException('Contributed data with such ID not found');
    }
    return data;
  }

  async update(id: string, updateContributeDatumDto: UpdateContributeDatumDto) {
    const updatedData = await this.prisma.contributedData.update({
      where: { id: id },
      data: updateContributeDatumDto,
    });
    return updatedData;
  }

  async batchValidate(ids: UpdateContributeDatumDto, userId: string) {
    return this.queueService.contributeData(ids, userId);
  }

  async remove(id: string) {
    const deletedData = await this.prisma.contributedData.delete({
      where: { id: id },
    });
    if (deletedData) {
      return 'Contributed data deleted successfully.';
    }
  }

  public async validate(id: string, isValid: boolean, userId: string) {
    try {
      const contributedData = await this.prisma.contributedData.findUnique({
        where: { id: id },
        include: {
          contributedUser: {
            select: {
              name: true,
              email: true,
            },
          },
          school: {
            select: {
              name: true,
            },
          },
        },
      });
      let transaction;
      if (!contributedData) {
        throw new NotFoundException('Contributed data with such ID not found');
      }
      if (isValid) {
        transaction = await this.updateContribution(id, contributedData, userId);
      } else {
        transaction = await this.prisma.$transaction([
          this.prisma.contributedData.update({
            data: { status: Status.Rejected, validatedBy: userId, validatedAt: new Date() },
            where: { id: id },
          }),
        ]);
      }
      return transaction;
    } catch (error) {
      this._logger.error(error);
      throw new InternalServerErrorException();
    }
  }

  private async updateContribution(id: string, contributedData: any, userId: string) {
    let transaction;
    const validateddata = await this.prisma.validatedData.findFirst({
      where: {
        school_Id: contributedData.school_Id,
        isArchived: false,
        approvedStatus: false,
      },
    });
    if (!validateddata) {
      const data = {
        school_Id: contributedData.school_Id,
        data: JSON.parse(contributedData.contributed_data),
        contributed_data: [id],
      };
      transaction = await this.prisma.$transaction([
        this.prisma.contributedData.update({
          data: { status: Status.Validated, validatedBy: userId, validatedAt: new Date() },
          where: { id: id },
        }),
        this.prisma.validatedData.create({
          data,
        }),
      ]);
    } else {
      const existingData = validateddata.data as any;
      const newData = JSON.parse(contributedData.contributed_data as any);
      const mergedData = { ...existingData, ...newData };
      transaction = await this.prisma.$transaction([
        this.prisma.contributedData.update({
          data: { status: Status.Validated, validatedBy: userId, validatedAt: new Date() },
          where: { id: id },
        }),
        this.prisma.validatedData.update({
          data: {
            data: mergedData,
            contributed_data: [...validateddata.contributed_data, id],
          },
          where: { id: validateddata.id },
        }),
      ]);
    }
    if (contributedData.contributedUser.email) {
      this.mailService.dataValidationEmail({
        email: contributedData.contributedUser.email,
        name: contributedData.contributedUser.name,
        school: contributedData.school.name,
      });
    }
    return transaction;
  }

  async getValidated(query) {
    try {
      const { page, perPage, status, school, order, orderBy } = query;
    const where: Prisma.ContributedDataWhereInput = {};
    if (school) {
      where.school_Id = school;
    }

    const args = {
      where: {
        ...where,
        isArchived: false,
        approvedStatus: status === 'true',
        inProgressStatus: false
      },
      include: {
        school: {
          select: {
            name: true,
          }
        },
        approved: {
          select: {
            name: true,
          },
        },
      },
    };
    if (status === 'true') {
      args.where.isArchived = true;
    } else {
      args.where.isArchived = false;
    } 

    const validatedDataRes = await paginate(
      this.prisma.validatedData,
      { ...args },
      {
        page,
        perPage,
        order,
        orderBy
      },
    );
    return validatedDataRes;
    } catch (error) {
      this._logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async getValidatedById(id: string) {
    const validatedData = await this.prisma.validatedData.findUnique({
      where: {
        id: id,
      },
      include: {
        school: {
          select: {
            name: true,
          },
          
        },
        approved: {
          select: {
            name: true,
          },
        },
      },
    });

    return validatedData;
  }
}
