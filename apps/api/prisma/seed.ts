import { Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/application';
import * as _ from 'lodash';

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
    name: 'Raktim Admin',
    roles: [ROLE.ADMIN],
    email: 'raktim@rumsan.com',
  },
  {
    name: 'Raktim User',
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
    await prisma.$disconnect();
  })
  .catch(async error => {
    logger.log(error);
    await prisma.$disconnect();
  });
