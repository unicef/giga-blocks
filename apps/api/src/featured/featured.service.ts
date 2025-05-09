import { Injectable, Logger } from '@nestjs/common';
import { CreateFeaturedDto } from './dto/create-featured.dto';
import { PrismaAppService } from '../prisma/prisma.service';

@Injectable()
export class FeaturedService {
  private readonly _logger = new Logger(FeaturedService.name);
  constructor(private prisma: PrismaAppService) {}
  async create(createFeaturedDto: CreateFeaturedDto, userId: string) {
    const data = await this.prisma.featureCountry.findFirst({
      where: {
        country_code: createFeaturedDto.country_code,
      },
    });
    if (data) {
      return this.prisma.featureCountry.update({
        where: {
          id: data.id,
        },
        data: {
          isFeatured: true,
          details: createFeaturedDto.details,
        },
      });
    }
    await this.prisma.featureCountry.updateMany({
      where: {
        isFeatured: true,
      },
      data: {
        isFeatured: false,
      },
    });
    await this.prisma.featureCountry.create({
      data: {
        country_code: createFeaturedDto.country_code,
        isFeatured: true,
        details: createFeaturedDto.details,
        createdBy: userId,
      },
    });
  }

  findAll() {
    return this.prisma.featureCountry.findMany();
  }

  async findFeatureSchool(query) {
    const { limit } = query;
    const featuredata = await this.prisma.featureCountry.findFirst({
      where: {
        isFeatured: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
    if (!featuredata) return 'No featured country found';
    const school = await this.prisma.school.findMany({
      where: {
        country: featuredata.country_code,
        minted: 'MINTED',
      },
      select: {
        theme: {
          select: {
            colorScheme: true,
          },
        },
        name: true,
        country: true,
        imageHash: true,
        id: true,
        giga_school_id: true,
        status: true,
      },
      take: limit || 5,
    });
    const details = {
      school: school,
      country_code: featuredata?.country_code,
      details: featuredata?.details,
    };
    return details;
  }
}
