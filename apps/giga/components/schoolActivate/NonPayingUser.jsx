'use client';

import { TextInput, Button } from '@carbon/react';
import { useActivateSchool } from '../../app/hooks/useSendMagicLink';
import { redirect } from 'next/dist/server/api-utils';
import { useParams } from 'next/navigation';

export default function NonPayingUser({ email, setEmail, linkActivation }) {
  const { id } = useParams();

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
          console.log('Submitted');
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
      {isError && (
        <p style={{ color: 'red', marginTop: '8px' }}>
          {error?.response?.data?.message || 'Something went wrong'}
        </p>
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
