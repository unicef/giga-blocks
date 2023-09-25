"use client"
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import Introduction from "../../components/school-detail/introduction"
import Connectivity from "../../components/school-detail/connectivity"
import Heading from "../../components/school-detail/heading"

const SchoolDetail = () => {
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