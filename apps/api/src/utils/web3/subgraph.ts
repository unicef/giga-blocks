import axios from 'axios';

export async function getTokenId(subgraphUrl: string, schoolid: string) {
  const tokenId = await axios.post(subgraphUrl, {
    query: tokenIdQuery,
    variables: { id: schoolid },
  });
  return tokenId.data;
}

const tokenIdQuery = `query  schoolIdtoTokenId($id: String!){
  schoolTokenId(id: $id,subgraphError:allow){
    schoolId
    tokenId
    id
  } 
}   `;
