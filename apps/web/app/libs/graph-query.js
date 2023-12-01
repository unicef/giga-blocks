import { gql } from 'urql';

const ownedNftsQuery = gql`
  query ownedNft($id: ID!, $first: Int!) {
    ownedNft(id: $id, subgraphError: allow) {
      id
      nfts(first: $first) {
        id
        tokenUri
      }
    }
  }
`;
const nftListQuery = gql`
  query tokenUris($first: Int!) {
    tokenUris(subgraphError: allow, first: $first) {
      id
      tokenUri
      owner {
        id
      }
    }
  }
`;

const nftDetailsQuery = gql`
  query tokenUri($id: ID!) {
    tokenUri(id: $id, subgraphError: allow) {
      id
      tokenUri
      owner {
        id
      }
    }
  }
`;

const transferQuery = gql`
  query transfers($id: ID!) {
    transfers(subgraphError: allow, where: { tokenId: $id }) {
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
export const Queries = {
  ownedNftsQuery,
  nftListQuery,
  nftDetailsQuery,
  transferQuery,
};
