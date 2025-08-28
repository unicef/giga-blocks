'use client';

import { ArrowLeft } from '@carbon/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import './_artistDetails.scss';

export default function BlogPost() {
  return (
    <div className="blog-post">
      <div className="blog-post__container">
        <div className="blog-post__back">
          <Link href="/about" className="blog-post__back-link">
            <ArrowLeft size={16} />
            <span>Back</span>
          </Link>
        </div>

        <article className="blog-post__content">
          <header className="blog-post__header">
            <h1 className="blog-post__title">Meet the artist</h1>
            <div className="blog-post__author-info">
              <span className="blog-post__author-name">
                The creator of the dynamic images that accompany the school
                NFTs.
              </span>
            </div>
          </header>

          <div className="blog-post__featured-image">
            <Image
              src="/images/meet-artist-bg.svg"
              alt="Artistic collage showing abstract patterns and purple flowers"
              width={800}
              height={400}
              className="blog-post__image"
            />
            <div className="blog-post__featured-author">
              <Image
                src="/images/sternberg-cole.jpg"
                alt="Cole Sternberg"
                width={430}
                height={420}
                className="blog-post__featured-artist-image"
                style={{ borderRadius: '8px' }}
              />
            </div>
          </div>

          <div className="blog-post__body">
            {/* <p className="blog-post__intro">
              In an age where technology moves faster than thought and ideas
              spark at the speed of code, Giga stands as a unique fusion of art
              + science at modern innovation. But how does art actually work in
              Giga? What role does it play in a world driven by algorithms,
              data, and digital infrastructure?
            </p>

            <p className="blog-post__intro">
              The answer is both simple and transformative: art is not
              decoration at Giga — it is strategy, emotion, and identity.
            </p> */}

            <section className="blog-post__section">
              <h2 className="blog-post__section-title">
                <span className="blog-post__section-number">
                  Cole Sternberg
                </span>
              </h2>
              <div className="blog-post__author-info">
                <span className="blog-post__author-name">Artist</span>
              </div>
              <p style={{ marginBottom: '1rem' }}>
                Cole Sternberg is a conceptual artist who lives and works in Los
                Angeles.
              </p>
              <p style={{ marginBottom: '1rem' }}>
                His practice contemplates humanity’s existential quandary: that
                of being hopelessly destructive, yet forever and inevitably
                linked with nature. Through varied media (including painting,
                sculpture, installation, performance, photography, film and
                writing), Sternberg positions the aspirations of humankind
                against the dominant and regenerative forces of the environment
                and the arbitration of time. For the artist, the conclusion is
                unavoidable. Human enterprises -- art, language, history, law,
                and republic -- are ephemeral / illusory endeavors that attempt
                to reflect, parallel, and challenge the ascendency of nature to
                no avail.
              </p>
              <p>
                In recent years, Sternberg’s practice has centered on the
                environment acting as the true artist. Some pieces have
                incorporated poetry, suggesting imprecise narratives or
                descriptions that can’t be fully apprehended through words. His
                photographs interrupt time, while historical and cultural myths
                are pursued and deconstructed in sculptural installations and
                film. These confrontations frequently materialize in instances
                of erasure; erasure of marks and words, erasure of history, or
                the erasure of the natural environment. Sternberg’s works remain
                subversive in their unremitting search for truth, noting
                humanity’s attempts to create beautiful permanence while failing
                admirably. Sternberg’s first digital generative works ‘spring
                begins with the first rainstorm’ and ‘chaos comes with the
                summer haze’ were released in 2022 and 2023 with Art Blocks.
              </p>
            </section>

            <div class="parent">
              <div class="div2">
                <Image
                  src="/images/blog-left.png"
                  alt="Artistic collage showing abstract patterns and purple flowers"
                  width={400}
                  height={400}
                  className="blog-post__image"
                />
              </div>
              <div class="div6">
                <Image
                  src="/images/blog-left.png"
                  alt="Artistic collage showing abstract patterns and purple flowers"
                  width={400}
                  height={400}
                  className="blog-post__image"
                />
              </div>
              <div class="div7">
                <Image
                  src="/images/blog-left.png"
                  alt="Artistic collage showing abstract patterns and purple flowers"
                  width={400}
                  height={400}
                  className="blog-post__image"
                />
              </div>
            </div>

            {/* <div className="blog-post__image-grid">
              <div className="blog-post__grid-image">
                <Image
                  src="/images/blog-left.png"
                  alt="Artistic collage showing abstract patterns and purple flowers"
                  width={400}
                  height={400}
                  className="blog-post__image"
                />
              </div>
              <div className="blog-post__grid-image">
                <Image
                  src="/images/blog-right.png"
                  alt="Artistic collage showing abstract patterns and purple flowers"
                  width={400}
                  height={400}
                  className="blog-post__image"
                />
              </div>
            </div> */}
            <p style={{ marginBottom: '1rem' }}>
              His practice contemplates humanity’s existential quandary: that of
              being hopelessly destructive, yet forever and inevitably linked
              with nature. Through varied media (including painting, sculpture,
              installation, performance, photography, film and writing),
              Sternberg positions the aspirations of humankind against the
              dominant and regenerative forces of the environment and the
              arbitration of time. For the artist, the conclusion is
              unavoidable. Human enterprises -- art, language, history, law, and
              republic -- are ephemeral / illusory endeavors that attempt to
              reflect, parallel, and challenge the ascendency of nature to no
              avail.
            </p>
            <p style={{ marginBottom: '1rem' }}>
              His practice contemplates humanity’s existential quandary: that of
              being hopelessly destructive, yet forever and inevitably linked
              with nature. Through varied media (including painting, sculpture,
              installation, performance, photography, film and writing),
              Sternberg positions the aspirations of humankind against the
              dominant and regenerative forces of the environment and the
              arbitration of time. For the artist, the conclusion is
              unavoidable. Human enterprises -- art, language, history, law, and
              republic -- are ephemeral / illusory endeavors that attempt to
              reflect, parallel, and challenge the ascendency of nature to no
              avail.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
