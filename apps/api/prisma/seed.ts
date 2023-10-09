import { Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/application';

const prisma = new PrismaClient();
const logger = new Logger();

const hexStringToBuffer = (str: string): Buffer => {
  if (!str) return;
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
}

export const users = [
  {
    name: 'Sarvesh Admin',
    roles: [ROLE.ADMIN],
    email: 'sarvesh@mailinator.com',
    walletAddress: hexStringToBuffer('0xCf7bb7da4eFFcA9a3974b80e106C6541990De5eb'), // add own wallet address
  },
  {
    name: 'Anupama Admin',
    roles: [ROLE.ADMIN],
    email: 'anu123@mailinator.com',
    walletAddress: hexStringToBuffer('0xf0c84735Af5669c809EfD62C9D4e466d331A95b0'), // add own wallet address
  },
  {
    name: 'Manjik Admin',
    roles: [ROLE.ADMIN],
    email: 'manjik@mailinator.com',
    walletAddress: hexStringToBuffer('0xcDEe632FB1Ba1B3156b36cc0bDabBfd821305e06'), // add own wallet address
  },
  {
    name: 'Sandesh Admin',
    roles: [ROLE.ADMIN],
    email: 'sandesh@mailinator.com',
    walletAddress: hexStringToBuffer('0x6494650c466a166CBAC0BFeCD224286D6F03444F'), // add own wallet address
  },
  {
    name: 'Sushant Admin',
    roles: [ROLE.ADMIN],
    email: 'sushant@mailinator.com',
    walletAddress: hexStringToBuffer('0xfAAe0B09e9A80d142A11cd846CD9329F2E96f55F'), // add own wallet address
  },
  {
    name: 'Nishu User',
    roles: [ROLE.ADMIN],
    email: 'nishu123@mailinator.com',
    walletAddress: hexStringToBuffer('0x5a4FdcCbe7be8CcBd5E6A0f69A3Ef40DAdbECdC3'),
  },
  {
    name: 'Normal User',
    email: 'user1@mailinator.com',
  },
];

async function main() {
  // for await (const user of users) {
  const userdata = await prisma.user.createMany({ data: users });
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
