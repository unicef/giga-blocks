'use client';

import { Information, LogoX, CustomerService } from '@carbon/icons-react';
import Image from 'next/image';
import { useState } from 'react';
import { useThemeToggleStore } from '../../app/store/themeToggleStore';
import { usePathname } from 'next/navigation';
import { useAccount } from 'wagmi';
import { ProgressBar, ProgressIndicatorSkeleton } from '@carbon/react';

const Sidebar = ({
  imageHash,
  minted,
  fontColor,
  id,
  claim,
  owner,
  isTokenLoading,
  schoolName,
  isVerfierDisabled,
  verifiedCIW,
  handleCIWClick = () => {},
}) => {
  const [imageError, setImageError] = useState(false);
  const pathname = usePathname();
  const isClaimPath = pathname.includes('claim');
  const toggleVisibilityForMinted = useThemeToggleStore(
    (state) => state.toggleVisibilityForMinted
  );
  const { address } = useAccount();
  const currentPageUrl = `${process.env.NEXT_PUBLIC_WEB_NAME}/schools/${id}`;
  return (
    <div className="school-details__sidebar">
      {minted === 'MINTED' ? (
        <div className="school-details__minted-container">
          <div className="verify-ciw">
            {!isClaimPath && (
              <>
                {!verifiedCIW ? (
                  <p
                    disabled={isVerfierDisabled}
                    onClick={() => {
                      handleCIWClick();
                    }}
                    style={{
                      display: 'flex',
                      justifyContent: 'end',
                      marginBottom: '12px',
                      color: isVerfierDisabled ? 'gray' : fontColor,
                      cursor: isVerfierDisabled ? 'not-allowed' : 'pointer',
                      opacity: isVerfierDisabled ? 0.6 : 1,
                      pointerEvents: isVerfierDisabled ? 'none' : 'auto',
                    }}
                  >
                    Verify CIW
                  </p>
                ) : (
                  <p
                    style={{
                      display: 'flex',
                      justifyContent: 'end',
                      marginBottom: '12px',
                    }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 20 20"
                      fill="none"
                      style={{ marginRight: 6 }}
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="10" cy="10" r="10" fill="#4BB543" />
                      <path
                        d="M6 10.5L9 13.5L14 8.5"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Verified CIW
                  </p>
                )}
              </>
            )}

            {minted === 'MINTED' &&
            !isClaimPath  &&
            address?.toLowerCase() === owner?.toLowerCase() && !isTokenLoading ? (
              <p
                onClick={toggleVisibilityForMinted}
                style={{
                  display: 'flex',
                  justifyContent: 'end',
                  marginBottom: '12px',
                  color: fontColor,
                  cursor: 'pointer',
                }}
              >
                Change Template
              </p>
            ) : (
              <></>
            )}
          </div>
          <div className="school-details__minted-image-wrapper">
            {!imageError ? (
              <Image
                src={`https://ipfs.io/ipfs/${imageHash?.replace(
                  'ipfs://',
                  ''
                )}`}
                alt="School generated image"
                fill
                style={{ objectFit: 'cover' }}
                onError={() => setImageError(true)}
              />
            ) : (
              <Image
                src="/images/School-Image-Loading.svg"
                alt="School generated image"
                fill
                style={{ objectFit: 'cover' }}
              />
            )}
          </div>

          <div className="school-details__minted-content">
            <h3 className="school-details__minted-title">
              Art by Cole Sternberg
            </h3>
            <div></div>
            <p className="school-details__minted-description">
              This image was procedurally generated using the data for this
              school and will dynamically change as the underlying school data
              changes.{' '}
              <a
                style={{ color: fontColor }}
                href="https://beta-giga.rumsan.net/blog/artist"
                className="school-details__minted-link"
              >
                Learn More
              </a>
            </p>
            {!isTokenLoading && owner != undefined ? (
              <div className="school-details__activation-by">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#277AFF"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-circle-user-icon lucide-circle-user"
                >
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="10" r="3" />
                  <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
                </svg>

                <div className="school-details__activation-description">
                  Activated by :{' '}
                  {owner?.slice(0, 4) + '...' + owner?.slice(35, 43)}
                </div>
              </div>
            ) : (
              <ProgressBar />
            )}

            <div>
              <p className="school-details__social-label">
                Share your school on Social Media
              </p>

              <div className="school-details__social-icons">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    currentPageUrl
                  )}`}
                  className="school-details__social-icon"
                  target="_blank"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill={fontColor}
                  >
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
                  </svg>
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?text=${encodeURIComponent(
                    currentPageUrl
                  )}&title=${encodeURIComponent(
                    schoolName
                  )}&summary=Cool%20Nft%20Minted`}
                  target="_blank"
                  className="school-details__social-icon"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill={fontColor}
                  >
                    <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                    currentPageUrl
                  )}&text=${encodeURIComponent(
                    `Check out ${schoolName} on Giga! #NFTs #Education`
                  )}`}
                  target="_blank"
                  className="school-details__social-icon"
                >
                  <LogoX size={24} fill={fontColor} />
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : minted === 'NOTMINTED' ? (
        <div className="school-details__minted-image-wrapper">
          <Image
            src={`/images/placeholder.png`}
            alt="School generated image"
            fill
            style={{ objectFit: 'cover' }}
            onError={() => setImageError(true)}
          />
        </div>
      ) : (
        <div className="school-details__minted-image-wrapper">
          <Image
            src={`/images/School-Image-Loading.svg`}
            alt="School generated image"
            fill
            style={{ objectFit: 'cover' }}
            onError={() => setImageError(true)}
          />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
