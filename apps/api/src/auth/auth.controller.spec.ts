import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/application';
import { PrismaAppService } from '../prisma/prisma.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/user.dto';
import { UsersService } from '../users/users.service';
import { MailService } from '../mailer/mailer.service';
import { BullModule, getQueueToken } from '@nestjs/bull';
import { bufferToHexString, hexStringToBuffer } from '../utils/string-format';

describe('AuthController', () => {
  let controller: AuthController;
  let prisma: PrismaClient;
  let authService: AuthService;

  const auth: CreateUserDto = {
    email: 'test@mailinator.com',
    name: 'test',
    walletAddress: '',
    roles: [],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        BullModule.forRoot({
          redis: {
            host: '127.0.0.1',
            port: 6379,
          },
        }),
      ],
      controllers: [AuthController],
      providers: [
        PrismaAppService,
        AuthService,
        JwtService,
        UsersService,
        MailService,
        { provide: getQueueToken('MAIL_QUEUE'), useValue: jest.fn() },
      ],
    }).compile();

    controller = module.get(AuthController);
    authService = module.get(AuthService);
    prisma = module.get(PrismaAppService);
  });

  describe('register', () => {
    it('should register a user', async () => {
      const exceptedResponse = { success: true, msg: '"User created successfully"' };
      jest.spyOn(authService, 'register').mockResolvedValue(exceptedResponse);
      const walletAddress = hexStringToBuffer(auth?.walletAddress);

      const register_user = await prisma.user.create({
        data: {
          email: auth.email,
          name: auth.name,
          walletAddress: walletAddress,
        },
      });

      const user_register = {
        email: register_user.email,
        name: register_user.name,
        walletAddress: bufferToHexString(register_user.walletAddress),
      };

      const result = await controller.register(user_register);
      expect(result).toEqual(exceptedResponse);
    });
  });
  describe('send-otp', () => {
    it('should send OTP', async () => {
      const sendOtpDto = { email: 'test@mailinator.com' };
      const exceptedResponse = { success: true, msg: '"User created successfully"' };

      jest.spyOn(authService, 'sendOtp').mockResolvedValue(exceptedResponse);

      const result = await controller.sendOtp(sendOtpDto);

      expect(result).toEqual(exceptedResponse);
    });
  });
  describe('login', () => {
    it('should return the result from AuthService', async () => {
      const user = { email: 'test@mailinator.com' };
      const tokens = { accessToken: 'mockAccessToken', refreshToken: 'mockRefreshToken' };
      const expectedResponse = { ...user, ...tokens };
      // Mock the authService.login to return the expected response
      jest.spyOn(authService, 'login').mockResolvedValue(expectedResponse);
      // Mock the req.user object and OTP validation
      const req = { user, otp: '123456' };

      const result = await controller.login(req);
      expect(result).toEqual(expectedResponse);
    });
  });
});
