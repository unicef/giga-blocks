'use client';

import { Modal, Button } from '@carbon/react';
import Confetti from 'react-confetti';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CongratulationModal({ open, onClose, id }) {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const router = useRouter();

  useEffect(() => {
    if (containerRef.current) {
      const { offsetWidth, offsetHeight } = containerRef.current;
      setDimensions({ width: offsetWidth, height: offsetHeight });
    }
  }, [open]);

  return (
    <Modal
      open={open}
      passiveModal
      onRequestClose={onClose}
      size="sm"
      hasCloseIcon={false}
    >
      <div ref={containerRef} style={{ textAlign: 'left', padding: '20px' }}>
        {open && (
          <Confetti
            width={dimensions.width}
            height={dimensions.height}
            numberOfPieces={200}
            recycle={true}
          />
        )}

        <span
          className="emoji"
          role="img"
          aria-label="celebration"
          style={{ fontSize: '40px' }}
        >
          🎉
        </span>
        <h2 style={{ marginTop: '20px' }}>NFT Claimed Successfully</h2>
        <p style={{ color: 'gray', marginTop: '10px' }}>
          Your contribution is now part of the Giga Blocks legacy
        </p>

        <div style={{ marginTop: '30px' }}>
          <Button
            kind="primary"
            size="lg"
            onClick={() => {
              onClose();
              router.push(`/schools/${id}`);
            }}
          >
            View Giga Contributors List
          </Button>
        </div>
      </div>
    </Modal>
  );
}
