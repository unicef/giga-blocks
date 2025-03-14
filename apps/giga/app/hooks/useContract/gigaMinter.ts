import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GigaProject
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const gigaProjectAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_gigaAdmin', internalType: 'address', type: 'address' },
      { name: '_schoolNft', internalType: 'address', type: 'address' },
      { name: '_collectorNft', internalType: 'address', type: 'address' },
      { name: '_donationReceiver', internalType: 'address', type: 'address' },
      { name: '_baseFee', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_schoolMinted',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: '_minter',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: '_donationRecieved',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'BulkNftMinted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_donationReceiver',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: '_amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'DonationTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: '_schoolNftTo',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: '_collectorNftTo',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: '_donationReceived',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'NFTMinted',
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
    type: 'function',
    inputs: [],
    name: 'baseFee',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_schoolIds', internalType: 'string[]', type: 'string[]' },
      { name: '_schoolNftTos', internalType: 'address[]', type: 'address[]' },
      {
        name: '_collectorNftTos',
        internalType: 'address[]',
        type: 'address[]',
      },
      { name: '_values', internalType: 'string[9][]', type: 'string[9][]' },
    ],
    name: 'batchBuyNft',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'bulkMinters',
    outputs: [
      { name: 'totalDonation', internalType: 'uint256', type: 'uint256' },
      { name: 'totalSchoolsToMint', internalType: 'uint256', type: 'uint256' },
      { name: 'minter', internalType: 'address', type: 'address' },
      {
        name: 'remainingSchoolsToMint',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_schoolId', internalType: 'string', type: 'string' },
      { name: '_schoolNftTo', internalType: 'address', type: 'address' },
      { name: '_collectorNftTo', internalType: 'address', type: 'address' },
      { name: '_values', internalType: 'string[9]', type: 'string[9]' },
    ],
    name: 'buyNft',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'collectorNft',
    outputs: [{ name: '', internalType: 'contract INft', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'donationReceiver',
    outputs: [{ name: '', internalType: 'address payable', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_schoolId', internalType: 'string', type: 'string' },
      { name: '_schoolNftTo', internalType: 'address', type: 'address' },
      { name: '_collectorNftTo', internalType: 'address', type: 'address' },
      { name: '_values', internalType: 'string[9]', type: 'string[9]' },
    ],
    name: 'mintForDonor',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_schoolId', internalType: 'string', type: 'string' },
      { name: '_schoolNftTo', internalType: 'address', type: 'address' },
      { name: '_collectorNftTo', internalType: 'address', type: 'address' },
      { name: '_values', internalType: 'string[9]', type: 'string[9]' },
    ],
    name: 'mintNft',
    outputs: [],
    stateMutability: 'nonpayable',
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
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
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
    inputs: [],
    name: 'schoolNft',
    outputs: [{ name: '', internalType: 'contract INft', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_schools', internalType: 'uint256', type: 'uint256' }],
    name: 'sendDonation',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: '_newBaseFee', internalType: 'uint256', type: 'uint256' }],
    name: 'setBaseFee',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_newDonationReceiver',
        internalType: 'address payable',
        type: 'address',
      },
    ],
    name: 'setDonationReceiver',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalDonations',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gigaProjectAbi}__
 */
export const useReadGigaProject = /*#__PURE__*/ createUseReadContract({
  abi: gigaProjectAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gigaProjectAbi}__ and `functionName` set to `"baseFee"`
 */
export const useReadGigaProjectBaseFee = /*#__PURE__*/ createUseReadContract({
  abi: gigaProjectAbi,
  functionName: 'baseFee',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gigaProjectAbi}__ and `functionName` set to `"bulkMinters"`
 */
export const useReadGigaProjectBulkMinters =
  /*#__PURE__*/ createUseReadContract({
    abi: gigaProjectAbi,
    functionName: 'bulkMinters',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gigaProjectAbi}__ and `functionName` set to `"collectorNft"`
 */
export const useReadGigaProjectCollectorNft =
  /*#__PURE__*/ createUseReadContract({
    abi: gigaProjectAbi,
    functionName: 'collectorNft',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gigaProjectAbi}__ and `functionName` set to `"donationReceiver"`
 */
export const useReadGigaProjectDonationReceiver =
  /*#__PURE__*/ createUseReadContract({
    abi: gigaProjectAbi,
    functionName: 'donationReceiver',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gigaProjectAbi}__ and `functionName` set to `"owner"`
 */
export const useReadGigaProjectOwner = /*#__PURE__*/ createUseReadContract({
  abi: gigaProjectAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gigaProjectAbi}__ and `functionName` set to `"schoolNft"`
 */
export const useReadGigaProjectSchoolNft = /*#__PURE__*/ createUseReadContract({
  abi: gigaProjectAbi,
  functionName: 'schoolNft',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gigaProjectAbi}__ and `functionName` set to `"totalDonations"`
 */
export const useReadGigaProjectTotalDonations =
  /*#__PURE__*/ createUseReadContract({
    abi: gigaProjectAbi,
    functionName: 'totalDonations',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gigaProjectAbi}__
 */
export const useWriteGigaProject = /*#__PURE__*/ createUseWriteContract({
  abi: gigaProjectAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gigaProjectAbi}__ and `functionName` set to `"batchBuyNft"`
 */
export const useWriteGigaProjectBatchBuyNft =
  /*#__PURE__*/ createUseWriteContract({
    abi: gigaProjectAbi,
    functionName: 'batchBuyNft',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gigaProjectAbi}__ and `functionName` set to `"buyNft"`
 */
export const useWriteGigaProjectBuyNft = /*#__PURE__*/ createUseWriteContract({
  abi: gigaProjectAbi,
  functionName: 'buyNft',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gigaProjectAbi}__ and `functionName` set to `"mintForDonor"`
 */
export const useWriteGigaProjectMintForDonor =
  /*#__PURE__*/ createUseWriteContract({
    abi: gigaProjectAbi,
    functionName: 'mintForDonor',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gigaProjectAbi}__ and `functionName` set to `"mintNft"`
 */
export const useWriteGigaProjectMintNft = /*#__PURE__*/ createUseWriteContract({
  abi: gigaProjectAbi,
  functionName: 'mintNft',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gigaProjectAbi}__ and `functionName` set to `"multicall"`
 */
export const useWriteGigaProjectMulticall =
  /*#__PURE__*/ createUseWriteContract({
    abi: gigaProjectAbi,
    functionName: 'multicall',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gigaProjectAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteGigaProjectRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: gigaProjectAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gigaProjectAbi}__ and `functionName` set to `"sendDonation"`
 */
export const useWriteGigaProjectSendDonation =
  /*#__PURE__*/ createUseWriteContract({
    abi: gigaProjectAbi,
    functionName: 'sendDonation',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gigaProjectAbi}__ and `functionName` set to `"setBaseFee"`
 */
export const useWriteGigaProjectSetBaseFee =
  /*#__PURE__*/ createUseWriteContract({
    abi: gigaProjectAbi,
    functionName: 'setBaseFee',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gigaProjectAbi}__ and `functionName` set to `"setDonationReceiver"`
 */
export const useWriteGigaProjectSetDonationReceiver =
  /*#__PURE__*/ createUseWriteContract({
    abi: gigaProjectAbi,
    functionName: 'setDonationReceiver',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gigaProjectAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteGigaProjectTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: gigaProjectAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gigaProjectAbi}__
 */
export const useSimulateGigaProject = /*#__PURE__*/ createUseSimulateContract({
  abi: gigaProjectAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gigaProjectAbi}__ and `functionName` set to `"batchBuyNft"`
 */
export const useSimulateGigaProjectBatchBuyNft =
  /*#__PURE__*/ createUseSimulateContract({
    abi: gigaProjectAbi,
    functionName: 'batchBuyNft',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gigaProjectAbi}__ and `functionName` set to `"buyNft"`
 */
export const useSimulateGigaProjectBuyNft =
  /*#__PURE__*/ createUseSimulateContract({
    abi: gigaProjectAbi,
    functionName: 'buyNft',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gigaProjectAbi}__ and `functionName` set to `"mintForDonor"`
 */
export const useSimulateGigaProjectMintForDonor =
  /*#__PURE__*/ createUseSimulateContract({
    abi: gigaProjectAbi,
    functionName: 'mintForDonor',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gigaProjectAbi}__ and `functionName` set to `"mintNft"`
 */
export const useSimulateGigaProjectMintNft =
  /*#__PURE__*/ createUseSimulateContract({
    abi: gigaProjectAbi,
    functionName: 'mintNft',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gigaProjectAbi}__ and `functionName` set to `"multicall"`
 */
export const useSimulateGigaProjectMulticall =
  /*#__PURE__*/ createUseSimulateContract({
    abi: gigaProjectAbi,
    functionName: 'multicall',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gigaProjectAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateGigaProjectRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: gigaProjectAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gigaProjectAbi}__ and `functionName` set to `"sendDonation"`
 */
export const useSimulateGigaProjectSendDonation =
  /*#__PURE__*/ createUseSimulateContract({
    abi: gigaProjectAbi,
    functionName: 'sendDonation',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gigaProjectAbi}__ and `functionName` set to `"setBaseFee"`
 */
export const useSimulateGigaProjectSetBaseFee =
  /*#__PURE__*/ createUseSimulateContract({
    abi: gigaProjectAbi,
    functionName: 'setBaseFee',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gigaProjectAbi}__ and `functionName` set to `"setDonationReceiver"`
 */
export const useSimulateGigaProjectSetDonationReceiver =
  /*#__PURE__*/ createUseSimulateContract({
    abi: gigaProjectAbi,
    functionName: 'setDonationReceiver',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gigaProjectAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateGigaProjectTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: gigaProjectAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gigaProjectAbi}__
 */
export const useWatchGigaProjectEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: gigaProjectAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gigaProjectAbi}__ and `eventName` set to `"BulkNftMinted"`
 */
export const useWatchGigaProjectBulkNftMintedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: gigaProjectAbi,
    eventName: 'BulkNftMinted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gigaProjectAbi}__ and `eventName` set to `"DonationTransferred"`
 */
export const useWatchGigaProjectDonationTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: gigaProjectAbi,
    eventName: 'DonationTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gigaProjectAbi}__ and `eventName` set to `"NFTMinted"`
 */
export const useWatchGigaProjectNftMintedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: gigaProjectAbi,
    eventName: 'NFTMinted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gigaProjectAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchGigaProjectOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: gigaProjectAbi,
    eventName: 'OwnershipTransferred',
  })
