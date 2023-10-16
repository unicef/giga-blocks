import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateContributeDatumDto } from './dto/create-contribute-datum.dto';
import { UpdateContributeDatumDto } from './dto/update-contribute-datum.dto';
import { PrismaAppService } from '../prisma/prisma.service';
import { Status } from '@prisma/application';

@Injectable()
export class ContributeDataService {
  private readonly _logger = new Logger(ContributeDataService.name);
  constructor(private prisma: PrismaAppService) {}

  async create(createContributeDatumDto: CreateContributeDatumDto) {
    const createdData = await this.prisma.contributedData.create({
      data: { ...createContributeDatumDto },
    });
    return createdData;
  }

  async findAll() {
    const data = await this.prisma.contributedData.findMany();
    return data;
  }

  async findOne(id: string) {
    const data = await this.prisma.contributedData.findUnique({
      where: { id: id },
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

  async remove(id: string) {
    const deletedData = await this.prisma.contributedData.delete({
      where: { id: id },
    });
    if (deletedData) {
      return 'Contributed data deleted successfully.';
    }
  }

  async validate(id: string, isValid: boolean) {
    try {
      const contributedData = await this.prisma.contributedData.findUnique({
        where: { id: id },
      });
      let transaction;
      if (!contributedData) {
        throw new NotFoundException('Contributed data with such ID not found');
      }
      if (isValid) {
        transaction = await this.updateContribution(id, contributedData);
      } else {
        transaction = await this.prisma.$transaction([
          this.prisma.contributedData.update({
            data: { status: Status.Rejected },
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

  private async updateContribution(id: string, contributedData: any) {
    let transaction;
    const validateddata = await this.prisma.validatedData.findUnique({
      where: {
        school_Id: contributedData.school_Id,
      },
    });
    if (!validateddata) {
      const data = {
        school_Id: contributedData.school_Id,
        data: contributedData.contributed_data,
      };
      transaction = await this.prisma.$transaction([
        this.prisma.contributedData.update({
          data: { status: Status.Validated },
          where: { id: id },
        }),
        this.prisma.validatedData.create({
          data,
        }),
      ]);
    } else {
      const existingData = JSON.parse(validateddata.data as any);
      const newData = JSON.parse(contributedData.contributed_data as any);
      const mergedData = { ...existingData, ...newData };
      transaction = await this.prisma.$transaction([
        this.prisma.contributedData.update({
          data: { status: Status.Validated },
          where: { id: id },
        }),
        this.prisma.validatedData.update({
          data: {
            data: mergedData,
          },
          where: { school_Id: contributedData.school_Id },
        }),
      ]);
    }
    return transaction;
  }

  async updateSchoolData(id: string) {
    try {
      const validatedData = await this.prisma.validatedData.findUnique({
        where: {
          school_Id: id,
        },
      });
      const keyValue = Object.entries(validatedData.data);
      const dataToUpdate = Object.fromEntries(keyValue);
      const transaction = await this.prisma.$transaction([
        this.prisma.school.update({
          where: { id: id },
          data: {
            ...dataToUpdate,
          },
        }),
        this.prisma.validatedData.delete({
          where: { school_Id: id },
        }),
      ]);
      return transaction;
    } catch (err) {
      console.log(err);
    }
  }
}
