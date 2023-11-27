// ModalComponent.js
import React, { useState } from 'react';
import { Modal, ModalBody, Column, Grid, Button } from '@carbon/react';
import { toSvg } from 'jdenticon';
import { useRouter } from 'next/navigation';
import { ArrowRight } from '@carbon/icons-react';
import { useSellerContract } from '../../hooks/useContract';
import { useWeb3React } from '@web3-react/core';
import { metaMask } from '../../components/web3/connectors/metamask';

const ModalComponent = ({ isOpen, onClose, schooldata }) => {
  const sellerContract = useSellerContract();
  const { account } = useWeb3React();
  const [loading, setLoading] = useState(false);
  const generateIdenticon = (image) => {
    const size = 200; // Adjust the size as needed
    const svgString = toSvg(image, size);
    return `data:image/svg+xml,${encodeURIComponent(svgString)}`;
  };

  const route = useRouter();
  const handleSubmit = async () => {
    if (!sellerContract) return;
    if (!account) return;

    try {
      setLoading(true);
      const tx = await sellerContract.methods
        .purchaseNft('1', account)
        .send({ from: account });
      tx.wait();
      // route.push('/dashboard');
      onClose();
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const connectMetaMask = async () => {
    if (!account) {
      await metaMask.activate();
    }
  };

  return (
    <Modal open={isOpen} onRequestClose={onClose} passiveModal={true}>
      <ModalBody>
        <p>You are about to purchase NFT from {schooldata?.owner}</p>
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
              <p>0.000ETH</p>
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
          </Column>
          <Column md={4} lg={16} sm={4}>
            {account ? (
              <>
                <p style={{ fontWeight: '600' }}>
                  You are connected to "{account}" address{' '}
                </p>
                <p>
                  You will be asked to approve this purchase from your wallet.
                </p>

                <Button
                  className="submit-btn"
                  onClick={handleSubmit}
                  renderIcon={ArrowRight}
                >
                  {loading ? 'Loading...' : 'Submit'}
                </Button>
              </>
            ) : (
              <>
                <p> First you need to connect your MetaMask</p>
                <Button
                  className="submit-btn"
                  onClick={connectMetaMask}
                  renderIcon={ArrowRight}
                >
                  Connect MetaMask
                </Button>
              </>
            )}
          </Column>
        </Grid>
      </ModalBody>
    </Modal>
  );
};

export default ModalComponent;
