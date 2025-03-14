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
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'isContentManager',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'keys',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
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
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
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
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gigaProjectAbi}__
 */
export const useReadGigaProject = /*#__PURE__*/ createUseReadContract({
  abi: gigaProjectAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gigaProjectAbi}__ and `functionName` set to `"baseArtScript"`
 */
export const useReadGigaProjectBaseArtScript =
  /*#__PURE__*/ createUseReadContract({
    abi: gigaProjectAbi,
    functionName: 'baseArtScript',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gigaProjectAbi}__ and `functionName` set to `"currentTokenId"`
 */
export const useReadGigaProjectCurrentTokenId =
  /*#__PURE__*/ createUseReadContract({
    abi: gigaProjectAbi,
    functionName: 'currentTokenId',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gigaProjectAbi}__ and `functionName` set to `"generateNftArtHash"`
 */
export const useReadGigaProjectGenerateNftArtHash =
  /*#__PURE__*/ createUseReadContract({
    abi: gigaProjectAbi,
    functionName: 'generateNftArtHash',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gigaProjectAbi}__ and `functionName` set to `"generateTokenData"`
 */
export const useReadGigaProjectGenerateTokenData =
  /*#__PURE__*/ createUseReadContract({
    abi: gigaProjectAbi,
    functionName: 'generateTokenData',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gigaProjectAbi}__ and `functionName` set to `"getArtScriptByIndex"`
 */
export const useReadGigaProjectGetArtScriptByIndex =
  /*#__PURE__*/ createUseReadContract({
    abi: gigaProjectAbi,
    functionName: 'getArtScriptByIndex',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gigaProjectAbi}__ and `functionName` set to `"getMetadataContent"`
 */
export const useReadGigaProjectGetMetadataContent =
  /*#__PURE__*/ createUseReadContract({
    abi: gigaProjectAbi,
    functionName: 'getMetadataContent',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gigaProjectAbi}__ and `functionName` set to `"isContentManager"`
 */
export const useReadGigaProjectIsContentManager =
  /*#__PURE__*/ createUseReadContract({
    abi: gigaProjectAbi,
    functionName: 'isContentManager',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gigaProjectAbi}__ and `functionName` set to `"keys"`
 */
export const useReadGigaProjectKeys = /*#__PURE__*/ createUseReadContract({
  abi: gigaProjectAbi,
  functionName: 'keys',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gigaProjectAbi}__ and `functionName` set to `"nftArtScript"`
 */
export const useReadGigaProjectNftArtScript =
  /*#__PURE__*/ createUseReadContract({
    abi: gigaProjectAbi,
    functionName: 'nftArtScript',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gigaProjectAbi}__ and `functionName` set to `"nftContentValues"`
 */
export const useReadGigaProjectNftContentValues =
  /*#__PURE__*/ createUseReadContract({
    abi: gigaProjectAbi,
    functionName: 'nftContentValues',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gigaProjectAbi}__ and `functionName` set to `"nftImageHash"`
 */
export const useReadGigaProjectNftImageHash =
  /*#__PURE__*/ createUseReadContract({
    abi: gigaProjectAbi,
    functionName: 'nftImageHash',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gigaProjectAbi}__ and `functionName` set to `"owner"`
 */
export const useReadGigaProjectOwner = /*#__PURE__*/ createUseReadContract({
  abi: gigaProjectAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gigaProjectAbi}__ and `functionName` set to `"schoolIdToTokenId"`
 */
export const useReadGigaProjectSchoolIdToTokenId =
  /*#__PURE__*/ createUseReadContract({
    abi: gigaProjectAbi,
    functionName: 'schoolIdToTokenId',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gigaProjectAbi}__ and `functionName` set to `"tokenIdToSchoolId"`
 */
export const useReadGigaProjectTokenIdToSchoolId =
  /*#__PURE__*/ createUseReadContract({
    abi: gigaProjectAbi,
    functionName: 'tokenIdToSchoolId',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gigaProjectAbi}__ and `functionName` set to `"tokenIdToTokenHash"`
 */
export const useReadGigaProjectTokenIdToTokenHash =
  /*#__PURE__*/ createUseReadContract({
    abi: gigaProjectAbi,
    functionName: 'tokenIdToTokenHash',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gigaProjectAbi}__ and `functionName` set to `"totalArtScripts"`
 */
export const useReadGigaProjectTotalArtScripts =
  /*#__PURE__*/ createUseReadContract({
    abi: gigaProjectAbi,
    functionName: 'totalArtScripts',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gigaProjectAbi}__
 */
export const useWriteGigaProject = /*#__PURE__*/ createUseWriteContract({
  abi: gigaProjectAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gigaProjectAbi}__ and `functionName` set to `"generateTokenHash"`
 */
export const useWriteGigaProjectGenerateTokenHash =
  /*#__PURE__*/ createUseWriteContract({
    abi: gigaProjectAbi,
    functionName: 'generateTokenHash',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gigaProjectAbi}__ and `functionName` set to `"generateTokenId"`
 */
export const useWriteGigaProjectGenerateTokenId =
  /*#__PURE__*/ createUseWriteContract({
    abi: gigaProjectAbi,
    functionName: 'generateTokenId',
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
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gigaProjectAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteGigaProjectTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: gigaProjectAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gigaProjectAbi}__ and `functionName` set to `"updateBaseArtScript"`
 */
export const useWriteGigaProjectUpdateBaseArtScript =
  /*#__PURE__*/ createUseWriteContract({
    abi: gigaProjectAbi,
    functionName: 'updateBaseArtScript',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gigaProjectAbi}__ and `functionName` set to `"updateContentManager"`
 */
export const useWriteGigaProjectUpdateContentManager =
  /*#__PURE__*/ createUseWriteContract({
    abi: gigaProjectAbi,
    functionName: 'updateContentManager',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gigaProjectAbi}__ and `functionName` set to `"updateNftContent"`
 */
export const useWriteGigaProjectUpdateNftContent =
  /*#__PURE__*/ createUseWriteContract({
    abi: gigaProjectAbi,
    functionName: 'updateNftContent',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gigaProjectAbi}__ and `functionName` set to `"updateNftImageHash"`
 */
export const useWriteGigaProjectUpdateNftImageHash =
  /*#__PURE__*/ createUseWriteContract({
    abi: gigaProjectAbi,
    functionName: 'updateNftImageHash',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gigaProjectAbi}__
 */
export const useSimulateGigaProject = /*#__PURE__*/ createUseSimulateContract({
  abi: gigaProjectAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gigaProjectAbi}__ and `functionName` set to `"generateTokenHash"`
 */
export const useSimulateGigaProjectGenerateTokenHash =
  /*#__PURE__*/ createUseSimulateContract({
    abi: gigaProjectAbi,
    functionName: 'generateTokenHash',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gigaProjectAbi}__ and `functionName` set to `"generateTokenId"`
 */
export const useSimulateGigaProjectGenerateTokenId =
  /*#__PURE__*/ createUseSimulateContract({
    abi: gigaProjectAbi,
    functionName: 'generateTokenId',
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
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gigaProjectAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateGigaProjectTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: gigaProjectAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gigaProjectAbi}__ and `functionName` set to `"updateBaseArtScript"`
 */
export const useSimulateGigaProjectUpdateBaseArtScript =
  /*#__PURE__*/ createUseSimulateContract({
    abi: gigaProjectAbi,
    functionName: 'updateBaseArtScript',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gigaProjectAbi}__ and `functionName` set to `"updateContentManager"`
 */
export const useSimulateGigaProjectUpdateContentManager =
  /*#__PURE__*/ createUseSimulateContract({
    abi: gigaProjectAbi,
    functionName: 'updateContentManager',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gigaProjectAbi}__ and `functionName` set to `"updateNftContent"`
 */
export const useSimulateGigaProjectUpdateNftContent =
  /*#__PURE__*/ createUseSimulateContract({
    abi: gigaProjectAbi,
    functionName: 'updateNftContent',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gigaProjectAbi}__ and `functionName` set to `"updateNftImageHash"`
 */
export const useSimulateGigaProjectUpdateNftImageHash =
  /*#__PURE__*/ createUseSimulateContract({
    abi: gigaProjectAbi,
    functionName: 'updateNftImageHash',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gigaProjectAbi}__
 */
export const useWatchGigaProjectEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: gigaProjectAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gigaProjectAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchGigaProjectOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: gigaProjectAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gigaProjectAbi}__ and `eventName` set to `"UpdatedBaseArtScript"`
 */
export const useWatchGigaProjectUpdatedBaseArtScriptEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: gigaProjectAbi,
    eventName: 'UpdatedBaseArtScript',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gigaProjectAbi}__ and `eventName` set to `"UpdatedNftContent"`
 */
export const useWatchGigaProjectUpdatedNftContentEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: gigaProjectAbi,
    eventName: 'UpdatedNftContent',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gigaProjectAbi}__ and `eventName` set to `"UpdatedNftImage"`
 */
export const useWatchGigaProjectUpdatedNftImageEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: gigaProjectAbi,
    eventName: 'UpdatedNftImage',
  })
