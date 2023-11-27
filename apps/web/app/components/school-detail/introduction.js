import { Grid, Column, Button } from '@carbon/react';
import '../../components/landing-page/styles/preview.scss';
import { ArrowRight } from '@carbon/icons-react';
import './school-detail.scss';
import { toSvg } from 'jdenticon';
import { useState } from 'react';
import NftPurchaseModal from '../../components/nftPurchaseModal';

const Introduction = ({ schooldata }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          <h1 style={{ fontSize: '1.5em' }}>{schooldata?.schoolName}</h1>
          <p style={{ marginTop: '32px', marginBottom: '32px' }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>
        <hr />
        <div>
          <h1 style={{ fontSize: '1.5em', marginTop: '32px' }}>Sell Status</h1>
          <p style={{ marginTop: '32px', marginBottom: '32px' }}>
            Currently Unavailable
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
          <Button
            className="submit-btn"
            onClick={onClick}
            renderIcon={ArrowRight}
          >
            Buy Now
          </Button>
          <p>Know more about the Item History</p>
        </div>
      </Column>
      <NftPurchaseModal
        schooldata={schooldata}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </Grid>
  );
};

export default Introduction;
