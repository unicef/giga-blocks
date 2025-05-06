'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@carbon/react';
import { ArrowRight } from '@carbon/icons-react';
import './_schoolCard.scss';

export default function SchoolCard({
  id,
  schoolName,
  location,
  minted,
  imageHash,
  linkActivation,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const displayName =
    schoolName.length > 60 ? `${schoolName.substring(0, 60)}...` : schoolName;

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div
      className="school-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="school-card__image">
        {minted === 'MINTED' ? (
          <Image
            src={`https://ipfs.io/ipfs/${imageHash}`}
            alt={`Image of ${schoolName}`}
            width={400}
            height={300}
            className="school-card__img"
          />
        ) : (
          <div className="school-card__placeholder">
            <Image
              src="/images/no-img.png"
              alt={`No image available`}
              width={400}
              height={300}
              className="school-card__img"
            />
          </div>
        )}

        {isHovered && (
          <div className="school-card__overlay">
            <Link
              href={
                linkActivation
                  ? `/schools/${id}?linkActivation=${linkActivation}`
                  : `/schools/${id}`
              }
            >
              <Button
                className="school-card__view-button"
                renderIcon={ArrowRight}
              >
                View Details
              </Button>
            </Link>
          </div>
        )}
      </div>

      <div className="school-card__content">
        <h3 className="school-card__title">{displayName}</h3>
        <p className="school-card__location">{location}</p>
      </div>
    </div>
  );
}
