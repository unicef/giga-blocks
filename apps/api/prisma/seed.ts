import { Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/application';

const prisma = new PrismaClient();
const logger = new Logger();

const hexStringToBuffer = (str: string): Buffer => {
  // if (!str) return;
  return Buffer.from(str.substring(2), 'hex');
};
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
  CONTRIBUTOR = 'CONTRIBUTOR',
}

export const users = [
  // {
  //   name: 'Giga 1',
  //   roles: [ROLE.ADMIN],
  //   email: 'giga1@mailinator.com',
  //   walletAddress: hexStringToBuffer('0xd4529d251F9ed2a432c405c277004120A83fE0B1'), // add own wallet address
  // },
  // {
  //   name: 'Giga 2',
  //   roles: [ROLE.ADMIN],
  //   email: 'giga2@mailinator.com',
  //   walletAddress: hexStringToBuffer('0xC7Cf7EF39c9551FcF381d01dDA51c0fA692d7C5C'), // add own wallet address
  // },
  // {
  //   name: 'Giga 3',
  //   roles: [ROLE.ADMIN],
  //   email: 'giga3@mailinator.com',
  //   walletAddress: hexStringToBuffer('0xe728E62FCBa79177B5de21C4137F1bac577EB360'), // add own wallet address
  // },
  // {
  //   name: 'Giga 4',
  //   roles: [ROLE.ADMIN],
  //   email: 'giga4@mailinator.com',
  //   walletAddress: hexStringToBuffer('0xac166C94E60C98d2d0C9EeD6a79f9A71F4E3c60C'), // add own wallet address
  // },
  // {
  //   name: 'Giga 5',
  //   roles: [ROLE.ADMIN],
  //   email: 'giga5@mailinator.com',
  //   walletAddress: hexStringToBuffer('0x87Ed567e30dbD4Dae2088b87847698853a6963ed'), // add own wallet address
  // },
  // {
  //   name: 'Anupama Koirala',
  //   roles: [ROLE.ADMIN],
  //   email: 'anu123@mailinator.com',
  //   walletAddress: hexStringToBuffer('0xf0c84735Af5669c809EfD62C9D4e466d331A95b0'),
  // },
  {
    name: ' User',
    email: 'user123@mailinator.com',
    roles: [ROLE.CONTRIBUTOR],
  },
];

async function main() {
  // for await (const user of users) {
  const userdata = await prisma.user.createMany({ data: users });
  console.log('users added', userdata);
  // const userAttrs = _.cloneDeep(user);
  // await prisma.user.create({
  //   data: {
  //     ...userAttrs,
  //   },
  // });
  // }
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
