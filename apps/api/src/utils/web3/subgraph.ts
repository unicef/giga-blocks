import axios from 'axios';

export async function getTokenId(subgraphUrl: string, schoolid: string) {
  const tokenId = await axios.post(subgraphUrl, {
    query: `query  schoolIdtoTokenId($schoolid: String!){
        tokenUris(subgraphError:allow,schoolId:$schoolid){
            tokenId
        } 
    }   `,
  });
  return tokenId.data;
}
