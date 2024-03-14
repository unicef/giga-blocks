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

const nftDataQuery = gql`
  query nftDatas($first: Int!, $name: String) {
    nftDatas(
      subgraphError: allow
      first: $first
      where: { name_contains_nocase: $name }
    ) {
      id
      location
      name
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

const nftImages = gql`
  query nftImages($first: Int) {
    nftImages(subgraphError: allow, first: $first) {
      id
      imageScript
    }
  }
`;
const nftImage = gql`
  query nftImage($id: ID!) {
    nftImage(subgraphError: allow, id: $id) {
      id
      imageScript
    }
  }
`;

export const Queries = {
  ownedNftsQuery,
  nftListQuery,
  nftDataQuery,
  nftDetailsQuery,
  transferQuery,
  collectorTransferQuery,
  nftImages,
  nftImage,
};
