import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Prisma } from '@prisma/application';
import { UpdateSchoolDto } from './dto/update-schools.dto';
import { PrismaAppService } from 'src/prisma/prisma.service';
import { ListSchoolDto } from './dto/list-schools.dto';
import { paginate } from 'src/utils/paginate';
import { QueueService } from 'src/mailer/queue.service';
import { getBatchandAddressfromSignature } from 'src/utils/web3/wallet';
import { Role } from '@prisma/application';
import { MintQueueDto, MintQueueSingleDto } from './dto/mint-queue.dto';
import { hexStringToBuffer } from '../utils/string-format';

@Injectable()
export class SchoolService {
  constructor(private prisma: PrismaAppService, private readonly queueService: QueueService) {}

  async findAll(query: ListSchoolDto) {
    const { page, perPage, minted } = query;
    const where: Prisma.SchoolWhereInput = {
      deletedAt: null,
    };
    if (minted) {
      where.minted = minted;
    }

    return paginate(
      this.prisma.school,
      { where },
      {
        page,
        perPage,
      },
    );
  }

  async queueOnchainData(data: number) {
    return this.queueService.sendTransaction(data);
  }

  async checkAdmin(address: string) {
    const buffAddress = hexStringToBuffer(address);
    const admin = await this.prisma.user.findUnique({
      where: {
        walletAddress: buffAddress,
      },
    });
    if (admin && admin.roles.includes(Role.ADMIN)) {
      return true;
    }
    throw new UnauthorizedException('You wallet is not an admin wallet');
  }

  async checkAdminandMintQueue(MintData: MintQueueDto) {
    const { address } = getBatchandAddressfromSignature(MintData.signatureWithData);

    if (await this.checkAdmin(address)) {
      return this.queueService.sendMintNFT(address, MintData);
    }
  }

  async checkAdminandSingleMintQueue(MintData: MintQueueSingleDto) {
    const { address } = getBatchandAddressfromSignature(MintData.signatureWithData);
    return this.queueService.sendSingleMintNFT(address, MintData);
  }

  async findOne(id: string) {
    return await this.prisma.school.findUnique({
      where: {
        id,
      },
    });
  }

  async countSchools(query: ListSchoolDto) {
    return await this.prisma.school.count({
      where: {
        ...query,
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
