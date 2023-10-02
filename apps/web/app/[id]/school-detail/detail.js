
"use client"
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import Introduction from "../../components/school-detail/introduction"
import Connectivity from "../../components/school-detail/connectivity"
import Heading from "../../components/school-detail/heading"
import {useQuery} from 'urql';
import { Queries } from "../../libs/graph-query";
import { useEffect } from "react";
import { useState } from "react";

const SchoolDetail = () => {

    const [result] = useQuery({query:Queries.nftDetailsQuery,variables: {id:1}});
    const [schoolData, setSchoolData] = useState();


    const decodeSchooldata =(data)=>{
        const encodeddata = data.tokenUri
        const decodedData = atob(encodeddata.tokenUri.substring(29));
        setSchoolData(JSON.parse(decodedData))
    }

    useEffect(() => {
        if(result.data)decodeSchooldata(result.data)
    }, [result.data])

    return ( 
        <>
        <Navbar />
        <Heading />
        <Introduction schooldata={schoolData}/>
        <Connectivity schoolData />
        <Footer />
        </>
     );
}
 
export default SchoolDetail;