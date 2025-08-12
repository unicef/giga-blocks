'use client';
import { Modal, Button } from '@carbon/react';

export default function ClaimedModal({ open, onClose, id }) {
  return (
    <>
      <Modal
        open={open}
        preventCloseOnClickOutside={true}
        passiveModal
        size="sm"
        className="dashboard-modal"
        onRequestClose={onClose}
      >
        <h3 className="dashboard-modal-activate-heading">
          Oops! This school has already been claimed.
        </h3>
        <p className="dashboard-modal-activate-description">
          Want to continue? 
          <span onClick={() => (window.location.href = `/schools/${id}`)}>
            Browse the directory
          </span>
           or 
          <span
            onClick={() =>
              (window.location.href = 'https://giga.global/contact-us/')
            }
          >
            get in touch.
          </span>
        </p>
      </Modal>
    </>
  );
}
