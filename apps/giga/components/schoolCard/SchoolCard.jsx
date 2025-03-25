import Image from 'next/image';
import { Location, DataEnrichment } from '@carbon/icons-react';
import './_schoolCard.scss';
import Link from 'next/link';

export default function SchoolCard({
  id = 1,
  schoolName = 'Evergreen Academy for Advanced Scientific and Holistic Learning Experience',
  location = 'South Africa',
  isActivated = true,
  hasImage = true,
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

        {isActivated && (
          <div className="school-card__status">
            <DataEnrichment />
            <span>Activated</span>
          </div>
        )}
      </div>

      <div className="school-card__image">
        {hasImage ? (
          <Image
            src="/images/school-image.png"
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
