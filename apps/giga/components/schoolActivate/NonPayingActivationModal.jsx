'use client';
import { CheckmarkOutline, Email, Share } from '@carbon/icons-react';
import { Modal, Button } from '@carbon/react';
import './_activation.scss';

export default function NonPayingActivationModal({
  open,
  setOpen,
  schoolName,
}) {
  return (
    <Modal
      open={open}
      preventCloseOnClickOutside={false}
      passiveModal
      hasCloseIcon={false}
      onRequestClose={() => setOpen(true)}
      className="school-activation-non-paying-modal"
    >
      <div className="school-activation-non-paying">
        <div className="success-icon">
          <CheckmarkOutline size={32} />
        </div>
        <h2 className="congrats-text">Congratulations 🎉</h2>
        <p className="sub-text">
          You’ve successfully activated <strong>{schoolName}</strong>
        </p>

        <div className="email-box">
          <div className="email-icon">
            <Email size={20} />
          </div>
          <div className="email-text">
            <strong>Check your email!</strong>
            <p>
              We’ve sent you a link to claim your unique NFT representing this
              school activation
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
}
