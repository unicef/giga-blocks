import { ForbiddenException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { PrismaAppService } from '../prisma/prisma.service';
import { bufferToHexString, hexStringToBuffer } from '../utils/string-format';
import { WalletRegister } from 'src/auth/dto';
import { Prisma, Role } from '@prisma/application';
import { paginate } from 'src/utils/paginate';
import { addMinutesToDate, compare } from 'src/utils/otp/expirationTime';

const OTP_DURATION = Number(process.env.OTP_DURATION_IN_MINS);
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
    createUserDto.email = createUserDto.email.toLowerCase();
    return this.prisma.user.create({
      data: {
        ...createUserDto,
        walletAddress,
        roles,
      },
    });
  }

  async saveOtp(AuthDto: any, otp: string) {
    const now = new Date();
    const email = AuthDto.email;
    const user = await this.prisma.user.findUnique({ where: { email } });
    const expirationTime = addMinutesToDate(now, OTP_DURATION);
    if (user) {
      const otpUser = await this.prisma.oTP.findUnique({ where: { userId: user.id } });
      if (otpUser) {
        return await this.prisma.oTP.update({
          where: { userId: user.id },
          data: { otp, validated: false, expirationTime },
        });
      }
      return await this.prisma.oTP.create({
        data: {
          otp,
          userId: user.id,
          validated: false,
          expirationTime,
        },
      });
    }
  }

  async validateOtp(email: any, otp: string) {
    const now = new Date();
    const user = await this.findOneByEmail(email);

    const { id: userId } = user;
    const otpUser = await this.prisma.oTP.findUnique({ where: { userId } });

    if (!otpUser) return new NotFoundException('No user with this id');

    const { id: otpUserId, validated, expirationTime, otp: dbOTP } = otpUser;

    if (!otpUserId) return new NotFoundException('Invalid OTP');

    if (validated) return new NotFoundException('OTP already used');

    if (otp != dbOTP) return new NotFoundException('OTP didnot match');

    if (!compare(now, expirationTime)) return new ForbiddenException('OTP expired');

    await this.prisma.oTP.update({ where: { id: otpUserId }, data: { validated: true } });
    return user;
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
    createUserDto.email = createUserDto.email.toLowerCase();
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
        email: email,
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
}
