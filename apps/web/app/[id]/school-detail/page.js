
"use client"

import SchoolDetail from "./detail";
import GraphQlProvider from "../../libs/graphql-query-client";

const SchoolDetailPage = () => {

    return (
        <GraphQlProvider>
            <SchoolDetail />
        </GraphQlProvider>
    
    )
}
export default SchoolDetailPage;