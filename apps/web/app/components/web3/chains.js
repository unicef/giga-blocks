const ETH = {
  name: 'Ether',
  symbol: 'ETH',
  decimals: 18,
};

const MATIC = {
  name: 'Matic',
  symbol: 'MATIC',
  decimals: 18,
};

const CELO = {
  name: 'Celo',
  symbol: 'CELO',
  decimals: 18,
};

function isExtendedChainInformation(chainInformation) {
  return !!chainInformation.nativeCurrency;
}

function getAddChainParameters(chainId) {
  const chainInformation = CHAINS[chainId];
  if (isExtendedChainInformation(chainInformation)) {
    return {
      chainId,
      chainName: chainInformation.name,
      nativeCurrency: chainInformation.nativeCurrency,
      rpcUrls: chainInformation.urls,
      blockExplorerUrls: chainInformation.blockExplorerUrls,
    };
  } else {
    return chainId;
  }
}

const getInfuraUrlFor = (network) =>
  process.env.infuraKey
    ? `https://${network}.infura.io/v3/${process.env.infuraKey}`
    : undefined;

const getAlchemyUrlFor = (network) =>
  process.env.alchemyKey
    ? `https://${network}.alchemyapi.io/v2/${process.env.alchemyKey}`
    : undefined;

const MAINNET_CHAINS = {
  1: {
    urls: [
      getInfuraUrlFor('mainnet'),
      getAlchemyUrlFor('eth-mainnet'),
      'https://cloudflare-eth.com',
    ].filter(Boolean),
    name: 'Mainnet',
  },
  // ... other MAINNET_CHAINS entries
};

const TESTNET_CHAINS = {
  5: {
    urls: [getInfuraUrlFor('goerli')].filter(Boolean),
    name: 'Görli',
  },
  // ... other TESTNET_CHAINS entries
};

const CHAINS = {
  ...MAINNET_CHAINS,
  ...TESTNET_CHAINS,
};

const URLS = Object.keys(CHAINS).reduce((accumulator, chainId) => {
  const validURLs = CHAINS[Number(chainId)].urls;

  if (validURLs.length) {
    accumulator[Number(chainId)] = validURLs;
  }

  return accumulator;
}, {});
