import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateSeasonDto } from './dto/create-seasons.dto';
import { PrismaAppService } from '../prisma/prisma.service';

@Injectable()
export class SeasonService {
  constructor(private prisma: PrismaAppService) {}
  private readonly _logger = new Logger(SeasonService.name);

  async create(createSeasonDto: CreateSeasonDto) {
    try {
      const createdSeason = await this.prisma.season.create({
        data: createSeasonDto,
      });
      return createdSeason;
    } catch (error) {
      this._logger.error(`Error while creating season: ${error}`);
    }
  }

  async findAll() {
    const allSeason = await this.prisma.season.findMany();

    if (!allSeason) throw new NotFoundException('No season in DB');

    return allSeason;
  }

  async findOne(id: string) {
    try {
      const oneSeason = await this.prisma.season.findUnique({
        where: { id: id },
      });
      return oneSeason;
    } catch (error) {
      this._logger.error(`Error while creating season: ${error}`);
      throw new NotFoundException(`Couldn't find season with such ID.`);
    }
  }

  async remove(id: string) {
    // Check if season with such ID exists

    const seasonWithId = this.prisma.season.findUnique({ where: { id: id } });
    if (!seasonWithId) throw new NotFoundException('No season with such id');

    await this.prisma.season.delete({
      where: { id: id },
    });
    return `Season ${id} deleted successfully.`;
  }
}
