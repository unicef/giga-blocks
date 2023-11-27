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
    }
  }
`;

const nftDetailsQuery = gql`
  query tokenUri($id: ID!) {
    tokenUri(id: $id, subgraphError: allow) {
      id
      tokenUri
    }
  }
`;

export const Queries = {
  ownedNftsQuery,
  nftListQuery,
  nftDetailsQuery,
};
