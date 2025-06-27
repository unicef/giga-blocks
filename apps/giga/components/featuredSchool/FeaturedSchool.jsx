'use client';

import { Button } from '@carbon/react';
import { ArrowRight } from '@carbon/icons-react';
import Link from 'next/link';
import './_featuredSchool.scss';
import { useFeaturedSchool } from '../../app/hooks/useSchool';
import SchoolCard from '../schoolCard/SchoolCard';
import CardSkeleton from '../../components/cardSkeleton/CardSkeleton';
import country from '../../app/data/country.json';
import { useRouter } from 'next/navigation';
import FeaturedEmptySchool from './FeaturedEmptySchool';

export default function FeaturedSchools() {
  const router = useRouter();
  const { data, isLoading } = useFeaturedSchool();

  const handleClick = () => {
    router.push(`/schools/list?minted=NOTMINTED&country=${data?.country_code}`);

    setTimeout(() => {
      const element = document.getElementById('search');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };

  const countryName =
    country.find((c) => c.code === data?.country_code)?.country ||
    'Unknown Country';

  return (
    <>
      {data?.message ? (
        <FeaturedEmptySchool />
      ) : (
        <section className="featured-schools">
          <div className="featured-schools__container">
            <div className="featured-schools__header">
              <h2 className="featured-schools__title">{countryName} Schools</h2>
              <p className="featured-schools__description">{data?.details}</p>
            </div>

            {isLoading ? (
              <div className="featured-schools__grid">
                <CardSkeleton count={4} />
              </div>
            ) : data?.school && data.school.length > 0 ? (
              <div className="featured-schools__grid">
                {data.school.slice(0, 4).map((school) => (
                  <SchoolCard
                    key={school.id}
                    id={school.id}
                    schoolName={school.name}
                    location={school.region_name}
                    minted={'MINTED'}
                    hasImage={school.hasImage}
                    imageHash={school.imageHash}
                    fontColor={school?.theme?.colorScheme?.fontColor}
                    bgColor={school?.theme?.colorScheme?.bgColor}
                  />
                ))}
              </div>
            ) : (
              <div className="featured-schools__no-data">
                <p style={{ fontSize: '1.5rem', fontWeight: '400' }}>
                  There aren't any schools activated from this region yet.
                </p>
                <p style={{ fontSize: '1.5rem', fontWeight: '400' }}>
                  {' '}
                  Be the initiator, Activate a school.
                </p>
              </div>
            )}

            <div className="featured-schools__footer">
              {!isLoading && (
                <p className="featured-schools__stats">
                  {(data?.remainingSchools)?.toLocaleString() || ''} schools still remain not
                  activated in {countryName}
                </p>
              )}
              <Button
                onClick={handleClick}
                className="featured-schools__cta-button"
                renderIcon={ArrowRight}
              >
                Activate a school
              </Button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
