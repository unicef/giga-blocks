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
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'date', internalType: 'string', type: 'string', indexed: true },
      {
        name: 'hashes',
        internalType: 'string[]',
        type: 'string[]',
        indexed: false,
      },
    ],
    name: 'HashesAdded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'date', internalType: 'string', type: 'string', indexed: true },
      {
        name: 'hashes',
        internalType: 'string[]',
        type: 'string[]',
        indexed: false,
      },
    ],
    name: 'NewDayAdded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'oracleManager',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'status', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'OracleManagerUpdated',
  },
  {
    type: 'function',
    inputs: [
      { name: '_date', internalType: 'string', type: 'string' },
      { name: '_hashes', internalType: 'string[]', type: 'string[]' },
    ],
    name: 'addHashes',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'string', type: 'string' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'day',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'deployer',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_date', internalType: 'string', type: 'string' },
      { name: '_index', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getHash',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_date', internalType: 'string', type: 'string' }],
    name: 'getTotalHashes',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'oracleManagers',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_oracleManager', internalType: 'address', type: 'address' },
      { name: '_status', internalType: 'bool', type: 'bool' },
    ],
    name: 'setOracleManager',
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
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gigaProjectAbi}__ and `functionName` set to `"day"`
 */
export const useReadGigaProjectDay = /*#__PURE__*/ createUseReadContract({
  abi: gigaProjectAbi,
  functionName: 'day',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gigaProjectAbi}__ and `functionName` set to `"deployer"`
 */
export const useReadGigaProjectDeployer = /*#__PURE__*/ createUseReadContract({
  abi: gigaProjectAbi,
  functionName: 'deployer',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gigaProjectAbi}__ and `functionName` set to `"getHash"`
 */
export const useReadGigaProjectGetHash = /*#__PURE__*/ createUseReadContract({
  abi: gigaProjectAbi,
  functionName: 'getHash',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gigaProjectAbi}__ and `functionName` set to `"getTotalHashes"`
 */
export const useReadGigaProjectGetTotalHashes =
  /*#__PURE__*/ createUseReadContract({
    abi: gigaProjectAbi,
    functionName: 'getTotalHashes',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gigaProjectAbi}__ and `functionName` set to `"oracleManagers"`
 */
export const useReadGigaProjectOracleManagers =
  /*#__PURE__*/ createUseReadContract({
    abi: gigaProjectAbi,
    functionName: 'oracleManagers',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gigaProjectAbi}__
 */
export const useWriteGigaProject = /*#__PURE__*/ createUseWriteContract({
  abi: gigaProjectAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gigaProjectAbi}__ and `functionName` set to `"addHashes"`
 */
export const useWriteGigaProjectAddHashes =
  /*#__PURE__*/ createUseWriteContract({
    abi: gigaProjectAbi,
    functionName: 'addHashes',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gigaProjectAbi}__ and `functionName` set to `"setOracleManager"`
 */
export const useWriteGigaProjectSetOracleManager =
  /*#__PURE__*/ createUseWriteContract({
    abi: gigaProjectAbi,
    functionName: 'setOracleManager',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gigaProjectAbi}__
 */
export const useSimulateGigaProject = /*#__PURE__*/ createUseSimulateContract({
  abi: gigaProjectAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gigaProjectAbi}__ and `functionName` set to `"addHashes"`
 */
export const useSimulateGigaProjectAddHashes =
  /*#__PURE__*/ createUseSimulateContract({
    abi: gigaProjectAbi,
    functionName: 'addHashes',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gigaProjectAbi}__ and `functionName` set to `"setOracleManager"`
 */
export const useSimulateGigaProjectSetOracleManager =
  /*#__PURE__*/ createUseSimulateContract({
    abi: gigaProjectAbi,
    functionName: 'setOracleManager',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gigaProjectAbi}__
 */
export const useWatchGigaProjectEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: gigaProjectAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gigaProjectAbi}__ and `eventName` set to `"HashesAdded"`
 */
export const useWatchGigaProjectHashesAddedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: gigaProjectAbi,
    eventName: 'HashesAdded',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gigaProjectAbi}__ and `eventName` set to `"NewDayAdded"`
 */
export const useWatchGigaProjectNewDayAddedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: gigaProjectAbi,
    eventName: 'NewDayAdded',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gigaProjectAbi}__ and `eventName` set to `"OracleManagerUpdated"`
 */
export const useWatchGigaProjectOracleManagerUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: gigaProjectAbi,
    eventName: 'OracleManagerUpdated',
  })
