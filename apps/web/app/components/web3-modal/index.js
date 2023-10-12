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
    // Handle form submission logic here
    console.log('Submitted:', inputValue);
    onClose(); // Close the modal after form submission
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
          Login With Metamask
        </Button>
        <Button onClick={handleSubmit}>Disconnect</Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalComponent;
