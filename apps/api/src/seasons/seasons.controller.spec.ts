import { Test, TestingModule } from '@nestjs/testing';
import { SeasonController } from './seasons.controller';
import { SeasonService } from './seasons.service';
import { PrismaAppService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/application';
import { CreateSeasonDto } from './dto/create-seasons.dto';

describe('SeasonController', () => {
  let controller: SeasonController;
  let prisma: PrismaClient;

  let id: string;

  // Parameter to create data
  const createSeasonData: CreateSeasonDto = {
    season_name: 'Summer',
    season_status: 'Completed',
    season_start_date: new Date('2023-08-15T08:20:05.565Z'),
    season_end_date: new Date('2023-08-15T08:20:05.565Z'),
  };

  // Expected response properties when created with createSeasonData
  const expectedProperties = [
    { key: 'season_name', value: 'Summer' },
    { key: 'season_id' },
    { key: 'season_start_date', value: new Date('2023-08-15T08:20:05.565Z') },
    { key: 'season_end_date', value: new Date('2023-08-15T08:20:05.565Z') },
    { key: 'season_status', value: 'Completed' },
  ];

  // Custom function to check if result have required key value pair or not
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
      controllers: [SeasonController],
      providers: [SeasonService, PrismaAppService, JwtService],
    }).compile();

    controller = module.get<SeasonController>(SeasonController);
    prisma = module.get(PrismaAppService);
  });

  // Test create method
  describe('Create', () => {
    it('Should create a season', async () => {
      const result = await controller.create(createSeasonData);
      expect(result).toBeDefined();
      expectObjectToHaveProperties(result, expectedProperties);

      // ID for find-one method test
      id = result.season_id;
    });
  });

  // Test find one method
  describe('Find one', () => {
    it('Should find one season from database', async () => {
      const result = await controller.findOne(id);
      expect(result).toBeDefined();
      expectObjectToHaveProperties(result, expectedProperties);
    });
  });

  // Test find all method
  describe('Find all', () => {
    it('Should find all season from database', async () => {
      const result = await controller.findAll();
      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(Array);
      expectObjectToHaveProperties(result[0], expectedProperties);
    });
  });

  // Test delete method
  describe('Delete one', () => {
    it('Should delete one season', async () => {
      const result = await controller.remove(id);
      expect(result).toBeDefined();
      expect(result).toBe(`Season ${id} deleted successfully.`);
    });
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
