import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { PrismaAppService } from '../prisma/prisma.service';
import { bufferToHexString, hexStringToBuffer } from '../utils/string-format';
import { WalletRegister } from 'src/auth/dto';

@Injectable()
export class UsersService {
  private readonly _logger = new Logger('User Services');
  constructor(private prisma: PrismaAppService) {}

  async register(createUserDto: CreateUserDto) {
    this._logger.log(`Registering new user: ${createUserDto?.email}`);
    const walletAddress = hexStringToBuffer(createUserDto?.walletAddress);
    return this.prisma.user.create({
      data: {
        ...createUserDto,
        walletAddress,
      },
    });
  }

  async walletRegister(createUserDto: Pick<WalletRegister, 'name' | 'walletAddress'>) {
    const walletAddress = hexStringToBuffer(createUserDto?.walletAddress);
    const userData = {
      name: createUserDto?.name,
      walletAddress,
      email: '',
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

  findAll() {
    return this.prisma.user.findMany({ where: { isArchived: false } });
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
      where: { email, isArchived: false },
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
