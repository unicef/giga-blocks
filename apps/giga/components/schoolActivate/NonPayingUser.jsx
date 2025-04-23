'use client';

import { TextInput, Button, InlineNotification } from '@carbon/react';
import {
  useSendMagicLink,
  useVerifyMagicLink,
} from '../../app/hooks/useSendMagicLink';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function NonPayingUser({
  email,
  setEmail,
  linkActivation,
  themeName,
}) {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { mutate, isPending } = useSendMagicLink();
  const { mutate: verifyMagicLink } = useVerifyMagicLink();

  const token = searchParams.get('token');
  const emailFromUrl = searchParams.get('email');
  const redirect = searchParams.get('redirect');

  // Prefill email if present in URL
  useEffect(() => {
    if (emailFromUrl) {
      setEmail(emailFromUrl);
    }
  }, [emailFromUrl, setEmail]);

  // Verify magic link if token/email/redirect are in URL
  useEffect(() => {
    if (token && emailFromUrl && redirect) {
      verifyMagicLink(
        { otp: token, email: emailFromUrl },
        {
          onSuccess: () => {
            router.push(redirect);
          },
          onError: (err) => {
            const message =
              err?.response?.data?.message || 'Link verification failed.';
            setErrorMessage(message);
            setShowError(true);
          },
        }
      );
    }
  }, [token, emailFromUrl, redirect, verifyMagicLink, router]);

  const handleSubmit = () => {
    if (!email) return;
    mutate(
      {
        email,
        redirectlink: `http://localhost:4200/schools/${id}/activate-school?linkActivation=${linkActivation}&email=${email}&themeName=${themeName}`,
      },
      {
        onSuccess: () => {
          setShowSuccess(true);
          setShowError(false);
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
          subtitle="Magic link has been sent to your email."
          lowContrast
          onCloseButtonClick={() => setShowSuccess(false)}
          timeout={5000}
          style={{ marginTop: '16px' }}
        />
      )}

      {showError && (
        <InlineNotification
          kind="error"
          title="Error"
          subtitle={errorMessage}
          lowContrast
          onCloseButtonClick={() => setShowError(false)}
          timeout={5000}
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
