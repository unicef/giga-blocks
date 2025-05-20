'use client';

import { TextInput, Button, Tooltip } from '@carbon/react';
import { Information } from '@carbon/icons-react';
import { ConnectKitButton } from 'connectkit';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
import './_activation.scss';

export default function StandardActivationForm({
  baseFee,
  gasFee,
  donation,
  setDonation,
  handleActivate,
  isConnected,
  selectedThemeName,
}) {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  return (
    <div className="activate-school-container">
      <div className="activate-school-card">
        <div className="activate-school-content">
          <div className="activate-school-left">
            <h1 className="activate-school-title">Activate School</h1>
            <p className="activate-school-description">
              Every activated school gains a permanent seat on the blockchain,
              one step closer to reliable internet access.
            </p>

            <div className="donation-section">
              <div className="donation-header">
                <span className="donation-label">Donation</span>
                <span className="donation-optional">
                  Optional
                  <Tooltip
                    direction="top"
                    label="Optional donation to support the school"
                  >
                    <Information size={16} />
                  </Tooltip>
                </span>
              </div>
              <TextInput
                id="donation"
                labelText=""
                placeholder="Enter donation amount"
                value={donation}
                onChange={(e) => setDonation(e.target.value)}
                className="donation-input"
              />
            </div>

            <div className="globe-illustration">
              <Image
                src="/images/activate-school-earth-illustration.png"
                alt="People working with a globe"
                width={950}
                height={950}
              />
            </div>
          </div>

          <div className="activate-school-right">
            <div className="school-details">
              <div className="detail-row">
                <span className="detail-label">Base Fee</span>
                <span className="detail-value">{baseFee} Eth</span>
              </div>

              <div className="detail-row">
                <span className="detail-label">Gas Fee</span>
                <span className="detail-value">{gasFee} Eth</span>
              </div>

              <div className="detail-row total-row">
                <span className="detail-label">Grand Total</span>
                <span className="detail-value total-value">
                  {(
                    parseFloat(baseFee) +
                    parseFloat(gasFee) +
                    parseFloat(donation || 0)
                  ).toFixed(2)}{' '}
                  Eth
                </span>
              </div>
            </div>

            <div className="action-buttons">
              <Button
                onClick={handleBack}
                kind="secondary"
                className="cancel-button"
              >
                Cancel
              </Button>
              {isConnected ? (
                <Button
                  onClick={handleActivate}
                  disabled={!selectedThemeName}
                  className="activate-button"
                >
                  Activate
                </Button>
              ) : (
                <ConnectKitButton.Custom>
                  {({ show }) => (
                    <Button
                      kind="primary"
                      onClick={show}
                      className="connect-wallet-button"
                    >
                      Connect Wallet
                    </Button>
                  )}
                </ConnectKitButton.Custom>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
