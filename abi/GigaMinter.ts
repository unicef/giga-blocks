export const GigaMinterAbi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_gigaAdmin',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_schoolNft',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_collectorNft',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_donationReceiver',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_baseFee',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: '_schoolMinted',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_minter',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_donationRecieved',
        type: 'uint256',
      },
    ],
    name: 'BulkNftMinted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_donationReceiver',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'DonationTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_schoolNftTo',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_collectorNftTo',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_donationReceived',
        type: 'uint256',
      },
    ],
    name: 'NFTMinted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    inputs: [],
    name: 'baseFee',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string[]',
        name: '_schoolIds',
        type: 'string[]',
      },
      {
        internalType: 'address[]',
        name: '_schoolNftTos',
        type: 'address[]',
      },
      {
        internalType: 'address[]',
        name: '_collectorNftTos',
        type: 'address[]',
      },
      {
        internalType: 'string[9][]',
        name: '_values',
        type: 'string[9][]',
      },
    ],
    name: 'batchBuyNft',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'bulkMinters',
    outputs: [
      {
        internalType: 'uint256',
        name: 'totalDonation',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'totalSchoolsToMint',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'minter',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'remainingSchoolsToMint',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_schoolId',
        type: 'string',
      },
      {
        internalType: 'address',
        name: '_schoolNftTo',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_collectorNftTo',
        type: 'address',
      },
      {
        internalType: 'string[9]',
        name: '_values',
        type: 'string[9]',
      },
    ],
    name: 'buyNft',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'collectorNft',
    outputs: [
      {
        internalType: 'contract INft',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'donationReceiver',
    outputs: [
      {
        internalType: 'address payable',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_schoolId',
        type: 'string',
      },
      {
        internalType: 'address',
        name: '_schoolNftTo',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_collectorNftTo',
        type: 'address',
      },
      {
        internalType: 'string[9]',
        name: '_values',
        type: 'string[9]',
      },
    ],
    name: 'mintForDonor',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_schoolId',
        type: 'string',
      },
      {
        internalType: 'address',
        name: '_schoolNftTo',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_collectorNftTo',
        type: 'address',
      },
      {
        internalType: 'string[9]',
        name: '_values',
        type: 'string[9]',
      },
    ],
    name: 'mintNft',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes[]',
        name: 'data',
        type: 'bytes[]',
      },
    ],
    name: 'multicall',
    outputs: [
      {
        internalType: 'bytes[]',
        name: 'results',
        type: 'bytes[]',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'schoolNft',
    outputs: [
      {
        internalType: 'contract INft',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_schools',
        type: 'uint256',
      },
    ],
    name: 'sendDonation',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_newBaseFee',
        type: 'uint256',
      },
    ],
    name: 'setBaseFee',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address payable',
        name: '_newDonationReceiver',
        type: 'address',
      },
    ],
    name: 'setDonationReceiver',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalDonations',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;
