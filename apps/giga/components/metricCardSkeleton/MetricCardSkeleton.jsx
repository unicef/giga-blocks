'use client';

import './_metricCardSkeleton.scss';

export default function MetricsCardSkeleton({ count = 1 }) {
  return (
    <>
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <div key={index} className="metric-card-skeleton">
            <div className="metric-card-skeleton__icon-container">
              <div className="metric-card-skeleton__icon pulse"></div>
            </div>

            <div className="metric-card-skeleton__value-container">
              <div className="metric-card-skeleton__value pulse"></div>
              <div className="metric-card-skeleton__subtitle pulse"></div>
            </div>

            <div className="metric-card-skeleton__description pulse"></div>
          </div>
        ))}
    </>
  );
}
