'use client';

import { ArrowLeft } from '@carbon/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import './_blogDetails.scss';

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
            <h1 className="blog-post__title">How does art work in Giga?</h1>
            <div className="blog-post__author">
              <Image
                src="/images/teams/team-8.png"
                alt="Katherina Lanecherie"
                width={40}
                height={40}
                className="blog-post__author-image"
              />
              <div className="blog-post__author-info">
                <span className="blog-post__author-name">
                  Katherina Lanecherie
                </span>
                <span className="blog-post__date">March 22, 2023</span>
              </div>
            </div>
          </header>

          <div className="blog-post__featured-image">
            <Image
              src="/images/blog-header.png"
              alt="Artistic collage showing abstract patterns and purple flowers"
              width={800}
              height={400}
              className="blog-post__image"
            />
          </div>

          <div className="blog-post__body">
            <p className="blog-post__intro">
              In an age where technology moves faster than thought and ideas
              spark at the speed of code, Giga stands as a unique fusion of art
              + science at modern innovation. But how does art actually work in
              Giga? What role does it play in a world driven by algorithms,
              data, and digital infrastructure?
            </p>

            <p className="blog-post__intro">
              The answer is both simple and transformative: art is not
              decoration at Giga — it is strategy, emotion, and identity.
            </p>

            <section className="blog-post__section">
              <h2 className="blog-post__section-title">
                <span className="blog-post__section-number">1.</span> Art as a
                Thinking Tool
              </h2>
              <p>
                At Giga, art is part of the ideation process, not an
                afterthought. Whether designing interfaces, crafting brand
                identities, or creating immersive experiences, Giga treats
                visual language as a method of problem-solving. Designers and
                artists collaborate closely with engineers and product teams
                from the very beginning. Moodboards are as common as wireframes.
                Sketches are treated with as much reverence as prototypes. This
                results in products that don't just function well, but feel
                right.
              </p>
            </section>

            <section className="blog-post__section">
              <h2 className="blog-post__section-title">
                <span className="blog-post__section-number">2.</span> Emotional
                Intelligence Through Design
              </h2>
              <p>
                In digital spaces where attention is fleeting, emotional
                resonance is everything. Giga uses art to tell stories, trigger
                feelings, and invite human connections. Through carefully chosen
                color palettes, spatial harmony, motion design, and typography,
                art becomes the emotional interface between the user and the
                product. It's the reason a Giga-designed app doesn't just
                work—it invites you in.
              </p>
            </section>

            <div className="blog-post__image-grid">
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
            </div>

            <p className="blog-post__caption">
              Designers and artists collaborate closely with engineers and
              product teams from the very beginning.
            </p>

            <section className="blog-post__section">
              <h2 className="blog-post__section-title">
                <span className="blog-post__section-number">3.</span> Bridging
                Cultures, Ideas, and Mediums
              </h2>
              <p>
                Art at Giga isn't confined to canvas or screen—it lives across
                cultures and mediums. From generative digital art installations
                to collaborations with craftspeople, Giga team often fuses
                traditional artistic practices with emerging tech like AR, 3D
                environments, and AI-driven design systems. The result is an
                ever-evolving dialogue between art, culture, and code.
              </p>
            </section>

            <section className="blog-post__section">
              <h2 className="blog-post__section-title">
                <span className="blog-post__section-number">4.</span> The Artist
                is Part of the Team
              </h2>
              <p>
                One of the defining features of Giga is how it integrates
                artists not as vendors, but as co-creators. Painters,
                illustrators, animators, sound designers, and conceptual artists
                regularly join product cycles. Their work helps ground ambitious
                ideas in a sensory world, giving abstract visions form and life.
              </p>
            </section>

            <section className="blog-post__section">
              <h2 className="blog-post__section-title">
                <span className="blog-post__section-number">5.</span> Art as
                Brand Philosophy
              </h2>
              <p>
                Perhaps most importantly, art is Giga's voice. It reflects the
                studio's belief that design isn't just what something looks
                like—it's how it makes you feel. Art is embedded in Giga's brand
                DNA: bold, curious, humane, and futuristic. In this sense, art
                isn't a tool for Giga; it's a philosophy.
              </p>
            </section>

            <div className="blog-post__conclusion">
              <p>
                In the world of Giga, art isn't just alive—it's essential. It
                inspires innovation, shapes experience, and reminds us that no
                matter how advanced our tools become, creativity remains the
                soul of meaningful design.
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
