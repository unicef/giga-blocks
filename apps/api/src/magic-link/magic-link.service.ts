import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { generate } from 'otp-generator';
import { MailService } from '../mailer/mailer.service';
import * as crypto from 'crypto';
import { UsersService } from '../users/users.service';
import { addMinutesToDate, compare } from 'src/utils/otp/expirationTime';
import { PrismaAppService } from 'src/prisma/prisma.service';
import { SendMagicLinkDto, VerifyMagicLinkDto } from './dto/magic-link.dto';

const algorithm = 'aes-256-cbc';
const secretKey = process.env.ENCODED_OTP_SECRET;
const iv = crypto.randomBytes(16);
const otpLength = Number(process.env.OTP_LENGTH);
const OTP_DURATION = Number(process.env.NEXT_PUBLIC_OTP_DURATION_IN_MINS);
let WEB_LINK = process.env.NEXT_PUBLIC_WEB_NAME;

@Injectable()
export class MagicLinkService {
  private readonly _logger = new Logger('Auth Service');
  constructor(private mailService: MailService, private prisma: PrismaAppService) {}

  async sendMagicLink(AuthDto: SendMagicLinkDto) {
    this._logger.log(`Sending Magic Link to ${AuthDto?.email}`);
    const { email, redirectlink } = AuthDto;
    // const user = await this.userService.findUserActivationByEmail(email);
    // if (user && user?.isActive) {
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
      if (redirectlink) WEB_LINK = redirectlink;
      const link = `${WEB_LINK}&token=${encodedToken}&redirect=${WEB_LINK}`;
      this.mailService.sendMagicLink({ email: email, link });
      this.saveOtp(email, otp);
      return { success: true, msg: link };
    }
    throw new NotFoundException('User not found');
  }

  async verifyMagicLink(authDto: VerifyMagicLinkDto) {
    const { email, otp } = authDto;
    const decodedToken = this.decodeOtp(otp);
    console.log('Decoded Token:', decodedToken);
    const otpres = await this.validateOtp(email, decodedToken);
    if (otpres) return { success: true, msg: 'Magic Link verified successfully' };
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

  async saveOtp(email: string, otp: string) {
    const now = new Date();
    const expirationTime = addMinutesToDate(now, OTP_DURATION);
    const otpEmail = await this.prisma.magicLinkOtp.findUnique({ where: { email } });
    if (otpEmail) {
      return await this.prisma.magicLinkOtp.update({
        where: { email },
        data: { otp, validated: false, expirationTime },
      });
    }
    return await this.prisma.magicLinkOtp.create({
      data: {
        otp,
        email,
        validated: false,
        expirationTime,
      },
    });
  }
  async validateOtp(email: any, otp: string) {
    const now = new Date();
    const otpEmail = await this.prisma.magicLinkOtp.findUnique({ where: { email } });
    if (!otpEmail) throw new NotFoundException('No user with this email');
    const { email: emailId, validated, expirationTime, otp: dbOTP } = otpEmail;
    if (!emailId) throw new NotFoundException('Invalid Link');
    if (validated) throw new NotFoundException('Link  already used');
    if (otp != dbOTP) throw new NotFoundException('Link didnot match');
    if (!compare(now, expirationTime)) throw new ForbiddenException('Link expired');
    await this.prisma.magicLinkOtp.update({ where: { email }, data: { validated: true } });
    return true;
  }
}
