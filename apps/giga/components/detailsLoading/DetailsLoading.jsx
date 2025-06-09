'use client';

import './_detailsLoading.scss';

export default function DetailsLoading() {
  return (
    <>
      <div className="theme-selector-skeleton"></div>
      <div className="school-details-skeleton">
        {/* Theme selector banner skeleton */}

        {/* School details skeleton */}
        <div className="school-info-skeleton">
          <div className="school-info-skeleton__left">
            <div className="school-info-skeleton__header">
              <div className="school-info-skeleton__title pulse"></div>
              <div className="school-info-skeleton__status pulse"></div>
            </div>

            <div className="school-info-skeleton__location">
              <div className="school-info-skeleton__location-icon pulse"></div>
              <div className="school-info-skeleton__location-text pulse"></div>
              <div className="school-info-skeleton__map-link pulse"></div>
            </div>

            <div className="school-info-skeleton__cards">
              <div className="school-info-skeleton__card">
                <div className="school-info-skeleton__card-header pulse"></div>
                <div className="school-info-skeleton__card-content">
                  <div className="school-info-skeleton__card-value pulse"></div>
                </div>
              </div>

              <div className="school-info-skeleton__card">
                <div className="school-info-skeleton__card-header pulse"></div>
                <div className="school-info-skeleton__card-content">
                  <div className="school-info-skeleton__card-value pulse"></div>
                  <div className="school-info-skeleton__card-label pulse"></div>
                  <div className="school-info-skeleton__card-label pulse"></div>
                  <div className="school-info-skeleton__card-label pulse"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="school-info-skeleton__right">
            <div className="school-info-skeleton__image pulse"></div>
          </div>
        </div>
      </div>
    </>
  );
}
