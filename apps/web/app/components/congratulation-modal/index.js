// ModalComponent.js
import React, { useState } from 'react';
import {
  Modal,
  ModalBody,
  ModalFooter,
  TextInput,
  Button,
} from '@carbon/react';
import { useRouter } from 'next/navigation';

const ModalComponent = ({ isOpen, onClose }) => {
  const route = useRouter();
  const handleSubmit = () => {
    route.push('/dashboard');
    onClose();
  };

  return (
    <Modal open={isOpen} onRequestClose={onClose} passiveModal={true}>
      <ModalBody style={{ textAlign: 'center', margin: '0', padding: '0' }}>
        <h1 style={{ marginBottom: '24px', marginTop: '3rem' }}>Thank you</h1>
        <h4 style={{ marginBottom: '24px' }}>
          for your part in connecting schools to the interenet! 🌐📚{' '}
        </h4>
        <h4 style={{ marginBottom: '3rem' }}>
          Your contribution to school data has been recorded.
        </h4>
      </ModalBody>
      <ModalFooter style={{ margin: '0' }}>
        <Button kind="secondary" onClick={onClose}>
          Close
        </Button>
        <Button onClick={handleSubmit}>View Contributed Data</Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalComponent;