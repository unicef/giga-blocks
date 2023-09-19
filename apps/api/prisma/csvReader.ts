import * as fs from 'fs';
import { PrismaClient } from '@prisma/application';
import { uuidV4 } from 'web3-utils';

const prisma = new PrismaClient();

// Define a function to read and save the CSV data
async function readAndSaveCSV(filePath: string): Promise<void> {
  try {
    const fileData = fs.readFileSync(filePath, 'utf8');
    const rows = fileData.trim().split('\n').slice(1); // Skip the header row

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
    await prisma.$disconnect(); // Close Prisma client
  }
}

// Call the function with the path to your CSV file
const csvFilePath = 'apps/api/prisma/school.csv';
readAndSaveCSV(csvFilePath);
