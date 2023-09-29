"use client";
import { cacheExchange, Client, fetchExchange, Provider } from "urql";

const GarphQlProvider = ({children}) =>{
    const QueryURL = 'https://api.thegraph.com/subgraphs/name/myanzik/giga-nft'

    const client = new Client({
      url: QueryURL,
      exchanges: [cacheExchange, fetchExchange],
    });
    return (
        <Provider value={client}>
            {children}
        </Provider>
    
    )
}

export default GarphQlProvider;