import Image from 'next/image';
import { Location, DataEnrichment } from '@carbon/icons-react';
import './_schoolCard.scss';

export default function SchoolCard({
  schoolName = 'Evergreen Academy for Advanced Scientific and Holistic Learning Experience',
  location = 'South Africa',
  isActivated = true,
  hasImage = true,
}) {
  const displayName =
    schoolName.length > 60 ? `${schoolName.substring(0, 60)}...` : schoolName;

  return (
    <div className="school-card">
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
            width={400}
            height={300}
          />
        ) : (
          <div className="flex items-center justify-center">
            <Image
              src="/images/no-img.png"
              alt={`Image of ${schoolName}`}
              width={200}
              height={200}
            />
          </div>
        )}
      </div>
    </div>
  );
}
