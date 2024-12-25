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

const baseScript = `query getBaseScript($id: ID!){
  baseScript(id: $id,subgraphError:allow){
    id 
    baseScript
    scriptCount
    }
}
`

export async function getSchoolScript(subgraphUrl: string, nftContent: string) {
  try{
    const {data} = await axios.post(subgraphUrl, {
    query:baseScript ,
    variables: { id: nftContent },
  });
  return data.data.baseScript;
  }
  catch(e){
    console.log(e)
  }
}