'use client';

import { TextInput, Button, Tooltip } from '@carbon/react';
import { Information } from '@carbon/icons-react';

export default function StandardActivationForm({
  baseFee,
  gasFee,
  donation,
  setDonation,
  handleActivate,
}) {
  return (
    <>
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
            onChange={() => {}}
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
            onChange={() => {}}
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
        <Button onClick={handleActivate}>Activate</Button>
      </div>
    </>
  );
}
