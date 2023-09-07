import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { totp } from 'otplib';

import { AuthService } from './auth.service';

import { AuthDto, AuthSendOtp, RefreshToken } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/user.dto';

import { LocalAuthGuard } from './guards/local.auth.guard';
import { Public } from '../common/decorators/public.decorator';
import { RefreshJWTGuard } from './guards/refresh.auth.guard';

import { ResponseMessage, Tokens } from './types';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {
    totp.options = {
      step: +process.env.OTP_DURATION_IN_SECS,
    };
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Body() loginUser: AuthDto): Promise<CreateUserDto & Tokens> {
    return await this.authService.login(req.user);
  }

  @Public()
  @Post('register')
  register(@Body() createUserDto: CreateUserDto): Promise<ResponseMessage | null> {
    return this.authService.register(createUserDto);
  }

  @Public()
  @Post('send-otp')
  async sendOtp(@Body() AuthDto: AuthSendOtp): Promise<ResponseMessage | null> {
    return this.authService.sendOtp(AuthDto);
  }

  @Public()
  @UseGuards(RefreshJWTGuard)
  @Post('refresh')
  async refresh(
    @Request() req,
    @Body() RefreshToken: RefreshToken,
  ): Promise<Omit<Tokens, 'refresh_token'>> {
    return this.authService.refreshToken(req.user);
  }
}
