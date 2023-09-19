import axios from 'axios';
import { PrismaClient } from '@prisma/application';
import { ForbiddenException, Logger } from '@nestjs/common';
import * as fs from 'fs';
const prisma = new PrismaClient();

const logger = new Logger('seed');
async function fetchDataAndStore({ page, pageSize }: { page: number; pageSize: number }) {
  const config = {
    headers: {
      Authorization: `Bearer ${process.env.AUTHORIZATION}`,
    },
  };

  const url = `${process.env.SCHOOL_URI_BY_COUNTRY_ID}`;
  console.log(url);

  try {
    const data = [];
    const country_uri = await axios.get(`${process.env.COUNTRY_URI}`, config);
    for (let i = 0; i <= country_uri.data.data.length - 1; i++) {
      data.push(country_uri.data.data[i]);
    }

    data?.map(async item => {
      const response = await axios.get(`${url}/${item.id}?page=${page}&size=${pageSize}`, config);
      const datas = await response.data.data;

      for (const item of datas) {
        const check_if = await prisma.school.findUnique({
          where: {
            giga_id_school: item.giga_id_school,
          },
        });

        if (!check_if) {
          await prisma.school.create({
            data: {
              giga_id_school: item.giga_id_school,
              name: item.name,
              location: item.country,
              lon: item.lon,
              lat: item.lat,
              country_name: item.country,
              connectivity_speed_status: item.connectivity_speed_status,
            },
          });

          logger.log('Data seeding completed.');
        } else {
          logger.log('Already Exist');
        }
      }
      logger.log(`page:${page} loaded`);
    });
  } catch (error) {
    console.log(error);
    throw new ForbiddenException('Error seeding data');
  } finally {
    await prisma.$disconnect();
  }
}
async function main() {
  const pageSize = 50;
  const filePath = './page.json';
  // Read existing data
  const existingData = fs.existsSync(filePath)
    ? JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    : [];
  // Create new data object
  // Write back to file
  do {
    await fetchDataAndStore({ page: existingData.length, pageSize: pageSize });
    const newData = {
      page: existingData.length + 1,
    };
    existingData.push(newData);
    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2), 'utf-8');
    existingData.length++;
  } while ((existingData.length && pageSize) <= 50);
  // Add new data to existing
}
main().catch(error => {
  logger.error('Unhandled error during data seeding:', error);
  process.exit(1);
});
