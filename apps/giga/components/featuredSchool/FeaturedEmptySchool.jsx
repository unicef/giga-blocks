import Image from 'next/image';
import React from 'react';
import './_featuredSchool.scss';

const FeaturedEmptySchool = () => {
  return (
    <section className="empty-featured-schools">
      <div className="empty-featured-schools__container">
        <div className="empty-featured-schools__content">
          <Image
            src="/images/featured-empty-school.png"
            alt="No Schools Found"
            width={220}
            height={220}
            className="empty-featured-schools__image"
          />
          <p className="empty-featured-schools__description">
            We're working on displaying activated schools in your country. Stay
            tuned — this feature will be live shortly!
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEmptySchool;
