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
    <section className="featured-schools">
      <div className="featured-schools__container">
        <div className="featured-schools__header">
          <h2 className="featured-schools__title">{countryName} Schools</h2>
          <p className="featured-schools__description">{data?.details}</p>
        </div>

        <div className="featured-schools__grid">
          {isLoading ? (
            <CardSkeleton count={4} />
          ) : (
            data?.school
              ?.slice(0, 4)
              ?.map((school) => (
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
              ))
          )}
        </div>

        <div className="featured-schools__footer">
          {!isLoading && (
            <p className="featured-schools__stats">
              {data?.remainingSchools || ''} schools still remain not activated
              in {countryName}
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
  );
}
