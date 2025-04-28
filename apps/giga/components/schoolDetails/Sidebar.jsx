'use client';

import { Information } from '@carbon/icons-react';
import Image from 'next/image';
import { useState } from 'react';
import { useThemeToggleStore } from '../../app/store/themeToggleStore';
import { usePathname } from 'next/navigation';

const Sidebar = ({ imageHash, minted, fontColor, claim }) => {
  const [imageError, setImageError] = useState(false);
  const pathname = usePathname();
  const isClaimPath = pathname.includes('claim');
  const toggleVisibilityForMinted = useThemeToggleStore(
    (state) => state.toggleVisibilityForMinted
  );
  return (
    <div className="school-details__sidebar">
      {minted === 'MINTED' ? (
        <div className="school-details__minted-container">
          {!isClaimPath && (
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
          )}
          <div className="school-details__minted-image-wrapper">
            {!imageError ? (
              <Image
                src={`https://ipfs.io/ipfs/${imageHash}`}
                alt="School generated image"
                fill
                style={{ objectFit: 'cover' }}
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="school-details__image-placeholder">
                <Information size={24} />
                <p>Unable to load image. The IPFS hash may be invalid.</p>
              </div>
            )}
          </div>

          <div className="school-details__minted-content">
            <h3 className="school-details__minted-title">
              Art by Cole Sternberg
            </h3>

            <p className="school-details__minted-description">
              This image was procedurally generated using the data for this
              school and will dynamically change as the underlying school data
              changes.{' '}
              <a
                style={{ color: fontColor }}
                href="#"
                className="school-details__minted-link"
              >
                Learn More
              </a>
            </p>

            <div>
              <p className="school-details__social-label">
                Share your school on Social Media
              </p>

              <div className="school-details__social-icons">
                <a href="#" className="school-details__social-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill={fontColor}
                  >
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
                  </svg>
                </a>
                <a href="#" className="school-details__social-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill={fontColor}
                  >
                    <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153.509.5.902 1.105 1.153 1.772.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772c-.5.508-1.105.902-1.772 1.153-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.247-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.247 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 1.802c-2.67 0-2.986.01-4.04.059-.976.045-1.505.207-1.858.344-.466.182-.8.398-1.15.748-.35.35-.566.684-.748 1.15-.137.353-.3.882-.344 1.857-.048 1.055-.058 1.37-.058 4.04 0 2.67.01 2.986.058 4.04.044.976.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.684.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.04.058 2.67 0 2.987-.01 4.04-.058.976-.044 1.504-.207 1.857-.344.466-.182.8-.398 1.15-.748.35-.35.566-.684.748-1.15.137-.353.3-.882.344-1.857.048-1.054.058-1.37.058-4.04 0-2.67-.01-2.986-.058-4.04-.044-.976-.207-1.504-.344-1.857a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.054-.048-1.37-.058-4.04-.058zm0 3.063a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 8.468a3.333 3.333 0 100-6.666 3.333 3.333 0 000 6.666zm6.538-8.469a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z" />
                  </svg>
                </a>
                <a href="#" className="school-details__social-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill={fontColor}
                  >
                    <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                </a>
                <a href="#" className="school-details__social-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill={fontColor}
                  >
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 01-1.93.07 4.28 4.28 0 004 2.98 8.521 8.521 0 01-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="school-details__image-placeholder">
          <Information size={24} />
          <p>
            This school is not activated. Activate this school to generate a
            unique image.
          </p>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
