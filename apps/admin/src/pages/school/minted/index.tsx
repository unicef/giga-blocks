
import { de } from "date-fns/locale";
import MintedSchools from "./details";
import GraphQlProvider from "src/libs/graphql-query-client";

const MintedSchool = () => {
  return(
    <GraphQlProvider>
      <MintedSchools/>
    </GraphQlProvider>
  )
}

export default MintedSchool;