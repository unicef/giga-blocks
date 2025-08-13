'use client';

import { useEffect, useState } from 'react';
import { Modal, Checkbox, Button, TextInput } from '@carbon/react';
import {
  CheckmarkFilled,
  LogoFacebook,
  LogoLinkedin,
  LogoX,
  Wallet,
  ArrowRight,
} from '@carbon/icons-react';
import './_activation.scss';
import {
  useContributorGet,
  useContributorPatch,
} from '../../app/hooks/useContributor/index';
import { useAccount } from 'wagmi';
import { useParams, useRouter } from 'next/navigation';
import Confetti from 'react-confetti';
import toast from 'react-hot-toast';
import useWindowDimensions from '../../app/hooks/useWindowDimensions';

export default function ActivationModal({
  isOpen,
  onClose,
  schoolName,
  schoolLocation,
  createdAt,
}) {
  const { id } = useParams();
  const [showNameOnList, setShowNameOnList] = useState(true);
  const [contributorName, setContributorName] = useState('');
  const [contributorVisible, setContributorVisible] = useState(false);
  const { address: walletAddress } = useAccount();
  const patchContributor = useContributorPatch();
  const { data: contributorData } = useContributorGet(walletAddress);
  const router = useRouter();
  const handleCheckboxChange = (event) => {
    const checked = event.target.checked;
    setShowNameOnList(checked);
    if (!checked) {
      setContributorName('');
    }
  };

  const handleVisitClick = () => {
    patchContributor.mutate(
      {
        walletAddress,
        isVisible: showNameOnList,
        name: contributorName,
      },
      {
        onSuccess: () => {
          onClose();
          router.push(`/schools/${id}`);
        },
        onError: (err) => {
          onClose();
          toast.error('Failed to update contributor:', err);
          router.push(`/schools/${id}`);
        },
      }
    );
  };

  const handleContributors = () => {
    patchContributor.mutate(
      {
        walletAddress,
        isVisible: showNameOnList,
        name: contributorName,
      },
      {
        onSuccess: () => {
          onClose();
          router.push('/about#contributors');
        },
        onError: (err) => {
          onClose();
          toast.error('Failed to update contributor:', err);
          router.push('/about#contributors');
        },
      }
    );
  };

  const currentPageUrl = `${process.env.NEXT_PUBLIC_WEB_NAME}/schools/${id}`;

  useEffect(() => {
    if (!contributorData) return;
    if (contributorData?.isVisible === true) {
      setContributorVisible(true);
      setContributorName(contributorData?.name || '');
    }
  }, [contributorData]);

  const { width, height } = useWindowDimensions();

  return (
    <>
      <Modal
        open={isOpen}
        onRequestClose={onClose}
        modalHeading=""
        passiveModal
        className="activationModal"
        preventCloseOnClickOutside={true}
        hasCloseIcon={false}
      >
        <div className="activationModalContent">
          <div className="activationHeader">
            <h1>🎉</h1>
            <h2 className="activationTitle">
              Congratulations, You have activated {schoolName}
            </h2>
            <p className="activationMessage">
              Thank you for your contribution. Every activated school gains a
              permanent seat on the blockchain, one step closer to reliable
              internet access.
            </p>
          </div>

          <div className="activation-modal-school-details">
            <div className="activation-nft-text">
              <strong>NFT Details</strong>
              <div className="activation-nft-claim-details">
                <p>School: </p>
                <p>{schoolName}</p>
              </div>
              <div className="activation-nft-claim-details">
                <p>Location:</p>
                <p>{schoolLocation}</p>
              </div>
              <div className="activation-nft-claim-details">
                <p>Activation Date:</p>
                <p>{new Date(createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          <div className="shareSection">
            <p className="shareLabel">Share</p>
            <div className="socialIcons">
              <button
                className="socialIcon"
                aria-label="Share on Facebook"
                onClick={() => {
                  window.open(
                    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      currentPageUrl
                    )}`,
                    '_blank'
                  );
                }}
              >
                <LogoFacebook size={24} />
              </button>
              {/* <button className="socialIcon" aria-label="Share on Instagram">
                <LogoInstagram size={24} />
              </button> */}
              <button
                className="socialIcon"
                aria-label="Share on LinkedIn"
                onClick={() => {
                  window.open(
                    `https://www.linkedin.com/sharing/share-offsite/?text=${encodeURIComponent(
                      currentPageUrl
                    )}`
                  );
                }}
              >
                <LogoLinkedin size={24} />
              </button>
              <button
                className="socialIcon"
                aria-label="Share on Twitter"
                onClick={() => {
                  window.open(
                    `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                      currentPageUrl
                    )}`
                  );
                }}
              >
                <LogoX size={24} />
              </button>
            </div>
          </div>

          {!contributorVisible && (
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
                    placeholder="Enter your ENS  or your name"
                    value={contributorName}
                    onChange={(e) => setContributorName(e.target.value)}
                  />
                </div>
              )}
            </div>
          )}

          <div className="activation-modal-buttons">
            <Button
              className="visitButton"
              renderIcon={ArrowRight}
              onClick={handleVisitClick}
            >
              Visit School Details
            </Button>
            <Button
              kind="ghost"
              className="contributor-button"
              onClick={handleContributors}
            >
              View Giga Contributors list
            </Button>
          </div>
        </div>
      </Modal>
      {/* Render Confetti absolutely over the modal when open */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 9999,
          }}
        >
          <Confetti
            width={width}
            height={Math.max(height, 800)} // Minimum height of 800px
            numberOfPieces={900}
            recycle={true}
            gravity={0.15}
            tweenDuration={8000}
          />
        </div>
      )}
    </>
  );
}
