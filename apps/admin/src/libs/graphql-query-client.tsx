"use-client";
import { cacheExchange, Client, fetchExchange ,Provider} from "urql";
// import { GRAPH_URL } from "../constants/api";
import React from "react";
//@ts-ignore


const GRAPHQL_URL: string = process.env.NEXT_PUBLIC_GRAPH_URL;

const client = new Client({
    url: GRAPHQL_URL,
    exchanges: [cacheExchange, fetchExchange],
});

const GraphQlProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <Provider value={client}>{children}</Provider>
};
export default GraphQlProvider;
