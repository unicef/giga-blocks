'use client';

import { TextInput, Button, InlineNotification, Modal } from '@carbon/react';
import { ArrowRight } from '@carbon/icons-react';
import {
  useSendMagicLink,
  useVerifyMagicLink,
} from '../../app/hooks/useSendMagicLink';
import { useClaimSchool } from '../../app/hooks/useSchool';
import './_claimNft.scss';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { useAccount } from 'wagmi';
import { useThemeStore } from '../../app/store/themeStore';
import { ConnectKitButton } from 'connectkit';
import Confetti from 'react-confetti';
import CongratulationModal from '../congratulationModal/CongratulationModal';

export default function ClaimNFT({ name, countryName, tokenId, updatedAt }) {
  const { id } = useParams();
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const searchParams = useSearchParams();
  const { cardColor } = useThemeStore();
  const [email, setEmail] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showEmailVerify, setShowEmailVerify] = useState(false);
  const [showSchoolClaim, setShowSchoolClaim] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showClaimModal, setShowClaimModal] = useState(true);
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const { mutate, isPending } = useSendMagicLink();
  const { mutate: verifyMagicLink } = useVerifyMagicLink();
  const { mutate: claimSchool } = useClaimSchool();

  const token = searchParams.get('token');
  const emailFromUrl = searchParams.get('email');
  const redirect = searchParams.get('redirect');

  useEffect(() => {
    if (containerRef.current) {
      const { offsetWidth, offsetHeight } = containerRef.current;
      setDimensions({ width: offsetWidth, height: offsetHeight });
    }
  }, [showClaimModal]);

  useEffect(() => {
    if (isConnected && address) {
      setWalletAddress(address);
    }
  }, [isConnected, address]);

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
        redirectlink: `${process.env.NEXT_PUBLIC_WEB_NAME}/schools/claim/${id}?email=${email}`,
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

  const handleClaimSchool = () => {
    if (!walletAddress) return;
    claimSchool(
      {
        email: emailFromUrl,
        walletAddress,
        schoolId: id,
      },
      {
        onSuccess: () => {
          setShowSchoolClaim(true);
          setShowError(false);
          setShowClaimModal(true);
        },
        onError: (err) => {
          const message =
            err?.response?.data?.message ||
            'Something went wrong. Please try again.';
          setErrorMessage(message);
          setShowError(true);
          setShowSchoolClaim(false);
        },
      }
    );
  };

  return (
    <>
      <div className="thank-you-container" style={{ background: cardColor }}>
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
              {showEmailVerify ? (
                <>
                  <label className="form-label">Wallet Address</label>
                  <TextInput
                    id="wallet"
                    labelText=""
                    hideLabel
                    placeholder="Enter your wallet address"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    className="wallet-input"
                  />
                </>
              ) : (
                <>
                  <label className="form-label">Email Address</label>
                  <TextInput
                    id="email"
                    labelText=""
                    hideLabel
                    placeholder="Enter your email address"
                    //   value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="email-input"
                  />
                </>
              )}

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
                  subtitle="Email verified successfully. Enter wallet address if not entered already."
                  lowContrast
                  onCloseButtonClick={() => setShowSuccess(false)}
                  timeout={5000}
                  style={{ marginTop: '16px' }}
                />
              )}
              {showSchoolClaim && (
                <InlineNotification
                  kind="success"
                  subtitle="Claim Successful !!!"
                  lowContrast
                  onCloseButtonClick={() => showSchoolClaim(false)}
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
            </div>
            {!showEmailVerify ? (
              <Button
                className="claim-button"
                onClick={handleSubmit}
                renderIcon={ArrowRight}
              >
                Verify
              </Button>
            ) : isConnected || walletAddress ? (
              <Button
                onClick={handleClaimSchool}
                className="claim-button"
                renderIcon={ArrowRight}
              >
                Claim
              </Button>
            ) : (
              <ConnectKitButton />
            )}
          </div>
        </div>
      </div>
      <CongratulationModal
        open={showClaimModal}
        onClose={() => setShowClaimModal(false)}
        id={id}
        name={name}
        countryName={countryName}
        tokenId={tokenId}
        activatedAt={updatedAt}
      />
    </>
  );
}
