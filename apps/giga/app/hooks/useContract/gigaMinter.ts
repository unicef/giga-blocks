import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GigaMinter
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const gigaMinterAbi = [
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
    name: 'batchMintNft',
    outputs: [],
    stateMutability: 'nonpayable',
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
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gigaMinterAbi}__
 */
export const useReadGigaMinter = /*#__PURE__*/ createUseReadContract({
  abi: gigaMinterAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gigaMinterAbi}__ and `functionName` set to `"baseFee"`
 */
export const useReadGigaMinterBaseFee = /*#__PURE__*/ createUseReadContract({
  abi: gigaMinterAbi,
  functionName: 'baseFee',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gigaMinterAbi}__ and `functionName` set to `"bulkMinters"`
 */
export const useReadGigaMinterBulkMinters = /*#__PURE__*/ createUseReadContract(
  { abi: gigaMinterAbi, functionName: 'bulkMinters' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gigaMinterAbi}__ and `functionName` set to `"collectorNft"`
 */
export const useReadGigaMinterCollectorNft =
  /*#__PURE__*/ createUseReadContract({
    abi: gigaMinterAbi,
    functionName: 'collectorNft',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gigaMinterAbi}__ and `functionName` set to `"donationReceiver"`
 */
export const useReadGigaMinterDonationReceiver =
  /*#__PURE__*/ createUseReadContract({
    abi: gigaMinterAbi,
    functionName: 'donationReceiver',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gigaMinterAbi}__ and `functionName` set to `"owner"`
 */
export const useReadGigaMinterOwner = /*#__PURE__*/ createUseReadContract({
  abi: gigaMinterAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gigaMinterAbi}__ and `functionName` set to `"schoolNft"`
 */
export const useReadGigaMinterSchoolNft = /*#__PURE__*/ createUseReadContract({
  abi: gigaMinterAbi,
  functionName: 'schoolNft',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gigaMinterAbi}__ and `functionName` set to `"totalDonations"`
 */
export const useReadGigaMinterTotalDonations =
  /*#__PURE__*/ createUseReadContract({
    abi: gigaMinterAbi,
    functionName: 'totalDonations',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gigaMinterAbi}__
 */
export const useWriteGigaMinter = /*#__PURE__*/ createUseWriteContract({
  abi: gigaMinterAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gigaMinterAbi}__ and `functionName` set to `"batchBuyNft"`
 */
export const useWriteGigaMinterBatchBuyNft =
  /*#__PURE__*/ createUseWriteContract({
    abi: gigaMinterAbi,
    functionName: 'batchBuyNft',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gigaMinterAbi}__ and `functionName` set to `"batchMintNft"`
 */
export const useWriteGigaMinterBatchMintNft =
  /*#__PURE__*/ createUseWriteContract({
    abi: gigaMinterAbi,
    functionName: 'batchMintNft',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gigaMinterAbi}__ and `functionName` set to `"buyNft"`
 */
export const useWriteGigaMinterBuyNft = /*#__PURE__*/ createUseWriteContract({
  abi: gigaMinterAbi,
  functionName: 'buyNft',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gigaMinterAbi}__ and `functionName` set to `"mintForDonor"`
 */
export const useWriteGigaMinterMintForDonor =
  /*#__PURE__*/ createUseWriteContract({
    abi: gigaMinterAbi,
    functionName: 'mintForDonor',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gigaMinterAbi}__ and `functionName` set to `"mintNft"`
 */
export const useWriteGigaMinterMintNft = /*#__PURE__*/ createUseWriteContract({
  abi: gigaMinterAbi,
  functionName: 'mintNft',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gigaMinterAbi}__ and `functionName` set to `"multicall"`
 */
export const useWriteGigaMinterMulticall = /*#__PURE__*/ createUseWriteContract(
  { abi: gigaMinterAbi, functionName: 'multicall' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gigaMinterAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteGigaMinterRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: gigaMinterAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gigaMinterAbi}__ and `functionName` set to `"sendDonation"`
 */
export const useWriteGigaMinterSendDonation =
  /*#__PURE__*/ createUseWriteContract({
    abi: gigaMinterAbi,
    functionName: 'sendDonation',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gigaMinterAbi}__ and `functionName` set to `"setBaseFee"`
 */
export const useWriteGigaMinterSetBaseFee =
  /*#__PURE__*/ createUseWriteContract({
    abi: gigaMinterAbi,
    functionName: 'setBaseFee',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gigaMinterAbi}__ and `functionName` set to `"setDonationReceiver"`
 */
export const useWriteGigaMinterSetDonationReceiver =
  /*#__PURE__*/ createUseWriteContract({
    abi: gigaMinterAbi,
    functionName: 'setDonationReceiver',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gigaMinterAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteGigaMinterTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: gigaMinterAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gigaMinterAbi}__
 */
export const useSimulateGigaMinter = /*#__PURE__*/ createUseSimulateContract({
  abi: gigaMinterAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gigaMinterAbi}__ and `functionName` set to `"batchBuyNft"`
 */
export const useSimulateGigaMinterBatchBuyNft =
  /*#__PURE__*/ createUseSimulateContract({
    abi: gigaMinterAbi,
    functionName: 'batchBuyNft',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gigaMinterAbi}__ and `functionName` set to `"batchMintNft"`
 */
export const useSimulateGigaMinterBatchMintNft =
  /*#__PURE__*/ createUseSimulateContract({
    abi: gigaMinterAbi,
    functionName: 'batchMintNft',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gigaMinterAbi}__ and `functionName` set to `"buyNft"`
 */
export const useSimulateGigaMinterBuyNft =
  /*#__PURE__*/ createUseSimulateContract({
    abi: gigaMinterAbi,
    functionName: 'buyNft',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gigaMinterAbi}__ and `functionName` set to `"mintForDonor"`
 */
export const useSimulateGigaMinterMintForDonor =
  /*#__PURE__*/ createUseSimulateContract({
    abi: gigaMinterAbi,
    functionName: 'mintForDonor',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gigaMinterAbi}__ and `functionName` set to `"mintNft"`
 */
export const useSimulateGigaMinterMintNft =
  /*#__PURE__*/ createUseSimulateContract({
    abi: gigaMinterAbi,
    functionName: 'mintNft',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gigaMinterAbi}__ and `functionName` set to `"multicall"`
 */
export const useSimulateGigaMinterMulticall =
  /*#__PURE__*/ createUseSimulateContract({
    abi: gigaMinterAbi,
    functionName: 'multicall',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gigaMinterAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateGigaMinterRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: gigaMinterAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gigaMinterAbi}__ and `functionName` set to `"sendDonation"`
 */
export const useSimulateGigaMinterSendDonation =
  /*#__PURE__*/ createUseSimulateContract({
    abi: gigaMinterAbi,
    functionName: 'sendDonation',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gigaMinterAbi}__ and `functionName` set to `"setBaseFee"`
 */
export const useSimulateGigaMinterSetBaseFee =
  /*#__PURE__*/ createUseSimulateContract({
    abi: gigaMinterAbi,
    functionName: 'setBaseFee',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gigaMinterAbi}__ and `functionName` set to `"setDonationReceiver"`
 */
export const useSimulateGigaMinterSetDonationReceiver =
  /*#__PURE__*/ createUseSimulateContract({
    abi: gigaMinterAbi,
    functionName: 'setDonationReceiver',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gigaMinterAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateGigaMinterTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: gigaMinterAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gigaMinterAbi}__
 */
export const useWatchGigaMinterEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: gigaMinterAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gigaMinterAbi}__ and `eventName` set to `"BulkNftMinted"`
 */
export const useWatchGigaMinterBulkNftMintedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: gigaMinterAbi,
    eventName: 'BulkNftMinted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gigaMinterAbi}__ and `eventName` set to `"DonationTransferred"`
 */
export const useWatchGigaMinterDonationTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: gigaMinterAbi,
    eventName: 'DonationTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gigaMinterAbi}__ and `eventName` set to `"NFTMinted"`
 */
export const useWatchGigaMinterNftMintedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: gigaMinterAbi,
    eventName: 'NFTMinted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gigaMinterAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchGigaMinterOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: gigaMinterAbi,
    eventName: 'OwnershipTransferred',
  })
