'use client';
import { FavoriteFilled } from '@carbon/icons-react';
import './_contributors.scss';
import { Button } from '@carbon/react';
import CtaSection from '../../CtaSection';
import { useContributeList } from '../../../app/hooks/useContributor';

export default function Contributors({ contributorList }) {
  // This would typically come from an API or database

  return (
    <>
      <section className="contributors-section">
        <div className="contributors-container">
          <div className="heart-icon">
            <FavoriteFilled size={32} className="heart" />
          </div>

          <h2 className="contributors-title">
            A heartfelt thanks to the early supporters who hold Giga Blocks NFTs
            and power our movement. Below are just a few wallet addresses
            belonging to incredible individuals who believe in universal
            connectivity
          </h2>

          <p className="contributors-description">
            Your commitment ensures schools are no longer invisible and students
            everywhere have the chance to thrive in the digital age. Ready to
            get involved? By supporting Giga Blocks, you join a global effort to
            bring every school onto the blockchain, and every student into the
            online world.
          </p>

          <div className="contributors-grid">
            {contributorList &&
              contributorList?.map((contributor, index) => (
                <span key={index} className="contributor-name">
                  {contributor?.name} ,
                </span>
              ))}
          </div>

          <p className="contributors-more">and many more.</p>
        </div>
      </section>
      <section className="cta-section">
        <CtaSection
          title={`Be a part of a bigger initiative. Activate a school today.`}
        />
      </section>
    </>
  );
}
