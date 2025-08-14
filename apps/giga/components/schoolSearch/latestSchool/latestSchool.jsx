'use client';
import './_latestSchool.scss';
import SchoolCard from '../../schoolCard/SchoolCard';
import { useLatestActivatedSchool } from '../../../app/hooks/useSchool';
import CardSkeleton from '../../cardSkeleton/CardSkeleton';
import countryList from '../../../app/data/country.json';
export default function LatestSchool() {
  const { data: schoolData, isLoading } = useLatestActivatedSchool();
  return (
    <section className="latest-schools">
      <div className="latest-schools__container">
        <div className="latest-schools__header">
          <h2 className="latest-schools__title">Latest Minted School</h2>
          <p className="latest-schools__description">
            Go ahead, find a school and mint it's NFT. It's never been easier to
            make a lasting impact{' '}
          </p>
        </div>
        {isLoading ? (
          <div className="latest-schools__grid">
            <CardSkeleton count={5} />
          </div>
        ) : schoolData?.length > 0 ? (
          <div className="latest-schools__grid">
            {schoolData?.slice(0, 5).map((school) => (
              <SchoolCard
                key={school.id}
                id={school.id}
                schoolName={school.name}
                location={
                  countryList.find((c) => c.code === school.country)?.country ||
                  school.country
                }
                minted={'MINTED'}
                hashImage={true}
                imageHash={school.imageHash}
                fontColor={'#161616'}
                bgColor={school.theme.colorScheme.cardColor}
              />
            ))}
          </div>
        ) : (
          <div className="featured-schools__no-data">
            <p style={{ fontSize: '1.5rem', fontWeight: '400' }}>
              There aren't any schools activated.
            </p>
            <p style={{ fontSize: '1.5rem', fontWeight: '400' }}>
              {' '}
              Be the initiator, Activate a school.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
