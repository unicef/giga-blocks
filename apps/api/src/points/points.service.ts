import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreatePointDto } from './dto/create-point.dto';
import { UpdatePointDto } from './dto/update-point.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PointsService {
  private readonly _logger = new Logger(PointsService.name);
  constructor(private readonly prisma: PrismaService) {}

  async create(createPointDto: CreatePointDto) {
    let point;
    try {
      point = await this.prisma.points.create({
        data: createPointDto,
      });
    } catch (error) {
      this._logger.error(error);
      throw new InternalServerErrorException();
    }
    return point;
  }

  async findAll(query: { user_id?: string; season_id?: string; createdBy?: string }) {
    let points;
    try {
      points = await this.prisma.points.findMany({ where: query });
    } catch (error) {
      this._logger.error(error);
      throw new InternalServerErrorException();
    }
    return points;
  }

  async findOne(id: number) {
    let point;
    try {
      point = await this.prisma.points.findUnique({
        where: { id },
        include: { user: true },
      });
    } catch (error) {
      this._logger.error(error);
      throw new InternalServerErrorException();
    }
    return point;
  }

  async update(id: number, updatePointDto: UpdatePointDto) {
    let point;
    try {
      point = await this.prisma.points.update({
        where: { id },
        data: updatePointDto,
      });
    } catch (error) {
      this._logger.error(error);
      throw new InternalServerErrorException();
    }
    return point;
  }

  async remove(id: number) {
    let point;
    try {
      point = await this.prisma.points.delete({
        where: { id },
      });
    } catch (error) {
      this._logger.error(error);
      throw new InternalServerErrorException();
    }
    return point;
  }
}
