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
  {
    name: 'Giga 1',
    roles: [ROLE.ADMIN],
    email: 'giga1@mailinator.com',
    walletAddress: hexStringToBuffer('0xf0c84735af5669c809efd62c9d4e466d331a95b0'), // add own wallet address
  },
  {
    name: 'Giga 2',
    roles: [ROLE.ADMIN],
    email: 'giga2@mailinator.com',
    walletAddress: hexStringToBuffer('0x4dc912af67247818e08e0fb3266736162c01bfce'), // add own wallet address
  },
  {
    name: 'Giga 3',
    roles: [ROLE.ADMIN],
    email: 'giga3@mailinator.com',
    walletAddress: hexStringToBuffer('0xcf7bb7da4effca9a3974b80e106c6541990de5eb'), // add own wallet address
  },
  {
    name: 'Giga 4',
    roles: [ROLE.ADMIN],
    email: 'giga4@mailinator.com',
    walletAddress: hexStringToBuffer('0xcdee632fb1ba1b3156b36cc0bdabbfd821305e06'), // add own wallet address
  },
  {
    name: 'Giga 5',
    roles: [ROLE.ADMIN],
    email: 'giga5@mailinator.com',
    walletAddress: hexStringToBuffer('0x5a4fdccbe7be8ccbd5e6a0f69a3ef40dadbecdc3'), // add own wallet address
  },
  {
    name: 'Sushant Tripathee',
    roles: [ROLE.ADMIN],
    email: 'anu123@mailinator.com',
    walletAddress: hexStringToBuffer('0xfaae0b09e9a80d142a11cd846cd9329f2e96f55f'),
  },
  {
    name: ' User',
    email: 'user123@mailinator.com',
    roles: [ROLE.CONTRIBUTOR],
  },
  {
    name: 'Giga 6',
    roles: [ROLE.ADMIN],
    email: 'giga6@mailinator.com',
    walletAddress: hexStringToBuffer('0x984692516D5AC1d06267fb6297a5164c3FEaD91D'), // add own wallet address
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