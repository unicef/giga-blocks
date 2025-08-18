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
import Image from 'next/image';
import { Information } from '@carbon/icons-react';
import NonPayingActivationModal from './NonPayingActivationModal';

export default function NonPayingUser({
  email,
  setEmail,
  linkActivation,
  themeName,
  themeId,
  bgColor,
  schoolName,
  selectedThemeName,
  fontColor,
  cardColor,
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
  const [openModal, setModalOpen] = useState(false);

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

  const handleBack = () => {
    router.back();
  };

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
          setModalOpen(true);

          // router.push(`/schools/${id}`);
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
    <>
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
              <div className="formGroup">
                <label className="label">Email</label>
                <TextInput
                  id="email"
                  labelText=""
                  hideLabel
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isPending || showSuccess || showEmailVerify}
                />

                {showSuccess && (
                  <InlineNotification
                    kind="success"
                    subtitle="Magic link has been sent to your email."
                    lowContrast
                    hideCloseButton={true}
                    onCloseButtonClick={() => setShowSuccess(false)}
                    timeout={5000}
                    style={{
                      marginTop: '16px',
                      zIndex: 100,
                      pointerEvents: 'auto',
                    }}
                  />
                )}
                {showEmailVerify && (
                  <InlineNotification
                    kind="success"
                    subtitle="Email verified successfully. You can activate the school now."
                    lowContrast
                    onCloseButtonClick={() => setShowEmailVerify(false)}
                    timeout={5000}
                    hideCloseButton={true}
                    style={{
                      marginTop: '16px',
                      zIndex: 100,
                      pointerEvents: 'auto',
                    }}
                  />
                )}
                {showActivateSuccess && (
                  <InlineNotification
                    kind="success"
                    subtitle="School has been activated successfully."
                    lowContrast
                    onCloseButtonClick={() => setShowActivateSuccess(false)}
                    timeout={5000}
                    hideCloseButton={true}
                    style={{
                      marginTop: '16px',
                      zIndex: 100,
                      pointerEvents: 'auto',
                    }}
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
              <div className="globe-illustration-non-paying">
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
                            style={{
                              backgroundColor: fontColor,
                              borderTopLeftRadius: '4px',
                              borderBottomLeftRadius: '4px',
                            }}
                          />
                          <div
                            className="school-details__theme-color"
                            style={{
                              backgroundColor: cardColor,
                            }}
                          />
                          <div
                            className="school-details__theme-color"
                            style={{
                              backgroundColor: bgColor,
                              borderTopRightRadius: '4px',
                              borderBottomRightRadius: '4px',
                            }}
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
                {/* <div className="detail-row">
                <span className="detail-label">Base Fee</span>
                <span className="detail-value">{baseFee} Eth</span>
              </div>

              <div className="detail-row">
                <span className="detail-label">Gas Fee</span>
                <span className="detail-value">{gasFee} Eth</span>
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
              </div> */}
              </div>
              {/* <div className="non-paying-guide">
                <Information size={16} fill="#0F62FE" />
                <p className="text-guide">
                  After you activate, Please go to your wallet to confirm the
                  transaction
                </p>
              </div> */}

              <div className="non-paying-guide-container">
                <div className="guide-header">
                  <Information size={16} fill="#0F62FE" />
                  <p className="text-guide">What happens next?</p>
                </div>
                <ul>
                  <li className="guide-list-style">
                    We'll send a magic link to your email
                  </li>
                  <li className="guide-list-style">
                    Click the link to verify your identity
                  </li>
                  <li className="guide-list-style">
                    Your school will be activated automatically
                  </li>
                  <li className="guide-list-style">
                    You'll receive an NFT claim link via email
                  </li>
                </ul>
              </div>

              {showEmailVerify ? (
                <div className="actionButtons" style={{ marginTop: '12px' }}>
                  {/* <Button
                    onClick={handleBack}
                    kind="secondary"
                    disabled={isPending}
                  >
                    Cancel
                  </Button> */}
                  <Button onClick={handleActivate} disabled={isPending}>
                    {isPending ? 'Activating' : 'Activate'}
                  </Button>
                </div>
              ) : (
                <div className="actionButtons" style={{ marginTop: '12px' }}>
                  <Button
                    onClick={handleBack}
                    kind="secondary"
                    disabled={isPending}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleSubmit} disabled={isPending || !email}>
                    {isPending ? 'Verifying' : 'Verify'}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {openModal && (
        <NonPayingActivationModal
          open={openModal}
          setOpen={setModalOpen}
          schoolName={schoolName}
        />
      )}
    </>
  );
}
