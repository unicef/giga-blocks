'use client';

import Image from 'next/image';
import './_artist.scss';
import Link from 'next/link';
import { Button } from '@carbon/react';
import { ArrowRight } from '@carbon/icons-react';

export default function Artist() {
  return (
    <section className="artist-section">
      <div className="artist-container">
        <div className="artist-content">
          <div className="artist-header">
            <h2 className="artist-title">Meet the artist</h2>
            <p className="artist-subtitle">
              The creator of the dynamic images that accompany the school NFTs.
            </p>
          </div>

          <div className="artist-profile">
            <div className="artist-image-container">
              <Image
                src="/images/artist.svg"
                alt="Cole Sternberg"
                width={350}
                height={350}
                className="artist-image"
              />
            </div>

            <div className="artist-info">
              <h3 className="artist-name">Cole Sternberg</h3>
              <p className="artist-role">Artist</p>
              <p className="artist-bio" style={{ fontSize: '1.1rem' }}>
                Cole Sternberg is a Los Angeles-based conceptual artist whose
                multidisciplinary practice spans painting, sculpture,
                installation, performance, photography, film, and writing. His
                work examines the tension between humanity's destructive
                tendencies and its intrinsic connection to nature, often
                allowing environmental forces to shape the creation process. His
                artworks are included in collections at institutions such as the
                Los Angeles County Museum of Art, Pérez Art Museum Miami, El
                Segundo Museum of Art and the American University Museum.
              </p>
              <Link href="/artist/1" passHref>
                <Button
                  kind="ghost"
                  className="artist-about__button"
                  renderIcon={ArrowRight}
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* <div className="artist-illustration">
          <Image
            src="/images/artist-illustration.png"
            alt="Artist illustration"
            width={300}
            height={400}
            className="illustration-image"
          />
        </div> */}
      </div>
    </section>
  );
}
