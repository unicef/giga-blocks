import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Qos
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const qosAbi = [
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
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link qosAbi}__
 */
export const useReadQos = /*#__PURE__*/ createUseReadContract({ abi: qosAbi })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link qosAbi}__ and `functionName` set to `"day"`
 */
export const useReadQosDay = /*#__PURE__*/ createUseReadContract({
  abi: qosAbi,
  functionName: 'day',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link qosAbi}__ and `functionName` set to `"deployer"`
 */
export const useReadQosDeployer = /*#__PURE__*/ createUseReadContract({
  abi: qosAbi,
  functionName: 'deployer',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link qosAbi}__ and `functionName` set to `"getHash"`
 */
export const useReadQosGetHash = /*#__PURE__*/ createUseReadContract({
  abi: qosAbi,
  functionName: 'getHash',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link qosAbi}__ and `functionName` set to `"getTotalHashes"`
 */
export const useReadQosGetTotalHashes = /*#__PURE__*/ createUseReadContract({
  abi: qosAbi,
  functionName: 'getTotalHashes',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link qosAbi}__ and `functionName` set to `"oracleManagers"`
 */
export const useReadQosOracleManagers = /*#__PURE__*/ createUseReadContract({
  abi: qosAbi,
  functionName: 'oracleManagers',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link qosAbi}__
 */
export const useWriteQos = /*#__PURE__*/ createUseWriteContract({ abi: qosAbi })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link qosAbi}__ and `functionName` set to `"addHashes"`
 */
export const useWriteQosAddHashes = /*#__PURE__*/ createUseWriteContract({
  abi: qosAbi,
  functionName: 'addHashes',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link qosAbi}__ and `functionName` set to `"setOracleManager"`
 */
export const useWriteQosSetOracleManager = /*#__PURE__*/ createUseWriteContract(
  { abi: qosAbi, functionName: 'setOracleManager' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link qosAbi}__
 */
export const useSimulateQos = /*#__PURE__*/ createUseSimulateContract({
  abi: qosAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link qosAbi}__ and `functionName` set to `"addHashes"`
 */
export const useSimulateQosAddHashes = /*#__PURE__*/ createUseSimulateContract({
  abi: qosAbi,
  functionName: 'addHashes',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link qosAbi}__ and `functionName` set to `"setOracleManager"`
 */
export const useSimulateQosSetOracleManager =
  /*#__PURE__*/ createUseSimulateContract({
    abi: qosAbi,
    functionName: 'setOracleManager',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link qosAbi}__
 */
export const useWatchQosEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: qosAbi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link qosAbi}__ and `eventName` set to `"HashesAdded"`
 */
export const useWatchQosHashesAddedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: qosAbi,
    eventName: 'HashesAdded',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link qosAbi}__ and `eventName` set to `"NewDayAdded"`
 */
export const useWatchQosNewDayAddedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: qosAbi,
    eventName: 'NewDayAdded',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link qosAbi}__ and `eventName` set to `"OracleManagerUpdated"`
 */
export const useWatchQosOracleManagerUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: qosAbi,
    eventName: 'OracleManagerUpdated',
  })
