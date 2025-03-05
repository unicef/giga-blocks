import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { generate } from 'otp-generator';
import { MailService } from '../mailer/mailer.service';
import * as crypto from 'crypto';
import { AuthSendOtp, AuthDto } from 'src/auth/dto';
import { UsersService } from '../users/users.service';



const algorithm = 'aes-256-cbc';
const secretKey = process.env.ENCODED_OTP_SECRET;
const iv = crypto.randomBytes(16);
const otpLength = Number(process.env.OTP_LENGTH);


@Injectable()
export class MagicLinkService {
    private readonly _logger = new Logger('Auth Service');
      constructor(
        private jwtService: JwtService,
        private userService: UsersService,
        private mailService: MailService,
      ) {}


    async sendMagicLink(AuthDto: AuthSendOtp) {
        this._logger.log(`Sending Magic Link to ${AuthDto?.email}`);
        const { email } = AuthDto;
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
    
            // this.mailService.sendMagicLink({ email: email, token: otp });
            // this.userService.saveOtp(AuthDto, otp);
            return { success: true, msg: 'Magic Link sent successfully' };
          // }
        }
        throw new NotFoundException('User not found');
    
      }
    
      async verifyMagicLink(authDto: AuthDto) {
        const { email, otp } = authDto;
        const decodedToken = this.decodeOtp(otp);
        console.log('Decoded Token:', decodedToken);
        // const user = await this.userService.findUserActivationByEmail(email);
        // const otpres = await this.userService.validateOtp(email, decodedToken);
        // if(otpres) 
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