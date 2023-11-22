// ModalComponent.js
import React, { useState } from 'react';
import { Modal, ModalBody, Column, Grid } from '@carbon/react';
import { toSvg } from 'jdenticon';
import { useRouter } from 'next/navigation';

const ModalComponent = ({ isOpen, onClose, schoolData }) => {
  const generateIdenticon = (image) => {
    const size = 200; // Adjust the size as needed
    const svgString = toSvg(image, size);
    return `data:image/svg+xml,${encodeURIComponent(svgString)}`;
  };

  const route = useRouter();
  const handleSubmit = () => {
    route.push('/dashboard');
    onClose();
  };

  return (
    <Modal open={isOpen} onRequestClose={onClose} passiveModal={true}>
      <ModalBody>
        <p>You are about to purchase NFT from tx23...sa212</p>
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
              src={generateIdenticon(schoolData?.image)}
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
              <p style={{ fontWeight: '600' }}>0.003ETH</p>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '12px',
              }}
            >
              <p>Price</p>
              <p>0.003ETH</p>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '12px',
              }}
            >
              <p>School Name</p>
            </div>
          </Column>
          <Column md={4} lg={16} sm={4} style={{ marginTop: '6px' }}>
            <div className="border-bottom"></div>
          </Column>
          <Column md={4} lg={16} sm={4}>
            <p style={{ fontWeight: '600' }}>Go to your wallet</p>
            <p>You will be asked to approve this purchase from your wallet.</p>
          </Column>
        </Grid>
      </ModalBody>
    </Modal>
  );
};

export default ModalComponent;
