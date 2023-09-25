import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/application';
import { UpdateSchoolDto } from './dto/update-schools.dto';
import { PrismaAppService } from 'src/prisma/prisma.service';
import { ListSchoolDto } from './dto/list-schools.dto';
import { paginate } from 'src/utils/paginate';

@Injectable()
export class SchoolService {
  constructor(private prisma: PrismaAppService) {}

  async findAll(query: ListSchoolDto) {
    const { page, perPage } = query;
    const where: Prisma.SchoolWhereInput = {
      deletedAt: null,
    };

    return paginate(
      this.prisma.school,
      { where },
      {
        page,
        perPage,
      },
    );
  }

  async findOne(id: string) {
    return await this.prisma.school.findUnique({
      where: {
        id,
      },
    });
  }

  async byCountry(country: string) {
    const firstLetter = country.charAt(0);
    if (firstLetter === firstLetter.toUpperCase()) {
      return await this.prisma.school.findMany({
        where: {
          country: country,
        },
      });
    } else {
      const capitalizedLetter = firstLetter.toUpperCase();
      const restOfTheString = country.slice(1);
      return await this.prisma.school.findMany({
        where: {
          country: `${capitalizedLetter}${restOfTheString}`,
        },
      });
    }
  }

  update(id: number, updateSchoolDto: UpdateSchoolDto) {
    return `This action updates a #${id} school`;
  }

  async removeAll() {
    return await this.prisma.school.deleteMany();
  }
}
