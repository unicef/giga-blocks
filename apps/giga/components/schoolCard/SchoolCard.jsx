import Image from 'next/image';
import { Location, DataEnrichment } from '@carbon/icons-react';
import './_schoolCard.scss';
import Link from 'next/link';

export default function SchoolCard({
  id,
  schoolName,
  location,
  minted,
  imageHash,
}) {
  const displayName =
    schoolName.length > 60 ? `${schoolName.substring(0, 60)}...` : schoolName;

  return (
    <Link href={`/schools/${id}`} className="school-card">
      <div className="school-card__content">
        <h3 className="school-card__title">{displayName}</h3>

        <div className="school-card__location">
          <Location />
          <span>{location}</span>
        </div>

        {minted === 'MINTED' ? (
          <div className="school-card__minted">
            <DataEnrichment />
            <span>{minted}</span>
          </div>
        ) : (
          <div className="school-card__unminted">
            {/* <DataEnrichment /> */}
            <span>
              {minted === 'MINTED' ? 'Activated' : 'Ready to Activate'}
            </span>
          </div>
        )}
      </div>

      <div className="school-card__image">
        {minted === 'MINTED' ? (
          <Image
            src={`https://ipfs.io/ipfs/${imageHash}`}
            alt={`Image of ${schoolName}`}
            width={200}
            height={200}
          />
        ) : (
          <div className="school-card__placeholder">
            <Image
              src="/images/no-img.png"
              alt={`No image available`}
              width={150}
              height={120}
            />
          </div>
        )}
      </div>
    </Link>
  );
}
