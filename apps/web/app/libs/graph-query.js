
import {gql} from "urql";

 const ownedNftsQuery = gql`

   query  ownedNfts{ownedNfts(subgraphError: allow) {
      id
      nfts {
        id
        tokenUri
      }
    }
  }
  `
 const nftListQuery = gql`

  query tokenUris($first:Int!, ) {tokenUris(subgraphError: allow, first: $first) {
    id
    tokenUri
  }
}`

const nftDetailsQuery = gql`

query tokenUri($id: ID!) {
  tokenUri(id: $id, subgraphError: allow) {
    id
    tokenUri
  }
}
`

export const Queries ={
  ownedNftsQuery,
  nftListQuery,
  nftDetailsQuery
}



 