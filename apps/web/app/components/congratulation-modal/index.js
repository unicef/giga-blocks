// ModalComponent.js
import React from 'react';
import { Modal, ModalBody, ModalFooter, Button } from '@carbon/react';

const ModalComponent = ({ isOpen, onClose, onTabChange }) => {
  const handleClick = () => {
    onClose();
    onTabChange();
    console.log('closeModal');
  };

  return (
    <Modal open={isOpen} onRequestClose={onClose} passiveModal={true}>
      <ModalBody style={{ textAlign: 'center', margin: '0', padding: '0' }}>
        <h1 style={{ marginBottom: '24px', marginTop: '3rem' }}>Thank you</h1>
        <h4 style={{ marginBottom: '24px' }}>
          for your part in connecting schools to the internet! 🌐📚{' '}
        </h4>
        <h4 style={{ marginBottom: '3rem' }}>
          Your contribution to school data has been recorded.
        </h4>
      </ModalBody>
      <ModalFooter style={{ margin: '0' }}>
        <Button kind="secondary" onClick={handleClick}>
          Close
        </Button>
        <Button onClick={handleClick}>View Contributed Data</Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalComponent;
