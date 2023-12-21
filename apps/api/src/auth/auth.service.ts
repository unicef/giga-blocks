import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { totp, hotp, authenticator } from 'otplib';
import {generate} from 'otp-generator'

import { MailService } from '../mailer/mailer.service';
import { UsersService } from '../users/users.service';

import { CreateUserDto } from '../users/dto/user.dto';
import { AuthDto, WalletRegister } from './dto';
import { bufferToHexString } from 'src/utils/string-format';

const otpLength:number = Number(process.env.OTP_LENGTH)
@Injectable()
export class AuthService {
  private readonly _logger = new Logger('Auth Service');
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
    private mailService: MailService
  ) {}
  
  async validateUser(email: string, otp: string) {
    const user = await this.userService.findOneByEmail(email);
    if (!user || (user && !user?.isActive)) throw new NotFoundException('User not found');

    return await this.userService.validateOtp(email, otp)
  }

  async validateWalletAddress(walletAddress: string): Promise<CreateUserDto> {
    const user = await this.userService.findOneByWalletAddress(walletAddress);
    if (user && user?.isActive) {
      return user;
    }
    throw new NotFoundException('User not found');
  }

  async register(createUserDto: CreateUserDto) {
    const user = await this.userService.register(createUserDto);
    if (user) {
      this.mailService.welcome({ email: user?.email, name: user?.name });
      return { success: true, msg: 'User created successfully' };
    }
    throw new BadRequestException('Bad Request');
  }

  async sendAdminOtp(AuthDto: Omit<AuthDto, 'otp'>) {
    this._logger.log(`Sending Login OTP to ${AuthDto?.email}`);
    const { email } = AuthDto;
    const user = await this.userService.findOneByEmail(email);
    if (user && !user?.roles?.includes('ADMIN')) {
      throw new BadRequestException('Only admin  can login');
    }
    if (user && user?.isActive) {
      this._logger.log(`Generating Login OTP to ${AuthDto?.email}`);
      const token = totp.generate(email);
      const otp = generate(otpLength, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      });
      console.log(otp)
      if (otp) {
        this.mailService.sendOTP({ email: user?.email, otp: otp });
        this.userService.saveOtp(AuthDto, otp)
        return { success: true, msg: 'OTP sent successfully' };
      }
    }
    throw new NotFoundException('User not found');
  }

  async sendOtp(AuthDto: Omit<AuthDto, 'otp'>) {
    this._logger.log(`Sending Login OTP to ${AuthDto?.email}`);
    const { email } = AuthDto;
    const user = await this.userService.findOneByEmail(email);
    if (user && user?.isActive) {
      this._logger.log(`Generating Login OTP to ${AuthDto?.email}`);
      const otp = generate(otpLength, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      });
      if (otp) {
        this.mailService.sendOTP({ email: user?.email, otp: otp });
        this.userService.saveOtp(AuthDto, otp)
        return { success: true, msg: 'OTP sent successfully' };
      }
    }
    throw new NotFoundException('User not found');
  }

  async login(user: any) {
    this._logger.log(`Sending tokens to ${user?.email}`);
    const payload = {
      id: user.id,
      sub: {
        email: user.email,
        name: user.name,
        walletAddress: user.walletAddress,
        roles: user.roles,
      },
    };
    return {
      ...user,
      access_token: this.jwtService.sign(payload, {
        expiresIn: +process.env.JWT_EXPIRATION_TIME,
      }),
      refresh_token: this.jwtService.sign(payload, {
        expiresIn: +process.env.JWT_EXPIRATION_LONG_TIME,
      }),
    };
  }

  async refreshToken(user: any) {
    this._logger.log(`Generating access token to ${user?.email}`);
    const payload = {
      id: user.id,
      sub: {
        email: user.email,
        name: user.name,
        walletAddress: user.walletAddress,
        roles: user.roles,
      },
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async walletRegister(createUserDto: Pick<WalletRegister, 'name' | 'walletAddress'>) {
    this._logger.log(`Creating new user ${createUserDto.walletAddress}`);
    const user = await this.userService.findOneByWalletAddress(createUserDto.walletAddress);
    if (user) throw new Error('User already registered');
    const newuser = await this.userService.walletRegister(createUserDto);
    if (newuser) {
      const payload = {
        id: newuser.id,
        sub: {
          email: newuser.email,
          name: newuser.name,
          walletAddress: newuser.walletAddress,
          roles: newuser.roles,
        },
      };
      const result = {
        ...newuser,
        walletAddress: createUserDto.walletAddress,
        access_token: this.jwtService.sign(payload),
        refresh_token: this.jwtService.sign(payload, {
          expiresIn: +process.env.JWT_EXPIRATION_LONG_TIME,
        }),
      };
      return { sucess: true, msg: 'User created successfully', result };
    }
    throw new BadRequestException('Bad Request');
  }

  async walletLogin(user: any) {
    const payload = {
      id: user.id,
      sub: {
        email: user.email,
        name: user.name,
        walletAddress: user.walletAddress,
        roles: user.roles,
      },
    };
    const walletAddress = bufferToHexString(user?.walletAddress);
    const result = {
      ...user,
      walletAddress,
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, {
        expiresIn: +process.env.JWT_EXPIRATION_LONG_TIME,
      }),
    };
    return result;
  }

  async generateNonce() {
    const nonce = totp.generate(process.env.OTP_SECRET);
    return { nonce };
  }
}
