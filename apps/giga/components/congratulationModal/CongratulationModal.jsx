'use client';

import { Modal, Button } from '@carbon/react';
import Confetti from 'react-confetti';
import { useRef, useState } from 'react';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import useWindowDimensions from '../../app/hooks/useWindowDimensions';
import {
  CheckmarkOutline,
  Email,
  Share,
  Wallet,
  Replicate,
  LogoX,
  Copy,
  TaskComplete,
} from '@carbon/icons-react';

export default function CongratulationModal({
  open,
  onClose,
  id,
  name,
  countryName,
  tokenId,
  activatedAt,
}) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const { address } = useAccount();
  const walletAddress = '0x1234567890abcdef';
  const [hovered, setHovered] = useState(false);
  const { width, height } = useWindowDimensions();

  const currentPageUrl = `${process.env.NEXT_PUBLIC_WEB_NAME}/schools/${id}`;

  const handleActivateAnotherSchool = () => {
    router.push(`/schools/list`);
  };

  const handleCopy = () => {
    if (address) {
      navigator.clipboard.writeText(address).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
      });
    }
  };

  return (
    <>
      <Modal
        open={open}
        preventCloseOnClickOutside={false}
        passiveModal
        hasCloseIcon={false}
        onRequestClose={onClose}
        className="nft-claimed-non-paying-modal"
      >
        <div className="school-nft-claimed-non-paying">
          <div className="success-icon">
            <CheckmarkOutline size={32} />
          </div>
          <h2 className="congrats-text">NFT Claimed Successfully 🎉</h2>
          <p className="sub-text">
            Your {name} NFT has been transferred to your wallet
          </p>

          <div className="nft-claim-box">
            <div className="nft-claim-text">
              <strong>NFT Details</strong>
              <div className="nft-claim-details">
                <p>School: </p>
                <p>{name}</p>
              </div>
              <div className="nft-claim-details">
                <p>Location:</p>
                <p>{countryName}</p>
              </div>
              <div className="nft-claim-details">
                <p>Activation Date:</p>
                <p>{new Date(activatedAt).toLocaleDateString()}</p>
              </div>
              <div className="nft-claim-details">
                <p>Token ID:</p>
                <p>{Number(tokenId)}</p>
              </div>
            </div>
          </div>

          <div className="non-paying-wallet-id">
            <div className="non-paying-wallet-info">
              <Wallet size={16} stroke={2} />
              <p style={{ fontSize: '12px', fontWeight: 400 }}>
                Connect Wallet:
              </p>
            </div>
            {/* <div className="non-paying-wallet-address">
              <p style={{ fontSize: '20px', fontWeight: 400 }}>
                {walletAddress}
              </p>
              <Tooltip
                align="center"
                direction="top"
                tooltipText={copied ? 'Copied!' : 'Copy wallet address'}
              >
                <div
                  onClick={copyWalletAddress}
                  style={{
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {copied ? (
                    <CheckmarkFilled size={16} style={{ color: '#00C206' }} />
                  ) : (
                    <Replicate size={16} />
                  )}
                </div>
              </Tooltip>
            </div> */}

            {/* <div
              className="non-paying-wallet-address"
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <p style={{ fontSize: '20px', fontWeight: 400 }}>
                {walletAddress}
              </p>

              <Tooltip
                align="bottom"
                label={copied ? 'Copied!' : 'Copy'}
                open={copied} // Controlled tooltip visibility
              >
                <Replicate
                  size={16}
                  style={{ cursor: 'pointer' }}
                  onClick={handleCopy}
                />
              </Tooltip>
            </div> */}
            <div
              className="non-paying-wallet-address"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                position: 'relative',
              }}
            >
              {address?.slice(0, 4) + '...' + address?.slice(35, 43)}
              {copied ? (
                <TaskComplete
                  size={24}
                  style={{
                    marginLeft: '4px',
                    cursor: 'pointer',
                    color: '#A8A8A8',
                  }}
                  title="Copied!"
                />
              ) : (
                <Copy
                  size={20}
                  style={{
                    marginLeft: '4px',
                    cursor: 'pointer',
                    color: '#A8A8A8',
                  }}
                  onClick={handleCopy}
                  title="Copy Address"
                />
              )}
            </div>
            <p
              style={{ color: '#00C206', fontSize: '14px', fontWeight: '400' }}
            >
              Your NFT is now visible in your wallet.
            </p>
          </div>
          <div className="school-details__social-icons">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                currentPageUrl
              )}`}
              className="school-details__social-icon"
              target="_blank"
            >
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
              </svg>
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?text=${encodeURIComponent(
                currentPageUrl
              )}`}
              target="_blank"
              className="school-details__social-icon"
            >
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                currentPageUrl
              )}`}
              target="_blank"
              className="school-details__social-icon"
            >
              <LogoX size={24} />
            </a>
            {/* </a> */}
          </div>

          <div className="button-group">
            <Button onClick={handleActivateAnotherSchool} kind="secondary">
              Activate Another School
            </Button>
          </div>
        </div>
      </Modal>

      {open && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 9999,
            minHeight: '100vh',
            height: '100%',
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
