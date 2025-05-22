import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// NftContent
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const nftContentAbi = [
  {
    type: 'constructor',
    inputs: [{ name: '_gigaAdmin', internalType: 'address', type: 'address' }],
    stateMutability: 'nonpayable',
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
      {
        name: 'scriptindex',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'baseArtScript',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
    ],
    name: 'UpdatedBaseArtScript',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'values',
        internalType: 'string[9]',
        type: 'string[9]',
        indexed: false,
      },
    ],
    name: 'UpdatedNftContent',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'imageHash',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
    ],
    name: 'UpdatedNftImage',
  },
  {
    type: 'function',
    inputs: [],
    name: 'baseArtScript',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'currentTokenId',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'generateNftArtHash',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'generateTokenData',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'generateTokenHash',
    outputs: [{ name: 'tokenHash', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_schoolId', internalType: 'string', type: 'string' }],
    name: 'generateTokenId',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_index', internalType: 'uint256', type: 'uint256' }],
    name: 'getArtScriptByIndex',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getMetadataContent',
    outputs: [{ name: '_content', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getNftContentValues',
    outputs: [{ name: '', internalType: 'string[9]', type: 'string[9]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_bytes32', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getString',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'isContentManager',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'keys',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
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
    name: 'nftArtScript',
    outputs: [
      { name: '', internalType: 'contract NftArtScript', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'nftContentValues',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'nftImageHash',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
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
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'string', type: 'string' }],
    name: 'schoolIdToTokenId',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenIdToSchoolId',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenIdToTokenHash',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalArtScripts',
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
  {
    type: 'function',
    inputs: [
      { name: '_baseArtScript', internalType: 'string', type: 'string' },
    ],
    name: 'updateBaseArtScript',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_contentManager', internalType: 'address', type: 'address' },
      { name: '_status', internalType: 'bool', type: 'bool' },
    ],
    name: 'updateContentManager',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_tokenId', internalType: 'uint256', type: 'uint256' },
      { name: '_values', internalType: 'string[9]', type: 'string[9]' },
    ],
    name: 'updateNftContent',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_schoolId', internalType: 'string', type: 'string' },
      { name: '_imageHash', internalType: 'string', type: 'string' },
    ],
    name: 'updateNftImageHash',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nftContentAbi}__
 */
export const useReadNftContent = /*#__PURE__*/ createUseReadContract({
  abi: nftContentAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nftContentAbi}__ and `functionName` set to `"baseArtScript"`
 */
export const useReadNftContentBaseArtScript =
  /*#__PURE__*/ createUseReadContract({
    abi: nftContentAbi,
    functionName: 'baseArtScript',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nftContentAbi}__ and `functionName` set to `"currentTokenId"`
 */
export const useReadNftContentCurrentTokenId =
  /*#__PURE__*/ createUseReadContract({
    abi: nftContentAbi,
    functionName: 'currentTokenId',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nftContentAbi}__ and `functionName` set to `"generateNftArtHash"`
 */
export const useReadNftContentGenerateNftArtHash =
  /*#__PURE__*/ createUseReadContract({
    abi: nftContentAbi,
    functionName: 'generateNftArtHash',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nftContentAbi}__ and `functionName` set to `"generateTokenData"`
 */
export const useReadNftContentGenerateTokenData =
  /*#__PURE__*/ createUseReadContract({
    abi: nftContentAbi,
    functionName: 'generateTokenData',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nftContentAbi}__ and `functionName` set to `"getArtScriptByIndex"`
 */
export const useReadNftContentGetArtScriptByIndex =
  /*#__PURE__*/ createUseReadContract({
    abi: nftContentAbi,
    functionName: 'getArtScriptByIndex',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nftContentAbi}__ and `functionName` set to `"getMetadataContent"`
 */
export const useReadNftContentGetMetadataContent =
  /*#__PURE__*/ createUseReadContract({
    abi: nftContentAbi,
    functionName: 'getMetadataContent',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nftContentAbi}__ and `functionName` set to `"getNftContentValues"`
 */
export const useReadNftContentGetNftContentValues =
  /*#__PURE__*/ createUseReadContract({
    abi: nftContentAbi,
    functionName: 'getNftContentValues',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nftContentAbi}__ and `functionName` set to `"getString"`
 */
export const useReadNftContentGetString = /*#__PURE__*/ createUseReadContract({
  abi: nftContentAbi,
  functionName: 'getString',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nftContentAbi}__ and `functionName` set to `"isContentManager"`
 */
export const useReadNftContentIsContentManager =
  /*#__PURE__*/ createUseReadContract({
    abi: nftContentAbi,
    functionName: 'isContentManager',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nftContentAbi}__ and `functionName` set to `"keys"`
 */
export const useReadNftContentKeys = /*#__PURE__*/ createUseReadContract({
  abi: nftContentAbi,
  functionName: 'keys',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nftContentAbi}__ and `functionName` set to `"nftArtScript"`
 */
export const useReadNftContentNftArtScript =
  /*#__PURE__*/ createUseReadContract({
    abi: nftContentAbi,
    functionName: 'nftArtScript',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nftContentAbi}__ and `functionName` set to `"nftContentValues"`
 */
export const useReadNftContentNftContentValues =
  /*#__PURE__*/ createUseReadContract({
    abi: nftContentAbi,
    functionName: 'nftContentValues',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nftContentAbi}__ and `functionName` set to `"nftImageHash"`
 */
export const useReadNftContentNftImageHash =
  /*#__PURE__*/ createUseReadContract({
    abi: nftContentAbi,
    functionName: 'nftImageHash',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nftContentAbi}__ and `functionName` set to `"owner"`
 */
export const useReadNftContentOwner = /*#__PURE__*/ createUseReadContract({
  abi: nftContentAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nftContentAbi}__ and `functionName` set to `"schoolIdToTokenId"`
 */
export const useReadNftContentSchoolIdToTokenId =
  /*#__PURE__*/ createUseReadContract({
    abi: nftContentAbi,
    functionName: 'schoolIdToTokenId',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nftContentAbi}__ and `functionName` set to `"tokenIdToSchoolId"`
 */
export const useReadNftContentTokenIdToSchoolId =
  /*#__PURE__*/ createUseReadContract({
    abi: nftContentAbi,
    functionName: 'tokenIdToSchoolId',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nftContentAbi}__ and `functionName` set to `"tokenIdToTokenHash"`
 */
export const useReadNftContentTokenIdToTokenHash =
  /*#__PURE__*/ createUseReadContract({
    abi: nftContentAbi,
    functionName: 'tokenIdToTokenHash',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nftContentAbi}__ and `functionName` set to `"totalArtScripts"`
 */
export const useReadNftContentTotalArtScripts =
  /*#__PURE__*/ createUseReadContract({
    abi: nftContentAbi,
    functionName: 'totalArtScripts',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nftContentAbi}__
 */
export const useWriteNftContent = /*#__PURE__*/ createUseWriteContract({
  abi: nftContentAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nftContentAbi}__ and `functionName` set to `"generateTokenHash"`
 */
export const useWriteNftContentGenerateTokenHash =
  /*#__PURE__*/ createUseWriteContract({
    abi: nftContentAbi,
    functionName: 'generateTokenHash',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nftContentAbi}__ and `functionName` set to `"generateTokenId"`
 */
export const useWriteNftContentGenerateTokenId =
  /*#__PURE__*/ createUseWriteContract({
    abi: nftContentAbi,
    functionName: 'generateTokenId',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nftContentAbi}__ and `functionName` set to `"multicall"`
 */
export const useWriteNftContentMulticall = /*#__PURE__*/ createUseWriteContract(
  { abi: nftContentAbi, functionName: 'multicall' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nftContentAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteNftContentRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: nftContentAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nftContentAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteNftContentTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: nftContentAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nftContentAbi}__ and `functionName` set to `"updateBaseArtScript"`
 */
export const useWriteNftContentUpdateBaseArtScript =
  /*#__PURE__*/ createUseWriteContract({
    abi: nftContentAbi,
    functionName: 'updateBaseArtScript',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nftContentAbi}__ and `functionName` set to `"updateContentManager"`
 */
export const useWriteNftContentUpdateContentManager =
  /*#__PURE__*/ createUseWriteContract({
    abi: nftContentAbi,
    functionName: 'updateContentManager',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nftContentAbi}__ and `functionName` set to `"updateNftContent"`
 */
export const useWriteNftContentUpdateNftContent =
  /*#__PURE__*/ createUseWriteContract({
    abi: nftContentAbi,
    functionName: 'updateNftContent',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nftContentAbi}__ and `functionName` set to `"updateNftImageHash"`
 */
export const useWriteNftContentUpdateNftImageHash =
  /*#__PURE__*/ createUseWriteContract({
    abi: nftContentAbi,
    functionName: 'updateNftImageHash',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nftContentAbi}__
 */
export const useSimulateNftContent = /*#__PURE__*/ createUseSimulateContract({
  abi: nftContentAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nftContentAbi}__ and `functionName` set to `"generateTokenHash"`
 */
export const useSimulateNftContentGenerateTokenHash =
  /*#__PURE__*/ createUseSimulateContract({
    abi: nftContentAbi,
    functionName: 'generateTokenHash',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nftContentAbi}__ and `functionName` set to `"generateTokenId"`
 */
export const useSimulateNftContentGenerateTokenId =
  /*#__PURE__*/ createUseSimulateContract({
    abi: nftContentAbi,
    functionName: 'generateTokenId',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nftContentAbi}__ and `functionName` set to `"multicall"`
 */
export const useSimulateNftContentMulticall =
  /*#__PURE__*/ createUseSimulateContract({
    abi: nftContentAbi,
    functionName: 'multicall',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nftContentAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateNftContentRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: nftContentAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nftContentAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateNftContentTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: nftContentAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nftContentAbi}__ and `functionName` set to `"updateBaseArtScript"`
 */
export const useSimulateNftContentUpdateBaseArtScript =
  /*#__PURE__*/ createUseSimulateContract({
    abi: nftContentAbi,
    functionName: 'updateBaseArtScript',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nftContentAbi}__ and `functionName` set to `"updateContentManager"`
 */
export const useSimulateNftContentUpdateContentManager =
  /*#__PURE__*/ createUseSimulateContract({
    abi: nftContentAbi,
    functionName: 'updateContentManager',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nftContentAbi}__ and `functionName` set to `"updateNftContent"`
 */
export const useSimulateNftContentUpdateNftContent =
  /*#__PURE__*/ createUseSimulateContract({
    abi: nftContentAbi,
    functionName: 'updateNftContent',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nftContentAbi}__ and `functionName` set to `"updateNftImageHash"`
 */
export const useSimulateNftContentUpdateNftImageHash =
  /*#__PURE__*/ createUseSimulateContract({
    abi: nftContentAbi,
    functionName: 'updateNftImageHash',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link nftContentAbi}__
 */
export const useWatchNftContentEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: nftContentAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link nftContentAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchNftContentOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: nftContentAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link nftContentAbi}__ and `eventName` set to `"UpdatedBaseArtScript"`
 */
export const useWatchNftContentUpdatedBaseArtScriptEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: nftContentAbi,
    eventName: 'UpdatedBaseArtScript',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link nftContentAbi}__ and `eventName` set to `"UpdatedNftContent"`
 */
export const useWatchNftContentUpdatedNftContentEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: nftContentAbi,
    eventName: 'UpdatedNftContent',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link nftContentAbi}__ and `eventName` set to `"UpdatedNftImage"`
 */
export const useWatchNftContentUpdatedNftImageEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: nftContentAbi,
    eventName: 'UpdatedNftImage',
  })
