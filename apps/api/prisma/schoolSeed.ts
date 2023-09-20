import axios from 'axios';
import { PrismaClient } from '@prisma/application';
import { ForbiddenException, Logger } from '@nestjs/common';

const prisma = new PrismaClient();

async function fetchDataAndStore() {
  const logger = new Logger('seed');

  const config = {
    headers: {
      Authorization: `Bearer ${process.env.AUTHORIZATION}`,
    },
  };

  const url = `${process.env.SCHOOL_URI_BY_COUNTRY}`;

  try {
    const page = 1;
    const pageSize = 50;

    const data = [
      {
        id: 144,
        name: 'Brazil',
      },
      {
        id: 32,
        name: 'Rwanda',
      },
    ];

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
              // coverageAbility: item.coverageAbility ?? 0,
              connectivity_speed_status: item.connectivity_speed_status,
            },
          });

          logger.log('Data seeding completed.');
        } else {
          logger.log('Already Exist');
        }
      }
    });
  } catch (error) {
    throw new ForbiddenException('Error seeding data');
  } finally {
    await prisma.$disconnect();
  }
}

fetchDataAndStore().catch(error => {
  console.error('Unhandled error during data seeding:', error);
  process.exit(1);
});
