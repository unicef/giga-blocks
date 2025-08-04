'use client';

import LandingPage from './home/page';
import FAQs from '../components/faqs/faqs';
import BlockMetrics from '../components/blockMetrics/blockMetrics';
import FeaturedSchool from '../components/featuredSchool/FeaturedSchool';
import { Button, Modal } from '@carbon/react';
import { useState } from 'react';
import {
  CheckmarkOutline,
  Email,
  Share,
  Wallet,
  Replicate,
  CheckmarkFilled,
} from '@carbon/icons-react';

export default function Page() {
  const [open, setOpen] = useState(true);
  const [copied, setCopied] = useState(false);
  const walletAddress = '0x1234567890abcdef';
  const [hovered, setHovered] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);

    setTimeout(() => setCopied(false), 1000); // Hide after 1 second
  };

  return (
    <>
      <LandingPage />
      <BlockMetrics />
      <FeaturedSchool />
      <FAQs />

      {/* <Modal
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
            You’ve successfully activated{' '}
            <strong>Juneli English Boarding School</strong>
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

          <div className="button-group">
            <Button kind="primary">Activate Another School</Button>
            <Button kind="tertiary" renderIcon={Share}>
              Share Impact
            </Button>
          </div>
        </div>
      </Modal> */}

      <Modal
        open={open}
        preventCloseOnClickOutside={false}
        passiveModal
        hasCloseIcon={false}
        onRequestClose={() => setOpen(true)}
        className="nft-claimed-non-paying-modal"
      >
        <div className="school-nft-claimed-non-paying">
          <div className="success-icon">
            <CheckmarkOutline size={32} />
          </div>
          <h2 className="congrats-text">NFT Claimed Successfully 🎉</h2>
          <p className="sub-text">
            Your Juneli English Boarding School NFT has been transferred to your
            wallet
          </p>

          <div className="nft-claim-box">
            <div className="nft-claim-text">
              <strong>NFT Details</strong>
              <div className="nft-claim-details">
                <p>School: </p>
                <p>Juneli English Boarding School</p>
              </div>
              <div className="nft-claim-details">
                <p>Location:</p>
                <p>123 Main St, Springfield</p>
              </div>
              <div className="nft-claim-details">
                <p>Activation Date:</p>
                <p>July 21, 2025</p>
              </div>
              <div className="nft-claim-details">
                <p>Token ID:</p>
                <p>0x1234567890abcdef</p>
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
              <p style={{ fontSize: '20px', fontWeight: 400 }}>
                {walletAddress}
              </p>

              <div
                onClick={handleCopy}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{ cursor: 'pointer', position: 'relative' }}
              >
                <Replicate size={16} />

                {hovered && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '-20px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      fontSize: '12px',
                      color: copied ? 'green' : '#666',
                      background: '#f4f4f4',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {copied ? 'Copied' : 'Copy'}
                  </span>
                )}
              </div>
            </div>
            <p
              style={{ color: '#00C206', fontSize: '14px', fontWeight: '400' }}
            >
              Your NFT is now visible in your wallet.
            </p>
          </div>

          <div className="button-group">
            <Button kind="secondary">Activate Another School</Button>
            <Button kind="tertiary" renderIcon={Share}>
              Share Impact
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
