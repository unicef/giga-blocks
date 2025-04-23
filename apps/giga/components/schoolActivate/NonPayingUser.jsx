'use client';

import { TextInput, Button } from '@carbon/react';
import { useActivateSchool } from '../../app/hooks/useSendMagicLink';
import { InlineNotification } from '@carbon/react';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export default function NonPayingUser({ email, setEmail, linkActivation }) {
  const { id } = useParams();

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { mutate, isPending, isSuccess, isError, error } = useActivateSchool();

  const handleSubmit = () => {
    if (!email) return;
    mutate(
      {
        email,
        redirectlink: `http://localhost:4200/schools/${id}/activate-school?linkActivation=${linkActivation}`,
      },
      {
        onSuccess: () => {
          setShowSuccess(true);
        },
        onError: (err) => {
          const message =
            err?.response?.data?.message ||
            'Something went wrong. Please try again.';
          setErrorMessage(message);
          setShowError(true);
          setShowSuccess(false);
        },
      }
    );
  };

  return (
    <div className="formGroup">
      <label className="label">Email</label>
      <TextInput
        id="email"
        labelText=""
        hideLabel
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isPending}
      />

      {showSuccess && (
        <InlineNotification
          kind="success"
          title="Success"
          subtitle="Magic link has been sent to your email."
          caption=""
          onCloseButtonClick={() => setShowSuccess(false)}
          timeout={3000}
          style={{ marginTop: '16px' }}
        />
      )}

      {showError && (
        <InlineNotification
          kind="error"
          title="Error"
          subtitle={errorMessage}
          onClose={() => setShowError(false)}
          lowContrast
          style={{ marginTop: '12px' }}
        />
      )}

      <div className="actionButtons" style={{ marginTop: '12px' }}>
        <Button kind="secondary" disabled={isPending}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={isPending || !email}>
          {isPending ? 'Verifying' : 'Verify'}
        </Button>
      </div>
    </div>
  );
}
