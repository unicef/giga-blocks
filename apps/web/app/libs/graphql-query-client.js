"use client";
import { cacheExchange, Client, fetchExchange, Provider } from "urql";
import { GRAPH_URL } from "../constants/api";

const GarphQlProvider = ({children}) =>{
    const QueryURL = GRAPH_URL;
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