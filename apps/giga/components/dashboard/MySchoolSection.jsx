// components/MySchoolsSection/MySchoolsSection.jsx
'use client';

import SchoolCard from '../../components/schoolCard/SchoolCard';
import CardSkeleton from '../../components/cardSkeleton/CardSkeleton';

export default function MySchoolsSection({ decodedShooldata, fetching }) {
  return (
    <section className="reserved-schools-section">
      <h2 className="section-title">My Schools</h2>
      <div className="schools-grid">
        {fetching ? (
          <CardSkeleton count={4} />
        ) : (
          <>
            {decodedShooldata?.map((school, index) => (
              <div key={index} className="school-card">
                <SchoolCard
                  key={school.gigaSchoolId}
                  id={school?.gigaSchoolId}
                  schoolName={school.schoolName}
                  imageHash={school.image}
                  location={school.region}
                  minted={'MINTED'}
                />
              </div>
            ))}
          </>
        )}
      </div>
    </section>
  );
}