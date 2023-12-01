// ModalComponent.js
import React from 'react';
import { Modal, ModalBody, Column, Grid, Button } from '@carbon/react';
import { useRouter } from 'next/navigation';
import { ArrowRight } from '@carbon/icons-react';

const CongratulationModalComponent = ({ isOpen, onClose }) => {
  const route = useRouter();

  const handleClick = () => {
    onClose();
    route.push('/dashboard');
  };

  return (
    <Modal open={isOpen} onRequestClose={onClose} passiveModal={true}>
      <ModalBody>
        <h1>Congratulation on your purchase !!!</h1>
        <Grid style={{ marginTop: '18px' }}>
          <Column md={4} lg={16} sm={4} style={{ marginTop: '6px' }}>
            <p>Your purchase is in process. This might take a while.</p>
            <p>Thank you for your patience.</p>
            <div className="border-bottom"></div>
          </Column>
          <Column md={4} lg={16} sm={4}>
            <>
              <Button
                className="submit-btn"
                renderIcon={ArrowRight}
                onClick={handleClick}
              >
                Ok
              </Button>
            </>
          </Column>
        </Grid>
      </ModalBody>
    </Modal>
  );
};

export default CongratulationModalComponent;
