'use client';

import { TextInput, Button, InlineNotification } from '@carbon/react';
import {
  useSendMagicLink,
  useVerifyMagicLink,
} from '../../app/hooks/useSendMagicLink';
import { useSchoolActivate } from '../../app/hooks/useSchool';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

export default function NonPayingUser({
  email,
  setEmail,
  linkActivation,
  themeName,
  themeId,
}) {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { address: walletAddress } = useAccount();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showActivateSuccess, setShowActivateSuccess] = useState(false);
  const [showEmailVerify, setShowEmailVerify] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { mutate, isPending } = useSendMagicLink();
  const { mutate: verifyMagicLink } = useVerifyMagicLink();
  const { mutate: activateSchool } = useSchoolActivate();

  const token = searchParams.get('token');
  const emailFromUrl = searchParams.get('email');
  const redirect = searchParams.get('redirect');

  useEffect(() => {
    if (emailFromUrl) {
      setEmail(emailFromUrl);
    }
  }, [emailFromUrl, setEmail]);

  useEffect(() => {
    if (token && emailFromUrl && redirect) {
      verifyMagicLink(
        { otp: token, email: emailFromUrl },
        {
          onSuccess: () => {
            router.push(redirect);
            setShowEmailVerify(true);
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
        redirectlink: `${process.env.NEXT_PUBLIC_WEB_NAME}/schools/${id}/activate-school?linkActivation=${linkActivation}&email=${email}&themeName=${themeName}`,
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

  const handleActivate = () => {
    if (!email) return;
    activateSchool(
      {
        email,
        schoolId: id,
        walletAddress,
        themeId,
        isVisible: true,
      },
      {
        onSuccess: () => {
          setShowActivateSuccess(true);
          setShowEmailVerify(false);
          router.push(`/schools/claim/${id}`);
        },
        onError: () => {
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
      {showEmailVerify && (
        <InlineNotification
          kind="success"
          subtitle="Email verified successfully. You can activate the school now."
          lowContrast
          onCloseButtonClick={() => setShowSuccess(false)}
          timeout={5000}
          style={{ marginTop: '16px' }}
        />
      )}
      {showActivateSuccess && (
        <InlineNotification
          kind="success"
          subtitle="School has been activated successfully."
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

      {showEmailVerify ? (
        <div className="actionButtons" style={{ marginTop: '12px' }}>
          <Button kind="secondary" disabled={isPending}>
            Cancel
          </Button>
          <Button onClick={handleActivate} disabled={isPending}>
            {isPending ? 'Activating' : 'Activate'}
          </Button>
        </div>
      ) : (
        <div className="actionButtons" style={{ marginTop: '12px' }}>
          <Button kind="secondary" disabled={isPending}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isPending || !email}>
            {isPending ? 'Verifying' : 'Verify'}
          </Button>
        </div>
      )}
    </div>
  );
}
