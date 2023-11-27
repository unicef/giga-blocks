import { Grid, Column } from '@carbon/react';
import { useParams } from 'next/navigation';
import '../../components/landing-page/styles/preview.scss';
import './school-detail.scss';

const Connectivity = ({ schoolData }) => {
  const { id } = useParams();
  const contractAddress =
    process.env.NEXT_PUBLIC_GIGA_NFT_CONTENT_ADDRESS?.slice(0, 3) +
    '...' +
    process.env.NEXT_PUBLIC_GIGA_NFT_CONTENT_ADDRESS?.slice(-6);
  const chain = process.env.NEXT_PUBLIC_CHAIN;
  return (
    <>
      <Grid fullWidth className="mt-50px ">
        <Column md={4} lg={16} sm={4}>
          <div className="border-bottom"></div>
        </Column>
        <Column md={4} lg={5} sm={4}>
          <span style={{ fontSize: '1.5em' }}>NFT Details</span>
        </Column>
        <Column md={4} lg={11} sm={4} className="school-connectivity-cards">
          <Grid fullWidth className="school-connectivity-grid">
            <Column className="school-connectivity-column">
              <div className="school-connectivity-card">
                <Column md={4} lg={8} sm={4}>
                  <div>
                    <span className="heading2" style={{ marginBottom: '14px' }}>
                      Contract Address
                    </span>
                    <span className="heading5">
                      <br />
                      {contractAddress}
                    </span>
                  </div>
                </Column>
                <Column md={4} lg={8} sm={4}>
                  <span className="heading2" style={{ marginBottom: '14px' }}>
                    Token Id
                  </span>
                  <br />
                  <span className="heading5">{id}</span>
                </Column>
                <Column md={4} lg={8} sm={4}>
                  <span className="heading2" style={{ marginBottom: '14px' }}>
                    Chain
                  </span>
                  <span className="heading5">
                    <br />
                    {chain}
                  </span>
                </Column>
              </div>
            </Column>
          </Grid>
        </Column>
      </Grid>
      <Grid fullWidth>
        <Column md={4} lg={16} sm={4}>
          <div className="border-bottom"></div>
        </Column>
      </Grid>
    </>
  );
};

export default Connectivity;
