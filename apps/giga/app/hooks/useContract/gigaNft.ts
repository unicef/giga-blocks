import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Nft
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const nftAbi = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousAdmin',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'newAdmin',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'AdminChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_fromTokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: '_toTokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'BatchMetadataUpdate',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'beacon',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'BeaconUpgraded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'version', internalType: 'uint8', type: 'uint8', indexed: false },
    ],
    name: 'Initialized',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'MetadataUpdate',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'implementation',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'Upgraded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'minter',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'mintersAdded',
  },
  {
    type: 'function',
    inputs: [{ name: '_minter', internalType: 'address', type: 'address' }],
    name: 'addMinter',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getImplementation',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getName',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_nftContent', internalType: 'address', type: 'address' },
      { name: '_name', internalType: 'string', type: 'string' },
      { name: '_symbol', internalType: 'string', type: 'string' },
      { name: '_owner', internalType: 'address', type: 'address' },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_minter', internalType: 'address', type: 'address' }],
    name: 'isMinter',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'data', internalType: 'bytes[]', type: 'bytes[]' }],
    name: 'multicall',
    outputs: [{ name: 'results', internalType: 'bytes[]', type: 'bytes[]' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'nftContent',
    outputs: [
      { name: '', internalType: 'contract INftContent', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'proxiableUUID',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_minter', internalType: 'address', type: 'address' }],
    name: 'removeMinter',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_schoolId', internalType: 'string', type: 'string' },
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_nftDatavalues', internalType: 'string[9]', type: 'string[9]' },
    ],
    name: 'safeMint',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_tokenId', internalType: 'uint256', type: 'uint256' },
      { name: '_nftDatavalues', internalType: 'string[9]', type: 'string[9]' },
    ],
    name: 'updateNftContent',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'newImplementation', internalType: 'address', type: 'address' },
    ],
    name: 'upgradeTo',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'newImplementation', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'upgradeToAndCall',
    outputs: [],
    stateMutability: 'payable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nftAbi}__
 */
export const useReadNft = /*#__PURE__*/ createUseReadContract({ abi: nftAbi })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nftAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadNftBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: nftAbi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nftAbi}__ and `functionName` set to `"getApproved"`
 */
export const useReadNftGetApproved = /*#__PURE__*/ createUseReadContract({
  abi: nftAbi,
  functionName: 'getApproved',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nftAbi}__ and `functionName` set to `"getImplementation"`
 */
export const useReadNftGetImplementation = /*#__PURE__*/ createUseReadContract({
  abi: nftAbi,
  functionName: 'getImplementation',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nftAbi}__ and `functionName` set to `"getName"`
 */
export const useReadNftGetName = /*#__PURE__*/ createUseReadContract({
  abi: nftAbi,
  functionName: 'getName',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nftAbi}__ and `functionName` set to `"isApprovedForAll"`
 */
export const useReadNftIsApprovedForAll = /*#__PURE__*/ createUseReadContract({
  abi: nftAbi,
  functionName: 'isApprovedForAll',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nftAbi}__ and `functionName` set to `"isMinter"`
 */
export const useReadNftIsMinter = /*#__PURE__*/ createUseReadContract({
  abi: nftAbi,
  functionName: 'isMinter',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nftAbi}__ and `functionName` set to `"name"`
 */
export const useReadNftName = /*#__PURE__*/ createUseReadContract({
  abi: nftAbi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nftAbi}__ and `functionName` set to `"nftContent"`
 */
export const useReadNftNftContent = /*#__PURE__*/ createUseReadContract({
  abi: nftAbi,
  functionName: 'nftContent',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nftAbi}__ and `functionName` set to `"owner"`
 */
export const useReadNftOwner = /*#__PURE__*/ createUseReadContract({
  abi: nftAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nftAbi}__ and `functionName` set to `"ownerOf"`
 */
export const useReadNftOwnerOf = /*#__PURE__*/ createUseReadContract({
  abi: nftAbi,
  functionName: 'ownerOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nftAbi}__ and `functionName` set to `"proxiableUUID"`
 */
export const useReadNftProxiableUuid = /*#__PURE__*/ createUseReadContract({
  abi: nftAbi,
  functionName: 'proxiableUUID',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nftAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadNftSupportsInterface = /*#__PURE__*/ createUseReadContract({
  abi: nftAbi,
  functionName: 'supportsInterface',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nftAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadNftSymbol = /*#__PURE__*/ createUseReadContract({
  abi: nftAbi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nftAbi}__ and `functionName` set to `"tokenURI"`
 */
export const useReadNftTokenUri = /*#__PURE__*/ createUseReadContract({
  abi: nftAbi,
  functionName: 'tokenURI',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nftAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadNftTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: nftAbi,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nftAbi}__
 */
export const useWriteNft = /*#__PURE__*/ createUseWriteContract({ abi: nftAbi })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nftAbi}__ and `functionName` set to `"addMinter"`
 */
export const useWriteNftAddMinter = /*#__PURE__*/ createUseWriteContract({
  abi: nftAbi,
  functionName: 'addMinter',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nftAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteNftApprove = /*#__PURE__*/ createUseWriteContract({
  abi: nftAbi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nftAbi}__ and `functionName` set to `"initialize"`
 */
export const useWriteNftInitialize = /*#__PURE__*/ createUseWriteContract({
  abi: nftAbi,
  functionName: 'initialize',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nftAbi}__ and `functionName` set to `"multicall"`
 */
export const useWriteNftMulticall = /*#__PURE__*/ createUseWriteContract({
  abi: nftAbi,
  functionName: 'multicall',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nftAbi}__ and `functionName` set to `"removeMinter"`
 */
export const useWriteNftRemoveMinter = /*#__PURE__*/ createUseWriteContract({
  abi: nftAbi,
  functionName: 'removeMinter',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nftAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteNftRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: nftAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nftAbi}__ and `functionName` set to `"safeMint"`
 */
export const useWriteNftSafeMint = /*#__PURE__*/ createUseWriteContract({
  abi: nftAbi,
  functionName: 'safeMint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nftAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useWriteNftSafeTransferFrom = /*#__PURE__*/ createUseWriteContract(
  { abi: nftAbi, functionName: 'safeTransferFrom' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nftAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useWriteNftSetApprovalForAll =
  /*#__PURE__*/ createUseWriteContract({
    abi: nftAbi,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nftAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteNftTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: nftAbi,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nftAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteNftTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: nftAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nftAbi}__ and `functionName` set to `"updateNftContent"`
 */
export const useWriteNftUpdateNftContent = /*#__PURE__*/ createUseWriteContract(
  { abi: nftAbi, functionName: 'updateNftContent' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nftAbi}__ and `functionName` set to `"upgradeTo"`
 */
export const useWriteNftUpgradeTo = /*#__PURE__*/ createUseWriteContract({
  abi: nftAbi,
  functionName: 'upgradeTo',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nftAbi}__ and `functionName` set to `"upgradeToAndCall"`
 */
export const useWriteNftUpgradeToAndCall = /*#__PURE__*/ createUseWriteContract(
  { abi: nftAbi, functionName: 'upgradeToAndCall' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nftAbi}__
 */
export const useSimulateNft = /*#__PURE__*/ createUseSimulateContract({
  abi: nftAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nftAbi}__ and `functionName` set to `"addMinter"`
 */
export const useSimulateNftAddMinter = /*#__PURE__*/ createUseSimulateContract({
  abi: nftAbi,
  functionName: 'addMinter',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nftAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateNftApprove = /*#__PURE__*/ createUseSimulateContract({
  abi: nftAbi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nftAbi}__ and `functionName` set to `"initialize"`
 */
export const useSimulateNftInitialize = /*#__PURE__*/ createUseSimulateContract(
  { abi: nftAbi, functionName: 'initialize' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nftAbi}__ and `functionName` set to `"multicall"`
 */
export const useSimulateNftMulticall = /*#__PURE__*/ createUseSimulateContract({
  abi: nftAbi,
  functionName: 'multicall',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nftAbi}__ and `functionName` set to `"removeMinter"`
 */
export const useSimulateNftRemoveMinter =
  /*#__PURE__*/ createUseSimulateContract({
    abi: nftAbi,
    functionName: 'removeMinter',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nftAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateNftRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: nftAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nftAbi}__ and `functionName` set to `"safeMint"`
 */
export const useSimulateNftSafeMint = /*#__PURE__*/ createUseSimulateContract({
  abi: nftAbi,
  functionName: 'safeMint',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nftAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useSimulateNftSafeTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: nftAbi,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nftAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useSimulateNftSetApprovalForAll =
  /*#__PURE__*/ createUseSimulateContract({
    abi: nftAbi,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nftAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateNftTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: nftAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nftAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateNftTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: nftAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nftAbi}__ and `functionName` set to `"updateNftContent"`
 */
export const useSimulateNftUpdateNftContent =
  /*#__PURE__*/ createUseSimulateContract({
    abi: nftAbi,
    functionName: 'updateNftContent',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nftAbi}__ and `functionName` set to `"upgradeTo"`
 */
export const useSimulateNftUpgradeTo = /*#__PURE__*/ createUseSimulateContract({
  abi: nftAbi,
  functionName: 'upgradeTo',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nftAbi}__ and `functionName` set to `"upgradeToAndCall"`
 */
export const useSimulateNftUpgradeToAndCall =
  /*#__PURE__*/ createUseSimulateContract({
    abi: nftAbi,
    functionName: 'upgradeToAndCall',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link nftAbi}__
 */
export const useWatchNftEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: nftAbi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link nftAbi}__ and `eventName` set to `"AdminChanged"`
 */
export const useWatchNftAdminChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: nftAbi,
    eventName: 'AdminChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link nftAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchNftApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: nftAbi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link nftAbi}__ and `eventName` set to `"ApprovalForAll"`
 */
export const useWatchNftApprovalForAllEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: nftAbi,
    eventName: 'ApprovalForAll',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link nftAbi}__ and `eventName` set to `"BatchMetadataUpdate"`
 */
export const useWatchNftBatchMetadataUpdateEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: nftAbi,
    eventName: 'BatchMetadataUpdate',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link nftAbi}__ and `eventName` set to `"BeaconUpgraded"`
 */
export const useWatchNftBeaconUpgradedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: nftAbi,
    eventName: 'BeaconUpgraded',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link nftAbi}__ and `eventName` set to `"Initialized"`
 */
export const useWatchNftInitializedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: nftAbi,
    eventName: 'Initialized',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link nftAbi}__ and `eventName` set to `"MetadataUpdate"`
 */
export const useWatchNftMetadataUpdateEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: nftAbi,
    eventName: 'MetadataUpdate',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link nftAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchNftOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: nftAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link nftAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchNftTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: nftAbi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link nftAbi}__ and `eventName` set to `"Upgraded"`
 */
export const useWatchNftUpgradedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: nftAbi,
    eventName: 'Upgraded',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link nftAbi}__ and `eventName` set to `"mintersAdded"`
 */
export const useWatchNftMintersAddedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: nftAbi,
    eventName: 'mintersAdded',
  })
