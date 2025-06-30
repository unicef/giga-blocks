// components/QRCodeModal/QRCodeModal.jsx
'use client'; // This is essential!

import { Modal, Button } from '@carbon/react';
import { useQRCode } from 'next-qrcode'; // Direct import of the hook
import { useState, useEffect } from 'react';

export default function QRCodeModal({ isOpen, onClose, value,universalLink }) {
  const [isClient, setIsClient] = useState(false);
  const { Canvas } = useQRCode();
  console.log('QRCodeModal isOpen:', universalLink);
  console.log('QRCodeModal rendered with value:', value);

  useEffect(() => {
    // This effect runs only on the client side after hydration
    setIsClient(true);
  }, []);

  if (!isOpen) return null;

  return (
    <Modal
      open={isOpen}
      onRequestClose={onClose}
      modalHeading="Scan QR Code"
      passiveModal
      hasForm={false}
      preventCloseOnClickOutside={true}
      size="sm"
    >

        <p style={{ marginBottom: '20px', textAlign: 'center' }}>
          Scan this QR code with your device to proceed.
        </p>
        {/* Render the QR code only if 'isClient' is true and 'value' exists */}
        {value && isClient ? (
          <Canvas
            text={value}
            options={{
              errorCorrectionLevel: 'M',
              margin: 3,
              scale: 4,
              width: 256,
              color: {
                dark: '#000000FF',
                light: '#FFFFFFFF',
              },
            }}
          />
        ) : (
          // Display a placeholder while waiting for client-side render or if no value
          <p>{value ? "Initializing QR code..." : "No QR code data available."}</p>
        )}
        OR 
        Use the privado app for verification 
        < a href = {`https://wallet.privado.id/#i_m=${universalLink}`} target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline' }}/>
        
        <Button kind="secondary" onClick={onClose} style={{ marginTop: '30px' }}>
          Close
        </Button>
    </Modal>
  );
}