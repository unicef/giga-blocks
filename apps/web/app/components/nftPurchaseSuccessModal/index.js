// ModalComponent.js
import React from 'react';
import {
  Modal,
  ModalBody,
  Column,
  Grid,
  Button,
  ModalFooter,
} from '@carbon/react';
import { useRouter } from 'next/navigation';
import { toSvg } from 'jdenticon';
import { Default_Chain_Explorer } from '../../components/web3/connectors/network';

const CongratulationModalComponent = ({ isOpen, onClose, schooldata,transactionHash }) => {
  const route = useRouter();

  const generateIdenticon = (image) => {
    const size = 200;
    const svgString = toSvg(image, size);
    return `data:image/svg+xml,${encodeURIComponent(svgString)}`;
  };

  const handleClick = () => {
    onClose();
  };
  const handleClickRoute = () => {
    onClose();
    route.push('/viewMyNFT');
  };

  return (
    <Modal open={isOpen} onRequestClose={onClose} passiveModal={true}>
      <ModalBody>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <h1>Congratulations !!!</h1>
          <p>You have successfully bought {schooldata?.schoolName}.</p>
        </div>
        <Grid style={{ marginTop: '18px' }}>
          <Column
            md={4}
            lg={7}
            sm={4}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
            }}
          >
            <img
              style={{
                width: '80%',
              }}
              alt="School Map"
              src={generateIdenticon(schooldata?.image)}
            />
          </Column>
          <Column
            md={4}
            lg={9}
            sm={4}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '12px',
              }}
            >
              <p style={{ fontWeight: '600' }}>NFT Name</p>
              <p style={{ fontWeight: '600' }}>{schooldata?.schoolName}</p>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '12px',
              }}
            >
              <p>Price</p>
              <p>0.00 MATIC</p>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '12px',
              }}
            ></div>
          </Column>
          <Column md={4} lg={16} sm={4} style={{ marginTop: '6px' }}>
            <div className="border-bottom"></div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <h5 style={{ marginTop: '24px' }}>Transaction ID</h5>
              <a href={`${Default_Chain_Explorer}tx/${transactionHash}`}
              target='_blank'
              rel= "noopener noreferrer">{transactionHash?.slice(0,4)+'...'+transactionHash?.slice(-5)}</a>
            </div>
          </Column>
        </Grid>
      </ModalBody>
      <ModalFooter>
        <Button onClick={handleClick} style={{ background: '#383838' }}>
          Close
        </Button>
        <Button onClick={handleClickRoute}>View my NFTs</Button>
      </ModalFooter>
    </Modal>
  );
};

export default CongratulationModalComponent;
