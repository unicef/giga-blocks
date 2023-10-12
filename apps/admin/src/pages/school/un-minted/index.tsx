'use client';

import VerifiedSchool from "./details";
import GraphQlProvider from "src/libs/graphql-query-client";

const VerifiedSchools = () => {
  return(
    <GraphQlProvider>
      <VerifiedSchool/>
    </GraphQlProvider>
  )
}

export default VerifiedSchools;