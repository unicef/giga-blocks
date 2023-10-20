// ModalComponent.js
import React, { useState } from 'react';
import {
  Modal,
  ModalBody,
  ModalFooter,
  TextInput,
  Button,
} from '@carbon/react';

const ModalComponent = ({ isOpen, onClose }) => {
  const handleSubmit = () => {
    console.log('Submitted:', inputValue);
    onClose();
  };

  return (
    <Modal
      style={{ marginBottom: '0' }}
      open={isOpen}
      onRequestClose={onClose}
      passiveModal={true}
    >
      <ModalBody style={{ textAlign: 'center' }}>
        <h1 style={{ marginBottom: '24px' }}>Thank you</h1>
        <h4 style={{ textAlign: 'center', marginBottom: '24px' }}>
          for your part in connecting schools to the interenet! 🌐📚{' '}
        </h4>
        <h4>Your contribution to school data has been recorded.</h4>
      </ModalBody>
      <div style={{ textAlign: 'center' }}>
        <Button onClick={handleSubmit}>View Contributed Data</Button>
      </div>
    </Modal>
  );
};

export default ModalComponent;
