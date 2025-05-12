'use client';

import { useState } from 'react';
import { Modal, Checkbox, Button, TextInput } from '@carbon/react';
import {
  CheckmarkFilled,
  LogoFacebook,
  LogoInstagram,
  LogoLinkedin,
  LogoTwitter,
} from '@carbon/icons-react';
import './_activation.scss';
import { useContributorPatch } from '../../app/hooks/useContributor/index';
import { useAccount } from 'wagmi';
import { useParams, useRouter } from 'next/navigation';

export default function ActivationModal({ isOpen, onClose }) {
  const { id } = useParams();
  const [showNameOnList, setShowNameOnList] = useState(false);
  const [contributorName, setContributorName] = useState('');
  const { address: walletAddress } = useAccount();
  const patchContributor = useContributorPatch();
  const { router } = useRouter();
  const handleCheckboxChange = (event) => {
    const checked = event.target.checked;
    setShowNameOnList(checked);
    if (!checked) {
      setContributorName('');
    }
  };

  const handleVisitClick = () => {
    patchContributor.mutate({
      walletAddress,
      isVisible: showNameOnList,
      name: contributorName,
    });
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onRequestClose={onClose}
      modalHeading=""
      passiveModal
      className="activationModal"
    >
      <div className="activationModalContent">
        <div className="activationHeader">
          <h2 className="activationTitle">
            School Activated
            <span className="checkmarkIcon">
              <CheckmarkFilled size={24} />
            </span>
          </h2>
          <p className="activationMessage">Thank you for your contribution.</p>
        </div>

        <div className="shareSection">
          <p className="shareLabel">Share</p>
          <div className="socialIcons">
            <button className="socialIcon" aria-label="Share on Facebook">
              <LogoFacebook size={24} />
            </button>
            <button className="socialIcon" aria-label="Share on Instagram">
              <LogoInstagram size={24} />
            </button>
            <button className="socialIcon" aria-label="Share on LinkedIn">
              <LogoLinkedin size={24} />
            </button>
            <button className="socialIcon" aria-label="Share on Twitter">
              <LogoTwitter size={24} />
            </button>
          </div>
        </div>

        <div className="contributorOption">
          <Checkbox
            id="contributor-list"
            labelText="Allow to show your name on Giga Contributor List"
            checked={showNameOnList}
            onChange={handleCheckboxChange}
          />

          {showNameOnList && (
            <div className="nameInputContainer">
              <TextInput
                id="contributor-name"
                labelText="Your Name"
                placeholder="Enter your name"
                value={contributorName}
                onChange={(e) => setContributorName(e.target.value)}
              />
            </div>
          )}
        </div>

        <Button className="visitButton" onClick={handleVisitClick}>
          Visit School Details
        </Button>
      </div>
    </Modal>
  );
}
