import { Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/application';
import * as _ from 'lodash';
import { hexStringToBuffer } from '../src/utils/string-format';

const prisma = new PrismaClient();
const logger = new Logger();
export const roles = [
  {
    id: 1,
    name: 'Admin',
  },
  {
    id: 2,
    name: 'User',
  },
];

export const permissions = [
  {
    id: 1,
    role_id: 1,
    action: 'manage',
    subject: 'all',
  },
  {
    id: 2,
    role_id: 2,
    action: 'read',
    subject: 'User',
  },
  {
    id: 3,
    role_id: 2,
    action: 'manage',
    subject: 'User',
    conditions: { created_by: '{{ id }}' },
  },
];

enum ROLE {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export const users = [
  {
    name: 'User Admin',
    roles: [ROLE.ADMIN],
    email: 'admin12@mailinator.com',
    walletAddress: hexStringToBuffer('0xfAAe0B09e9A80d142A11cd846CD9329F2E96f55F'), // add own wallet address
  },
  {
    name: 'Normal User',
    email: 'raktim@mailinator.com',
  },
];

async function main() {
  for await (const user of users) {
    const userAttrs = _.cloneDeep(user);
    await prisma.user.create({
      data: {
        ...userAttrs,
      },
    });
  }
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
