
"use client"
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import Introduction from "../../components/school-detail/introduction"
import Connectivity from "../../components/school-detail/connectivity"
import Heading from "../../components/school-detail/heading"
import {useQuery} from 'urql';
import { Queries } from "../../libs/graph-query";

const SchoolDetail = () => {

    const [result] = useQuery({query:Queries.nftDetailsQuery,variables: {id:1}});

    return ( 
        <>
        <Navbar />
        <Heading />
        <Introduction />
        <Connectivity />
        <Footer />
        </>
     );
}
 
export default SchoolDetail;