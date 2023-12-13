// ModalComponent.js
import React from 'react';
import { Modal, ModalBody, ModalFooter, Button } from '@carbon/react';
import { useRouter } from 'next/navigation';

const ModalComponent = ({ isOpen, onClose, id }) => {
  const route = useRouter();

  const handleClick = () => {
    onClose();
    route.push('/dashboard');
  };

  const handleSubmit = () => {
    onClose();
    route.push(`/contributeSchool`);
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
        <Button onClick={handleSubmit}>View Contributed Data</Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalComponent;
