'use client';

import Image from 'next/image';
import './_artist.scss';

export default function Artist() {
  return (
    <section className="artist-section">
      <div className="artist-container">
        <div className="artist-content">
          <div className="artist-header">
            <h2 className="artist-title">Meet the artist</h2>
            <p className="artist-subtitle">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
              turpis molestie
            </p>
          </div>

          <div className="artist-profile">
            <div className="artist-image-container">
              <Image
                src="/images/teams/team-7.png"
                alt="Cole Sternberg"
                width={200}
                height={200}
                className="artist-image"
              />
            </div>

            <div className="artist-info">
              <h3 className="artist-name">Cole Sternberg</h3>
              <p className="artist-role">Artist</p>
              <p className="artist-bio">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis.
                Class aptent taciti sociosqu ad litora torquent per conubia
                nostra, per inceptos himenaeos.
              </p>
            </div>
          </div>
        </div>

        <div className="artist-illustration">
          <Image
            src="/images/artist-illustration.png"
            alt="Artist illustration"
            width={300}
            height={400}
            className="illustration-image"
          />
        </div>
      </div>
    </section>
  );
}
