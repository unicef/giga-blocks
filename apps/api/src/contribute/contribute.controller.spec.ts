import { Test, TestingModule } from '@nestjs/testing';
import { ContributeDataController } from './contribute.controller';
import { ContributeDataService } from './contribute.service';
import { PrismaAppService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

import { PrismaClient, Status as PrismaStatus, Status, User } from '@prisma/application';

describe('AuthController', () => {
  let controller: ContributeDataController;
  let prisma: PrismaClient;

  interface objectType {
    key: string;
    value?: string | Date | number;
  }

  let expectedResult: objectType[];
  let id: string;
  let schoolId: string;
  let userId: string;
  let userResult: User;

  // Custom function to check if result have required key value pair or not
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
      controllers: [ContributeDataController],
      providers: [ContributeDataService, JwtService, PrismaAppService],
    }).compile();

    controller = module.get<ContributeDataController>(ContributeDataController);
    prisma = module.get(PrismaAppService);
  });

  // Test create controller
  describe('Create', () => {
    it('Should create a contributed-data', async () => {
      // Create user for foreign Key constraint
      userResult = await prisma.user.create({
        data: {
          name: 'test',
          email: 'test@test.com',
        },
      });

      // Create school for foreign key constraint
      const schoolResult = await prisma.school.create({
        data: {
          id: 'item.school_id',
          giga_school_id: 'item.giga_id_school',
          name: 'item.name',
          country: 'item.country',
          longitude: 14,
          latitude: 22,
          electricity_available: true,
          connectivity: true,
          school_type: 'item.school_type',
        },
      });

      // Call create method
      const result: any = await controller.create(
        {
          contributed_data: '{"name": "neasdfasdfw"}',
          school_Id: schoolResult.id,
        },
        { user: userResult.id },
      );

      // This is the expected value after creating contribute-data
      expectedResult = [
        { key: 'id' },
        { key: 'contributed_data', value: '{"name": "neasdfasdfw"}' },
        { key: 'status', value: 'Pending' },
        { key: 'school_Id', value: schoolResult.id },
        { key: 'contributedUserId', value: userResult.id },
        { key: 'createdAt' },
      ];

      id = result.id;
      schoolId = result.school_Id;
      userId = result.contributedUserId;

      expect(result).toBeDefined();
      expectObjectToHaveProperties(result, expectedResult);
    });
  });

  // Test update controller
  describe('Update', () => {
    it('Updates contributed data', async () => {
      const result = await controller.update(id, {
        contributions: '{"name": "neasdfasdfw"}',
        contributedUserId: userId,
      });
      expect(result).toBeDefined();
      expectObjectToHaveProperties(result, expectedResult);
    });
  });

  // Test findOne controller
  describe('FindOne', () => {
    it('Finds one contributed data', async () => {
      const result = await controller.findOne(id);
      expect(result).toBeDefined();
      expectObjectToHaveProperties(result, expectedResult);
    });
  });

  // Test findAll controller
  describe('FindOne', () => {
    it('Finds one contributed data', async () => {
      const result = await controller.findAll({ schoolId });
      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(Array);
      expectObjectToHaveProperties(result[0], expectedResult);
    });
  });

  describe('Validate', () => {
    it('Validate', async () => {
      const result = await controller.validate(id, { isValid: true }, { user: userResult.id });
      expect(result).toBeDefined();
      expect(result[1].status).toBe(Status.Validated);
    });
  });
});
