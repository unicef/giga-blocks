import { Test, TestingModule } from '@nestjs/testing';
import { ContributeDataController } from './contribute.controller';
import { ContributeDataService } from './contribute.service';
import { PrismaAppService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

import {
  PrismaClient,
  Status as PrismaStatus,
  Season,
  Season_Status,
  Status,
  User,
} from '@prisma/client';
import { SeasonController } from '../seasons/seasons.controller';
import { SeasonService } from '../seasons/seasons.service';
import { PointsService } from '../points/points.service';

describe('AuthController', () => {
  let controller: ContributeDataController;
  let prisma: PrismaClient;
  let seasonController: SeasonController;

  interface objectType {
    key: string;
    value?: string | Date | number;
  }

  let expectedResult: objectType[];
  let id: string;
  let seasonId: string;
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
      controllers: [ContributeDataController, SeasonController],
      providers: [
        ContributeDataService,
        JwtService,
        PrismaAppService,
        SeasonService,
        PointsService,
      ],
    }).compile();

    controller = module.get<ContributeDataController>(ContributeDataController);
    seasonController = module.get<SeasonController>(SeasonController);
    prisma = module.get(PrismaAppService);
  });

  // Test create controller
  describe('Create', () => {
    it('Should create a contributed-data', async () => {
      // Create season for foreign key constraint
      const seasonResult = await seasonController.create({
        season_name: 'Summer',
        season_start_date: new Date('2023-08-15T08:20:05.565Z'),
        season_end_date: new Date('2023-08-15T08:20:05.565Z'),
        season_status: 'Completed',
      });

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
          school_id: 'item.school_id',
          giga_id_school: 'item.giga_id_school',
          name: 'item.name',
          location: 'item.country',
          lon: 14,
          lat: 22,
          country_id: 12,
        },
      });

      // Call create method
      const result = await controller.create({
        contributed_data: '{"name": "neasdfasdfw"}',
        contributedUserId: userResult.id,
        school_Id: schoolResult.school_id,
        season_ID: seasonResult.season_id,
      });

      // This is the expected value after creating contribute-data
      expectedResult = [
        { key: 'id' },
        { key: 'contributed_data', value: '{"name": "neasdfasdfw"}' },
        { key: 'status', value: 'Pending' },
        { key: 'school_Id', value: schoolResult.school_id },
        { key: 'contributedUserId', value: userResult.id },
        { key: 'season_ID', value: seasonResult.season_id },
        { key: 'createdAt' },
      ];

      id = result.id;
      seasonId = result.season_ID;
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
        contributed_data: '{"name": "neasdfasdfw"}',
        contributedUserId: userId,
        school_Id: schoolId,
        season_ID: seasonId,
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
      const result = await controller.findAll();
      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(Array);
      expectObjectToHaveProperties(result[0], expectedResult);
    });
  });

  describe('Upvote/DownVote', () => {
    it('Upvote', async () => {
      const user = await prisma.user.create({
        data: {
          name: 'test2',
          email: 'test2@test.com',
        },
      });
      const result = await controller.upvote(id, { user });
      expect(result).toBeDefined();
      expect(result[0].vote_type).toBe('UPVOTE');
    });

    it('Downvote', async () => {
      const user = await prisma.user.create({
        data: {
          name: 'test3',
          email: 'test3@test.com',
        },
      });
      const result = await controller.downvote(id, { user });
      expect(result).toBeDefined();
      expect(result.vote_type).toBe('DOWNVOTE');
    });
  });

  describe('Validate', () => {
    it('Validate', async () => {
      const result = await controller.validate(id, { isValid: true });
      expect(result).toBeDefined();
      expect(result[1].status).toBe(Status.Validated);
    });
  });
});
