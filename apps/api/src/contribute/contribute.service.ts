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
      const contributedData = await this.findOne(id);
      let transaction;
      if (!contributedData) {
        throw new NotFoundException('Contributed data with such ID not found');
      }
      if (isValid) {
        transaction = await this.prisma.$transaction([
          this.prisma.contributedData.update({
            data: { status: Status.Validated },
            where: { id: id },
          }),
        ]);
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
}
