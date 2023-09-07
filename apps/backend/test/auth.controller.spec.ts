import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../src/auth/auth.controller';
import { AuthService } from '../src/auth/auth.service';
import { AuthDto } from '../src/auth/dto';
import { PrismaService } from '../src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { execSync } from 'child_process';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  let prisma: PrismaService;

  const result = {
    access_token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkMTJjOGM2ZS1hOTUxLTRiYWItOTk0Ny1hM2EzOTRhYTVjM2QiLCJlbWFpbCI6ImFudTJAbWFpbGluYXRvci5jb20iLCJpYXQiOjE2OTE1OTI4OTUsImV4cCI6MTY5MTU5Mzc5NX0.SUDxn8KI91J2gRl085Ak_QE6-iHLAVR7ACqYwfqLbNg',
    refresh_token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkMTJjOGM2ZS1hOTUxLTRiYWItOTk0Ny1hM2EzOTRhYTVjM2QiLCJlbWFpbCI6ImFudTJAbWFpbGluYXRvci5jb20iLCJpYXQiOjE2OTE1OTI4OTUsImV4cCI6MTY5MjE5NzY5NX0.2d2WaHSLORSs9DBw-9At8P-Dy1JBAPumT8QMlY2LpZM',
  };

  const auth: AuthDto = {
    email: 'anu2@mailinator.com',
    otp: '',
    roles: [],
  };
  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, JwtService, PrismaService],
    }).compile();

    authController = moduleRef.get<AuthController>(AuthController);
    authService = moduleRef.get<AuthService>(AuthService);
  });

  describe('Signup', () => {
    it('should return an object with access_token and refresh_token', async () => {
      //Create a spy on the `signUp` method of the authService
      const spy = jest.spyOn(authService, 'signUp');

      //mock the implementation of the `signUp` method
      spy.mockImplementation(async auth => result);

      //call the controller signup method
      const signUpResult = await authController.signUp(auth);

      //assert that the signUp method is called and it returns the result
      expect(signUpResult).toBe(result);
      expect(spy).toBeCalledWith(auth);
    });
  });

  describe('Signin', () => {
    it('should return an object with access_token and refresh_token', async () => {
      //Create a spy on the `signUp` method of the authService
      const spy = jest.spyOn(authService, 'signIn');

      //mock the implementation of the `signUp` method
      spy.mockImplementation(async auth => result);

      //call the controller signup method
      const signUpResult = await authController.signIn(auth);

      //assert that the signUp method is called and it returns the result
      expect(signUpResult).toBe(result);
      expect(spy).toBeCalledWith(auth);
    });
  });
});
