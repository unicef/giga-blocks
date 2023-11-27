import * as fs from 'fs';
import { PrismaClient } from '@prisma/application';

const prisma = new PrismaClient();

interface SchoolData {
  schoolName: string;
  giga_school_id: string;
  schoolType: string;
  country: string;
  longitude: number;
  latitude: number;
  connectivity: boolean;
  electricity_availabilty: boolean;
  coverage_availabitlity: string;
}

async function readAndSaveCSV(filePath: string): Promise<void> {
  try {
    const fileData = fs.readFileSync(filePath, 'utf8');
    const rows = fileData.trim().split('\n').slice(1);
    const user = await prisma.user.findFirst(); //trying first user in user model

    for (const row of rows) {
      const [
        schoolName,
        giga_school_id,
        longitudeStr,
        latitudeStr,
        schoolType,
        country,
        connectivity,
        coverage_availabitlity,
        electricity_availabilty,
      ] = row.split(',');

      const longitude = parseFloat(longitudeStr);
      const latitude = parseFloat(latitudeStr);

      if (isNaN(longitude) || isNaN(latitude)) {
        console.error(`Invalid longitude or latitude for school "${schoolName}"`);
        throw new Error('Invalid longitude or latitude');
      }

      const schoolData: SchoolData = {
        schoolName,
        giga_school_id,
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
          name: schoolData.schoolName,
          school_type: schoolData.schoolType,
          longitude: schoolData.longitude,
          latitude: schoolData.latitude,
          connectivity: schoolData.connectivity as boolean,
          electricity_available: schoolData.electricity_availabilty as boolean,
          coverage_availability: schoolData.coverage_availabitlity,
          country: country,
          giga_school_id: schoolData.giga_school_id,
          // createdById: user.id
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
