'use client'; 

import { Modal, Button } from '@carbon/react';
import { useQRCode } from 'next-qrcode';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function QRCodeModal({ isOpen, onClose, value, universalLink }) {
  const [isClient, setIsClient] = useState(false);
  const { Canvas } = useQRCode();
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isOpen) return null;

  return (
    <Modal
      open={isOpen}
      onRequestClose={onClose}
      passiveModal
      hasForm={false}
      preventCloseOnClickOutside={true}
      size="md"
      className="qrcode-modal"
    >
      <h4 className="qrcode-modal__heading">
        Scan this QR code with your device to proceed.
      </h4>
      <p className="qrcode-modal__instruction">
        Use the privado app for verification
      </p>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '1rem',
        }}
      >
        <Link
          href={universalLink}
          target="_blank"
          rel="noopener noreferrer"
          passHref
        >
          <Button kind="primary" className="qrcode-modal__button">
            Verify
          </Button>
        </Link>
      </div>
      <p className="qrcode-modal__instruction">OR</p>
      <p className="qrcode-modal__instruction">Scan using Mobile Wallet</p>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '1rem',
        }}
      >
        {value && isClient ? (
          <Canvas
            text={value}
            options={{
              errorCorrectionLevel: 'M',
              margin: 2,
              scale: 3,
              width: 300,
              color: {
                dark: '#000000FF',
                light: '#FFFFFFFF',
              },
            }}
          />
        ) : (
          <p>
            {value ? 'Initializing QR code...' : 'No QR code data available.'}
          </p>
        )}
      </div>
    </Modal>
  );
}
