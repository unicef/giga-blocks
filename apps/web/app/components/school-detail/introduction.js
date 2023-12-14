import { Grid, Column, Button } from '@carbon/react';
import '../../components/landing-page/styles/preview.scss';
import { ArrowRight } from '@carbon/icons-react';
import './school-detail.scss';
import { toSvg } from 'jdenticon';
import { useEffect, useState } from 'react';
import { useSellerContract } from '../../hooks/useContract';
import NftPurchaseModal from '../../components/nftPurchaseModal';

const Introduction = ({ schooldata, tokenId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [onSell, setOnSell] = useState(false);
  const [price, setPrice] = useState(0);
  const sellerContract = useSellerContract();

  const fetchPrice = async () => {
    if (!sellerContract) return;

    try {
      const price = await sellerContract.methods.calculatePrice().call();
      setPrice(price);
    } catch (err) {
      console.log(err);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onClick = () => {
    openModal();
  };

  const generateIdenticon = (image) => {
    const size = 50;
    const svgString = toSvg(image, size);
    return `data:image/svg+xml,${encodeURIComponent(svgString)}`;
  };

  useEffect(() => {
    if (
      schooldata?.owner.toLowerCase() ===
      process.env.NEXT_PUBLIC_GIGA_ESCROW_ADDRESS.toLowerCase()
    )
      setOnSell(true);
    else setOnSell(false);
  }, [schooldata?.owner]);

  useEffect(() => {
    fetchPrice();
  });

  return (
    <Grid fullWidth className="mt-50px">
      <Column
        md={4}
        lg={7}
        sm={4}
        style={{ display: 'flex', justifyContent: 'flex-start' }}
      >
        <img
          style={{
            width: '80%',
          }}
          alt="School Map"
          src={generateIdenticon(schooldata?.image)}
        />
      </Column>
      <Column md={4} lg={8} sm={4}>
        <div>
          <h1 style={{ fontSize: '1.5em', marginTop: '32px' }}>Sell Status</h1>
          <p style={{ marginTop: '32px', marginBottom: '64px' }}>
            {onSell ? 'Currently Avaiable' : 'Not Available'}
          </p>
        </div>
        <hr />
        <div>
          <h1 style={{ fontSize: '1.5em', marginTop: '64px' }}>Ownership</h1>
          <p style={{ marginTop: '32px', marginBottom: '32px' }}>
            {schooldata?.owner}
          </p>
        </div>
        <div>
          {onSell && (
            <Button
              className="submit-btn"
              onClick={onClick}
              renderIcon={ArrowRight}
            >
              Buy Now
            </Button>
          )}
        </div>
      </Column>
      <NftPurchaseModal
        schooldata={schooldata}
        isOpen={isModalOpen}
        onClose={closeModal}
        tokenId={tokenId}
      />
    </Grid>
  );
};

export default Introduction;
