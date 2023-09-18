import { Test, TestingModule } from '@nestjs/testing';
import { EmailController } from './newsletters.controller';
import { EmailService } from './newsletters.service';
import { CreateEmailDto } from './dto/create-newsletters.dto';
import { PrismaNewsLetterService } from '../prisma/prisma-newsletter.service';
import { PrismaClient } from '@prisma/application';
import { JwtService } from '@nestjs/jwt';

describe('Temporaray email controller', () => {
  let controller: EmailController;
  let prisma: PrismaClient;

  // Given Email input format
  const inputEmail: CreateEmailDto = {
    email: 'example@example.com',
    fullname: 'Sushant Tripathee',
    country: 'Nepal',
  };

  // Expexted response properties after above input
  const resultEmail = [
    { key: 'id' },
    { key: 'email', value: 'example@example.com' },
    { key: 'fullname', value: 'Sushant Tripathee' },
    { key: 'country', value: 'Nepal' },
  ];

  interface objectType {
    key: string;
    value?: string | Date;
  }
  function expectObjectToHaveProperties(obj: Record<string, any>, properties: objectType[]): void {
    properties.forEach(property => {
      if (property.value != undefined) {
        expect(obj).toHaveProperty(property.key, property.value);
      }
      expect(obj).toHaveProperty(property.key);
    });
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailController],
      providers: [EmailService, PrismaNewsLetterService, JwtService],
    }).compile();

    controller = module.get<EmailController>(EmailController);
    prisma = module.get(PrismaNewsLetterService);
  });

  let id: string;

  // Test create controller
  describe('Create', () => {
    it('Should create a email', async () => {
      const result = await controller.create(inputEmail);
      expect(result).toBeDefined();
      expectObjectToHaveProperties(result, resultEmail);

      id = result.id;
    });
  });

  // Test Find all controller
  describe('FindAll', () => {
    it('Should find all email in database', async () => {
      const result = await controller.findAll(undefined);
      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(Array);
      expectObjectToHaveProperties(result[0], resultEmail);
    });
  });

  // Test Find one controller
  describe('FindOne', () => {
    it('Should find one email in database', async () => {
      const result = await controller.findOne(id);
      expect(result).toBeDefined();
      expectObjectToHaveProperties(result, resultEmail);
    });
  });

  // Test Update controller
  describe('Update', () => {
    it('Should find all email in database', async () => {
      inputEmail.email = 'newInputEmail@newInputEmail.com';
      const result = await controller.update(id, inputEmail);
      expect(result).toBeDefined();
      resultEmail[1].value = 'newInputEmail@newInputEmail.com';
      expectObjectToHaveProperties(result, resultEmail);
    });
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
