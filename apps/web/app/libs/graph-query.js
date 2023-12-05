import { gql } from 'urql';

const ownedNftsQuery = gql`
  query collectorOwnedNft($id: ID!, $first: Int!) {
    collectorOwnedNft(id: $id, subgraphError: allow) {
      id
      nfts(first: $first) {
        id
        tokenUri
      }
    }
  }
`;
const nftListQuery = gql`
  query collectorTokenUris($first: Int!) {
    collectorTokenUris(subgraphError: allow, first: $first) {
      id
      tokenUri
      owner {
        id
      }
    }
  }
`;

const nftDetailsQuery = gql`
  query collectoTokenrUri($id: ID!) {
    collectorTokenUri(id: $id, subgraphError: allow) {
      id
      tokenUri
      owner {
        id
      }
    }
  }
`;

const transferQuery = gql`
  query schoolTransfers($id: ID!) {
    schoolTransfers(subgraphError: allow, where: { tokenId: $id }) {
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

const collectorTransferQuery = gql`
  query collectorTransfers($id: ID!) {
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

export const Queries = {
  ownedNftsQuery,
  nftListQuery,
  nftDetailsQuery,
  transferQuery,
  collectorTransferQuery
};
