'use client';

import './_cardSkeleton.scss';

export default function CardSkeleton({ count = 1 }) {
  return (
    <>
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <div key={index} className="school-card-skeleton">
            <div className="school-card-skeleton__image-container">
              <div className="school-card-skeleton__image pulse"></div>
            </div>
            <div className="school-card-skeleton__content">
              <div className="school-card-skeleton__title pulse"></div>
              <div className="school-card-skeleton__location pulse"></div>
            </div>
          </div>
        ))}
    </>
  );
}
