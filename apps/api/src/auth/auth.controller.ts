import { Body, Controller, Post, Request, UseGuards, Get } from '@nestjs/common';
import { totp } from 'otplib';

import { AuthService } from './auth.service';

import { AuthSendOtp, AuthWallet, RefreshToken, WalletRegister } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/user.dto';

import { LocalAuthGuard } from './guards/local.auth.guard';
import { Public } from '../common/decorators/public.decorator';
import { RefreshJWTGuard } from './guards/refresh.auth.guard';
import { WalletAuthGuard } from './guards/wallet.auth.guard';

import { ResponseMessage, Tokens } from './types';
import { SignatureAuthGuard } from './guards/signature.auth.guard';

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
  async login(@Request() req): Promise<CreateUserDto & Tokens> {
    return await this.authService.login(req.user);
  }

  @Public()
  @Post('/admin/send-otp')
  async sendAdminOtp(@Body() AuthDto: AuthSendOtp): Promise<ResponseMessage | null> {
    return this.authService.sendAdminOtp(AuthDto);
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

  @Public()
  @Get('/getnonce')
  async generateNonce() {
    return this.authService.generateNonce();
  }

  @Public()
  @UseGuards(SignatureAuthGuard)
  @Post('/walletRegister')
  async walletRegister(@Body() createUserDto: WalletRegister) {
    return this.authService.walletRegister(createUserDto);
  }

  @Public()
  @UseGuards(WalletAuthGuard)
  @Post('/walletlogin')
  async walletLogin(@Body() walletLogin: AuthWallet, @Request() req) {
    return this.authService.walletLogin(req.user);
  }

  @Public()
  @UseGuards(WalletAuthGuard)
  @Post('/admin/walletlogin')
  async adminWalletLogin(@Body() walletLogin: AuthWallet, @Request() req) {
    return this.authService.adminWalletLogin(req.user);
  }
}
