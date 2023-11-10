import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { PrismaAppService } from '../prisma/prisma.service';
import { bufferToHexString, hexStringToBuffer } from '../utils/string-format';
import { WalletRegister } from 'src/auth/dto';
import { Prisma } from '@prisma/application';
import { paginate } from 'src/utils/paginate';
import { Role } from '@prisma/application';

@Injectable()
export class UsersService {
  private readonly _logger = new Logger('User Services');
  constructor(private prisma: PrismaAppService) {}

  async register(createUserDto: CreateUserDto) {
    this._logger.log(`Registering new user: ${createUserDto?.email}`);
    const walletAddress = hexStringToBuffer(createUserDto?.walletAddress);
    let roles = [];
    if (!createUserDto.roles) {
      roles = [Role.CONTRIBUTOR];
    }
    return this.prisma.user.create({
      data: {
        ...createUserDto,
        walletAddress,
        roles,
      },
    });
  }

  async walletRegister(createUserDto: Pick<WalletRegister, 'name' | 'walletAddress'>) {
    const walletAddress = hexStringToBuffer(createUserDto?.walletAddress);
    const userData = {
      name: createUserDto?.name,
      walletAddress,
      email: '',
      roles: [Role.CONTRIBUTOR],
    };
    return this.prisma.user.create({
      data: userData,
    });
  }

  async addAdmin(createUserDto: CreateUserDto) {
    this._logger.log(`Creating new user: ${createUserDto?.email}`);
    const walletAddress = hexStringToBuffer(createUserDto?.walletAddress);
    return this.prisma.user.create({
      data: {
        ...createUserDto,
        walletAddress,
        roles: ['ADMIN'],
      },
    });
  }

  findAll(query: any) {
    const { page, perPage } = query;

    const where: Prisma.UserWhereInput = {};
    if (query?.role) {
      where.roles = {
        has: query.role,
      };
    }
    if (query.name) {
      where.name = {
        contains: query.name,
        mode: 'insensitive',
      };
    }
    return paginate(this.prisma.user, { where }, { page, perPage });
  }

  findContributor(query: any) {
    const { page, perPage } = query;

    const where: Prisma.UserWhereInput = {};

    where.roles = {
      has: Role.CONTRIBUTOR,
    };

    if (query.name) {
      where.name = {
        contains: query.name,
        mode: 'insensitive',
      };
    }
    return paginate(this.prisma.user, { where }, { page, perPage });
  }

  async findContributorDetails(id) {
    const data = await this.prisma.user.findUnique({
      where: { id },
      include: {
        ContributedData: {
          include: {
            school: {
              select: { name: true },
            },
          },
        },
      },
    });
    return data;
  }

  async findOne(id: string) {
    const res = await this.prisma.user.findUnique({
      where: {
        id,
        isArchived: false,
      },
    });
    const user = {
      ...res,
      walletAddress: bufferToHexString(res.walletAddress),
    };
    return user;
  }

  update(id: string, updateUserDto: Omit<UpdateUserDto, 'walletAddress'>) {
    this._logger.log(`Updating user: ${id}`);
    const updateData = { ...updateUserDto };
    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        ...updateData,
      },
    });
  }

  remove(id: string) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        isArchived: true,
      },
    });
  }

  async findOneByEmail(email: string): Promise<any> {
    return await this.prisma.user.findUnique({
      where: {
        email: email.toLowerCase(),
        isArchived: false,
      },
    });
  }

  async findOneByWalletAddress(walletAddress: string): Promise<any> {
    const walletBuffer = hexStringToBuffer(walletAddress);
    return await this.prisma.user.findUnique({
      where: { walletAddress: walletBuffer, isArchived: false },
    });
  }

  // async requestValidator(createUserDto: CreateUserDto) {
  //   return await this.prisma.user.create({
  //     data: {
  //       email: createUserDto?.email,
  //       roles: ['PENDING'],
  //       name: createUserDto?.name,
  //     },
  //   });
  // }

  // async approveValidator(id: string) {
  //   return await this.prisma.user.update({
  //     where: {
  //       id,
  //     },
  //     data: {
  //       roles: ['VALIDATOR'],
  //     },
  //   });
  // }
}
