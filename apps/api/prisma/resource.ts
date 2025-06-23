enum ROLE {
    ADMIN = 'ADMIN',
    CONTRIBUTOR = 'CONTRIBUTOR',
  }

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

export const themes = [
  {
    name: 'blue',
    colorScheme: {
      bgColor: '#EAF3FF',
      fontColor: '#277AFF',
      cardColor: '#C3DBFF'
    }
  },
  {
    name: 'purple',
    colorScheme: {
      bgColor: '#EEE5F9',
      fontColor: '#3C0074',
      cardColor: '#D8CCE3'
    }
  },
  {
    name: 'green',
    colorScheme: {
      bgColor: '#E4F3DF',
      fontColor: '#054035',
      cardColor: '#569566'
    }
  },
  {
    name: 'orange',
    colorScheme: {
      bgColor: '#FBEBCA',
      fontColor: '#AD6302',
      cardColor: '#D69929'
    }
  }
]

export const users = [
    {
      name: 'Giga 1',
      roles: [ROLE.ADMIN],
      email: 'giga1@mailinator.com',
      walletAddress: hexStringToBuffer('0xaD8369738aF0e80D3A049E4b051853FcF81E5DA9'), // add own wallet address
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
      name: 'Javier ',
      roles: [ROLE.ADMIN],
      email: 'jashen@unicef.org',
      walletAddress: hexStringToBuffer('0x8A41F2e3F540C58cae4c24AE36E3cCf34d33fD46'),
    },
    {
      name: ' User',
      roles: [ROLE.CONTRIBUTOR],
      email: 'user1@mailinator.com',
    },
    {
      name: 'Javier',
      roles: [ROLE.ADMIN],
      email: 'jashen@unicef.org',
      walletAddress: hexStringToBuffer('0x8A41F2e3F540C58cae4c24AE36E3cCf34d33fD46'), // add own wallet address
    }
  ];