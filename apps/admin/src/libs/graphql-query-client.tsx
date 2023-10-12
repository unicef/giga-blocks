"use-client";
import { cacheExchange, Client, fetchExchange ,Provider} from "urql";
import  routes from "@constants/api";


const GRAPHQL_URL: string = routes.GRAPH_URL || "";

const client = new Client({
    url: GRAPHQL_URL,
    exchanges: [cacheExchange, fetchExchange],
});

const GraphQlProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <Provider value={client}>{children}</Provider>
};
export default GraphQlProvider;
