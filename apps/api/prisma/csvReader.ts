import * as fs from 'fs';
import { PrismaClient } from '@prisma/application';
import { uuidV4 } from 'web3-utils';

const prisma = new PrismaClient();

interface SchoolData {
  schoolName: string;
  schoolType: string;
  country: string;
  longitude: number;
  latitude: number;
  connectivity: Boolean;
  electricity_availabilty: Boolean;
  coverage_availabitlity: string;
}

async function readAndSaveCSV(filePath: string): Promise<void> {
  try {
    const fileData = fs.readFileSync(filePath, 'utf8');
    const rows = fileData.trim().split('\n').slice(1);

    for (const row of rows) {
      const [
        schoolName,
        schoolType,
        country,
        longitudeStr,
        latitudeStr,
        connectivity,
        electricity_availabilty,
        coverage_availabitlity,
      ] = row.split(',');

      const longitude = parseFloat(longitudeStr);
      const latitude = parseFloat(latitudeStr);

      if (isNaN(longitude) || isNaN(latitude)) {
        console.error(`Invalid longitude or latitude for school "${schoolName}"`);
        throw new Error('Invalid longitude or latitude');
      }

      const schoolData: SchoolData = {
        schoolName,
        schoolType,
        country,
        longitude,
        latitude,
        connectivity: Boolean(connectivity),
        coverage_availabitlity,
        electricity_availabilty: Boolean(electricity_availabilty),
      };

      await prisma.school.create({
        data: {
          giga_id_school: uuidV4(),
          name: schoolData.schoolName,
          school_type: schoolData.schoolType,
          longitude: schoolData.longitude,
          latitude: schoolData.latitude,
          connectivity: schoolData.connectivity as boolean,
          electricity_available: schoolData.electricity_availabilty as boolean,
          coverage_availability: schoolData.coverage_availabitlity,
          country_name: country,
        },
      });

      console.log(`School "${schoolName}" saved to the database.`);
    }

    console.log('CSV data import completed.');
  } catch (error) {
    console.error('Error reading or saving CSV data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

const csvFilePath = 'apps/api/prisma/school.csv';
readAndSaveCSV(csvFilePath);
