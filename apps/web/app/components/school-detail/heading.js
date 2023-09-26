import { Grid, Column } from "@carbon/react";
import "../../components/landing-page/styles/preview.scss"
import './school-detail.scss'

const Heading = () => {
    return ( 
        <Grid fullWidth>
            <Column lg={16} md={8} sm={8} className="school-detail-head">
            <h2>School A : Montessori Kinderworld</h2>
            </Column>
        </Grid>
     );
}
 
export default Heading;