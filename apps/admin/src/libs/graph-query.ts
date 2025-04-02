import { gql } from 'urql';

const ownedNftsQuery = gql`
  query schoolOwnedNfts {
    schoolOwnedNfts(subgraphError: allow) {
      id
      nfts {
        id
        tokenUri
      }
    }
  }
`;
const nftListQuery = gql`
  query schoolTokenUris($skip: Int, $first: Int) {
    schoolTokenUris(subgraphError: allow, skip: $skip, first: $first) {
      id
      tokenUri
      mintedAt
    }
  }
`;

const allNftListQuery = gql`
  query MyQuery {
    nftDatas {
      id
      imageHash
      location
      mintedAt
      minter
      tokenId
      schoolId
      name
      mintingTransactionHash
      mintingGasFee
      mintingBlockNumber
      mintingAmount
      tokenUri
    }
  }
`;

const adminNftListQuery = gql`
  query MyQuery($id: String!) {
    nftDatas(where: { minter: $id }) {
      id
      imageHash
      location
      mintedAt
      minter
      tokenId
      schoolId
      name
      mintingTransactionHash
      mintingGasFee
      mintingBlockNumber
      mintingAmount
      tokenUri
    }
  }
`;

const othersNftListQuery = gql`
  query MyQuery($id: String!) {
    nftDatas(where: { minter_not: $id }) {
      id
      imageHash
      location
      mintedAt
      minter
      tokenId
      schoolId
      name
      mintingTransactionHash
      mintingGasFee
      mintingBlockNumber
      mintingAmount
      tokenUri
    }
  }
`;

const nftDetailsQuery = gql`
  query schoolTokenUri($id: ID!) {
    schoolTokenUri(id: $id, subgraphError: allow) {
      id
      tokenUri
      owner {
        id
      }
    }
    schoolTransfers(subgraphError: allow, where: { tokenId: $id }) {
      blockNumber
      blockTimestamp
      from
      id
      to
      tokenId
      transactionHash
    }
    collectorTransfers(subgraphError: allow, where: { tokenId: $id }) {
      blockNumber
      blockTimestamp
      from
      id
      to
      tokenId
      transactionHash
    }
  }
`;

const nftTransfer = gql`
  query MyQuery {
    schoolTransfers {
      blockNumber
      blockTimestamp
      from
      to
      tokenId
      transactionHash
      id
    }
    collectorTransfers {
      blockNumber
      blockTimestamp
      from
      id
      to
      tokenId
      transactionHash
    }
  }
`;

const totalGasFee = gql`
  query MyQuery($id: ID!) {
    totalGasFees(id: $id, subgraphError: allow) {
      totalGasFee
      id
    }
  }
`;

const totalNftCount = gql`
  query totalnft {
    totalNfts(subgraphError: allow) {
    id
    totalNft
   }

}`;

export const Queries = {
  ownedNftsQuery,
  nftListQuery,
  nftDetailsQuery,
  allNftListQuery,
  adminNftListQuery,
  othersNftListQuery,
  nftTransfer,
  totalGasFee,
  totalNftCount 
};
