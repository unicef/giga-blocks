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
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    console.log('Submitted:', inputValue);
    onClose();
  };

  return (
    <Modal
      modalHeading="Web3 Login"
      modalLabel="Connect your metamask"
      open={isOpen}
      onRequestClose={onClose}
      passiveModal={true}
    >
      <ModalBody>
        <TextInput
          labelText="Wallet Address"
          value={inputValue}
          onChange={handleInputChange}
        />
      </ModalBody>
      <ModalFooter>
        <Button kind="secondary" onClick={onClose}>
          Disconnect
        </Button>
        <Button onClick={handleSubmit}>Login With Metamask</Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalComponent;
