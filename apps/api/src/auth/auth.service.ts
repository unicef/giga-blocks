import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { totp } from 'otplib';
import { generate } from 'otp-generator';
import { MailService } from '../mailer/mailer.service';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/user.dto';
import { AuthDto, AuthSendOtp, WalletRegister } from './dto';
import { bufferToHexString } from 'src/utils/string-format';
import * as crypto from 'crypto';

const algorithm = 'aes-256-cbc';
const secretKey = process.env.ENCODED_OTP_SECRET;
const iv = crypto.randomBytes(16);
const otpLength = Number(process.env.OTP_LENGTH);
@Injectable()
export class AuthService {
  private readonly _logger = new Logger('Auth Service');
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
    private mailService: MailService,
  ) {}
  async validateUser(email: string, otp: string) {
    try {
      const user = await this.userService.findOneByEmail(email);
      const otpres = await this.userService.validateOtp(email, otp);
      if (!user || (user && !user?.isActive) || !otpres)
        throw new NotFoundException('User not found');
      return user;
    } catch (err) {
      console.log(err);
      throw new NotFoundException(err.message);
    }
  }
  async validateWalletAddress(walletAddress: string): Promise<CreateUserDto> {
    const user = await this.userService.findOneByWalletAddress(walletAddress);
    if (user && user?.isActive) {
      return user;
    }
    if (!user) throw new NotFoundException('User not found');
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
      const otp = generate(otpLength, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      });
      if (otp) {
        this.mailService.sendOTP({ email: user?.email, otp: otp });
        this.userService.saveOtp(AuthDto, otp);
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
        this.userService.saveOtp(AuthDto, otp);
        return { success: true, msg: 'OTP sent successfully' };
      }
    }
    throw new NotFoundException('User not found');
  }
  async login(user: any) {
    this._logger.log(`Sending tokens to ${user?.email}`);
    const walletAddress = bufferToHexString(user?.walletAddress);
    const payload = {
      id: user.id,
      sub: {
        email: user.email,
        name: user.name,
        walletAddress: walletAddress,
        roles: user.roles,
      },
    };
    return {
      ...user,
      walletAddress,
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

  async adminWalletLogin(user: any) {
    if (!user?.roles?.includes('ADMIN')) throw new BadRequestException('Only admin can login');
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

  async sendMagicLink(AuthDto: AuthSendOtp) {
    this._logger.log(`Sending Magic Link to ${AuthDto?.email}`);
    const { email } = AuthDto;
    const user = await this.userService.findOneByEmail(email);
    if (user && user?.isActive) {
      this._logger.log(`Generating Magic Link to ${AuthDto?.email}`);
      const otp = generate(otpLength, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      });
      console.log('OTP:', otp);
      const encodedToken = this.encodeOtp(otp);
      console.log('Encoded Token:', encodedToken);
      if (otp) {

        this.mailService.sendMagicLink({ email: user?.email, token: otp });
        this.userService.saveOtp(AuthDto, otp);
        return { success: true, msg: 'Magic Link sent successfully' };
      }
    }
    throw new NotFoundException('User not found');

  }

  async verifyMagicLink(authDto: AuthDto) {
    const { email, otp } = authDto;
    const decodedToken = this.decodeOtp(otp);
    console.log('Decoded Token:', decodedToken);
    const user = await this.validateUser(email, decodedToken);
    if(user)
      return { success: true, msg: 'Magic Link verified successfully' };
  }

  encodeOtp(otp: string): string {
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);
    let encrypted = cipher.update(otp);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
  }

  decodeOtp(encodedOtp: string): string {
    const textParts = encodedOtp.split(':');
    const iv = Buffer.from(textParts.shift(), 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  }
}
