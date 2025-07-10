'use client';

import { TextInput, Button, Tooltip } from '@carbon/react';
import { Information } from '@carbon/icons-react';
import { ConnectKitButton } from 'connectkit';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import './_activation.scss';
import { useBalance, useAccount } from 'wagmi';

export default function StandardActivationForm({
  baseFee,
  gasFee,
  donation,
  setDonation,
  handleActivate,
  isConnected,
  selectedThemeName,
  bgColor,
  fontColor,
  cardColor,
  schoolName,
  gasFeeWei,
  balance,
}) {
  const [donationError, setDonationError] = useState('');
  const [balanceError, setBalanceError] = useState(false);

  const handleDonationChange = (e) => {
    const value = e.target.value;
    // Allow only empty string or a valid positive number (integer or decimal, no special chars)
    if (value === '' || /^\d+(\.\d*)?$/.test(value)) {
      setDonation(value);
      setDonationError('');
    } else {
      setDonation(''); // Reset donation if invalid input
      setDonationError(
        'Please enter a valid positive amount (numbers only, no special characters)'
      );
    }
  };
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  useEffect(() => {
    const totalBalanceRequired =
      parseFloat(baseFee) + parseFloat(gasFee) + parseFloat(donation || 0);
    if (balance && parseFloat(balance.formatted) < totalBalanceRequired) {
      setBalanceError(true);
    } else {
      setBalanceError(false);
    }
  },[baseFee, gasFee, donation, balance]);

  return (
    <div
      className="activate-school-container "
      style={{ backgroundColor: bgColor }}
    >
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
                onChange={handleDonationChange}
                className="donation-input"
              />
            </div>
            {donationError && (
              <p className="donation-error" style={{ color: 'red' }}>
                {donationError}
              </p>
            )}

            <div className="globe-illustration">
              <Image
                src="/images/activate-school-earth-illustration.png"
                alt="People working with a globe"
                width={930}
                height={930}
              />
            </div>
          </div>

          <div className="activate-school-right">
            <div className="school-details">
              <div className="detail-row">
                <span className="detail-label">Selected School</span>
                <span className="detail-value">
                  {schoolName || 'No School Selected'}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Selected Theme</span>
                <div className="detail-row">
                  <div className="school-details__theme-option">
                    {selectedThemeName ? (
                      <>
                        <div
                          className="school-details__theme-color"
                          style={{ backgroundColor: bgColor }}
                        />
                        <div
                          className="school-details__theme-color"
                          style={{ backgroundColor: cardColor }}
                        />
                        <div
                          className="school-details__theme-color"
                          style={{ backgroundColor: fontColor }}
                        />
                      </>
                    ) : (
                      <span className=" detail-value">
                        Please select theme to activate school.{' '}
                      </span>
                    )}
                  </div>
                </div>
                {/* <span className="detail-value">-</span> */}
              </div>
              <div className="detail-row">
                <span className="detail-label">Base Fee</span>
                <span className="detail-value">{baseFee} Eth</span>
              </div>

              <div className="detail-row">
                <span className="detail-label">Gas Fee</span>
                <span className="detail-value">{Number(gasFeeWei)} Wei</span>
              </div>

              <div className="detail-row total-row">
                <span className="detail-value total-value">Grand Total</span>
                <span className="detail-value total-color-value">
                  {(
                    parseFloat(baseFee) +
                    parseFloat(gasFee) +
                    parseFloat(donation || 0)
                  ).toFixed(4)}{' '}
                  Eth
                </span>
                <br/>
                { balanceError &&
                <span className=" detail-value" style={{ color: 'red' }}>
                  Insufficient Balance. Available balance in wallet {(balance?.formatted)?.trim(0,2)} Eth
                </span>}
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
                  disabled={!selectedThemeName || donationError || balanceError}
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
