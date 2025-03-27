'use client';

import { useState } from 'react';
import Link from 'next/link';
import { TextInput, Button, Tooltip } from '@carbon/react';
import { ArrowLeft, Information, Close } from '@carbon/icons-react';
import './_activate.scss';

export default function ActivateSchool() {
  const [baseFee, setBaseFee] = useState('0.01');
  const [gasFee, setGasFee] = useState('00');
  const [donation, setDonation] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('blue');

  const handleClearBaseFee = () => {
    setBaseFee('');
  };

  const handleClearGasFee = () => {
    setGasFee('');
  };

  const calculateTotal = () => {
    const base = Number.parseFloat(baseFee) || 0;
    const gas = Number.parseFloat(gasFee) || 0;
    const donate = Number.parseFloat(donation) || 0;
    return (base + gas + donate).toFixed(2);
  };

  return (
    <div className="container">
      <div className="backButton">
        <Link href="/" className="backLink">
          <ArrowLeft size={20} />
          <span>Back</span>
        </Link>
      </div>

      <div className="content">
        <div className="formSection">
          <h1 className="title">Activate School</h1>
          <p className="subtitle">
            Click a theme below to preview and select it for the activated
            school view.
          </p>

          <div className="formGroup">
            <label className="label">Base Fee</label>
            <div className="inputWithClear">
              <TextInput
                id="base-fee"
                labelText=""
                hideLabel
                disabled
                aria-label="Base fee amount, read only"
                value={baseFee}
                onChange={() => {}} // Empty function since input is disabled
              />
              <span className="ethLabel">Eth</span>
            </div>
            <p className="helperText">
              Porem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum, ac aliquet odio mattis.
            </p>
          </div>

          <div className="formGroup">
            <label className="label">Gas Fee</label>
            <div className="inputWithClear">
              <TextInput
                id="gas-fee"
                labelText=""
                hideLabel
                disabled
                aria-label="Gas fee amount, read only"
                value={gasFee}
                onChange={() => {}} // Empty function since input is disabled
              />
            </div>
            <p className="helperText">
              Jorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum, ac aliquet odio mattis.
            </p>
          </div>

          <div className="formGroup">
            <div className="donationHeader">
              <label className="label">Donation</label>
              <div className="optional">
                Optional
                <Tooltip
                  align="center"
                  direction="right"
                  tooltipText="Optional donation amount"
                >
                  <Information size={16} />
                </Tooltip>
              </div>
            </div>
            <TextInput
              id="donation"
              labelText=""
              hideLabel
              placeholder="Enter donation amount"
              value={donation}
              onChange={(e) => setDonation(e.target.value)}
            />
            <p className="helperText">
              Morem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum, ac aliquet odio mattis.
            </p>
          </div>

          <div className="actionButtons">
            <Button kind="secondary">Cancel</Button>
            <Button>Activate</Button>
          </div>
        </div>

        <div className="previewSection">
          <div className="previewCard">
            <h2 className="schoolName">
              Evergreen Academy for Advanced Scientific and Holistic Learning
            </h2>
            <p className="schoolLevel">Higher Secondary</p>
            <div className="locationRow">
              <span className="locationIcon">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 8.5C9.10457 8.5 10 7.60457 10 6.5C10 5.39543 9.10457 4.5 8 4.5C6.89543 4.5 6 5.39543 6 6.5C6 7.60457 6.89543 8.5 8 8.5Z"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 14.5C10.5 12 13 9.36396 13 6.5C13 3.73858 10.7614 1.5 8 1.5C5.23858 1.5 3 3.73858 3 6.5C3 9.36396 5.5 12 8 14.5Z"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span>USA</span>
            </div>

            <div className="themeRow">
              <span className="themeLabel">Selected Theme:</span>
              <div className="themeBox"></div>
            </div>

            <div className="totalSection">
              <div className="totalLabel">Grand Total</div>
              <div className="totalAmount">{calculateTotal()} Eth</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
