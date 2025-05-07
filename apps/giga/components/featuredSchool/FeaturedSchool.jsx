'use client';

import { Button } from '@carbon/react';
import { ArrowRight } from '@carbon/icons-react';
import Link from 'next/link';
import './_featuredSchool.scss';
import { useFeaturedSchool } from '../../app/hooks/useSchool';
import SchoolCard from '../schoolCard/SchoolCard';
import CardSkeleton from '../../components/cardSkeleton/CardSkeleton';

export default function FeaturedSchools() {
  const { data, isLoading, error } = useFeaturedSchool();
  return (
    <section className="featured-schools">
      <div className="featured-schools__container">
        <div className="featured-schools__header">
          <h2 className="featured-schools__title">Nepal Schools</h2>
          <p className="featured-schools__description">
            We have recently signed an agreement with the Ministry of
            Communication to connect 50 schools in the whatever region. Many
            schools in the country remain unconnected though. And many more do
            not exist on-chain. You can help today by immortalising a school by
            activating it and putting it on-chain.
          </p>
        </div>

        <div className="featured-schools__grid">
          {isLoading ? (
            <CardSkeleton count={3} />
          ) : (
            data
              ?.slice(0, 3)
              ?.map((school) => (
                <SchoolCard
                  key={school.id}
                  id={school.id}
                  schoolName={school.name}
                  location={school.region_name}
                  minted={school.minted}
                  hasImage={school.hasImage}
                  imageHash={school.imageHash}
                  fontColor={school?.theme?.colorScheme?.fontColor}
                  bgColor={school?.theme?.colorScheme?.bgColor}
                />
              ))
          )}
        </div>

        <div className="featured-schools__footer">
          <p className="featured-schools__stats">
            369 schools still remain not activated in Nepal
          </p>
          <Link href="/schools/activate">
            <Button
              className="featured-schools__cta-button"
              renderIcon={ArrowRight}
            >
              Activate a school
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
