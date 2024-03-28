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
  CONTRIBUTOR = 'CONTRIBUTOR',
}

export const users = [
  {
    name: 'Giga 1',
    roles: [ROLE.ADMIN],
    email: 'giga1@mailinator.com',
    walletAddress: hexStringToBuffer('0xd4529d251f9ed2a432c405c277004120a83fe0b1'), // add own wallet address
  },
  {
    name: 'Giga 2',
    roles: [ROLE.ADMIN],
    email: 'giga2@mailinator.com',
    walletAddress: hexStringToBuffer('0xc7cf7ef39c9551fcf381d01dda51c0fa692d7c5c'), // add own wallet address
  },
  {
    name: 'Giga 3',
    roles: [ROLE.ADMIN],
    email: 'giga3@mailinator.com',
    walletAddress: hexStringToBuffer('0xe728e62fcba79177b5de21c4137f1bac577eb360'), // add own wallet address
  },
  {
    name: 'Giga 4',
    roles: [ROLE.ADMIN],
    email: 'giga4@mailinator.com',
    walletAddress: hexStringToBuffer('0xac166C94E60C98d2d0C9EeD6a79f9A71F4E3c60C'), // add own wallet address
  },
  {
    name: 'Giga 5',
    roles: [ROLE.ADMIN],
    email: 'giga5@mailinator.com',
    walletAddress: hexStringToBuffer('0x87Ed567e30dbD4Dae2088b87847698853a6963ed'), // add own wallet address
  },
  {
    name: 'Nishu Bade Shrestha',
    roles: [ROLE.ADMIN],
    email: 'nishu123@mailinator.com',
    walletAddress: hexStringToBuffer('0x5a4FdcCbe7be8CcBd5E6A0f69A3Ef40DAdbECdC3'),
  },
  {
    name: 'Manish Khadka',
    roles: [ROLE.ADMIN],
    email: 'manish123@mailinator.com',
    walletAddress: hexStringToBuffer('0x4dc912AF67247818E08E0FB3266736162C01BFcE'),
  },
  {
    name: ' User',
    roles: [ROLE.CONTRIBUTOR],
    email: 'user1@mailinator.com',
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
