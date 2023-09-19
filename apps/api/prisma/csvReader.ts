import * as fs from 'fs';
import { PrismaClient } from '@prisma/application';
import { uuidV4 } from 'web3-utils';

const prisma = new PrismaClient();

async function readAndSaveCSV(filePath: string): Promise<void> {
  try {
    const fileData = fs.readFileSync(filePath, 'utf8');
    const rows = fileData.trim().split('\n').slice(1);

    for (const row of rows) {
      const [schoolName, location, longitude, latitude, connectivity, coverageAbility] =
        row.split(',');

      await prisma.school.create({
        data: {
          giga_id_school: uuidV4(),
          name: schoolName,
          location,
          lon: parseFloat(longitude),
          lat: parseFloat(latitude),
          connectivity_speed_status: connectivity,
          coverageAbility: parseInt(coverageAbility),
          country_name: 'Nepal',
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
