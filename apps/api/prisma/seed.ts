import { Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/application';
import { themes, users } from './resource';

const prisma = new PrismaClient();
const logger = new Logger();

async function main() {
    await prisma.user.createMany({ data: users });
    await prisma.theme.createMany({data: themes});
}

main()
  .then(async () => {
    logger.log('Seeding done');
    await prisma.$disconnect();
  })
  .catch(async error => {
    logger.log(error);
    await prisma.$disconnect();
  });
