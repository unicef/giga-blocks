'use client';

import { TextInput, Button } from '@carbon/react';
import { ArrowRight } from '@carbon/icons-react';
import './_claimNft.scss';

export default function ClaimNFT({ email, setEmail, handleActivate }) {
  return (
    <div className="thank-you-container">
      <div className="thank-you-content">
        <div className="thank-you-header">
          <span className="emoji" role="img" aria-label="celebration">
            🎉
          </span>
          <div className="thank-you-text">
            <h2>Thankyou for contributing to Giga Blocks.</h2>
            <p>You've already activated this school. Claim your NFT</p>
            <p className="brand-name">Giga Blocks</p>
          </div>
        </div>

        <div className="claim-form">
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <TextInput
              id="email"
              labelText=""
              hideLabel
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="email-input"
            />
          </div>

          <Button
            className="claim-button"
            onClick={handleActivate}
            renderIcon={ArrowRight}
          >
            Claim
          </Button>
        </div>
      </div>
    </div>
  );
}
