'use client';

import Image from 'next/image';
import { Button } from '@carbon/react';
import { ArrowRight } from '@carbon/icons-react';
import Link from 'next/link';
import './_blog.scss';

export default function Blog({ showHeader = true, className = '' }) {
  // Blog post data
  const blogPosts = [
    {
      id: 1,
      title: 'The Art of Visibility. “Giga: a garden” by Cole Sternberg',
      excerpt: `<strong>Out of an estimated 6 million schools worldwide.</strong> No one knows the exact number, but our mapping efforts help governments locate and support them.`,
      image: '/images/school-image.png',
      slug: 'the-art-of-visibility-giga-a-garden-by-cole-sternberg',
    },
    {
      id: 2,
      title: 'Giga Blocks: Technical Architecture Deep Dive ',
      excerpt: `<strong>Out of an estimated 6 million schools worldwide.</strong> No one knows the exact number, but our mapping efforts help governments locate and support them.`,
      image: '/images/school_header.png',
      slug: 'giga-blocks-technical-architecture-deep-dive',
    },
  ];

  return (
    <section className={`about-blog ${className}`}>
      <div className="about-blog__container">
        {showHeader && (
          <div className="about-blog__header">
            <h2 className="about-blog__title">
              Understand the role of art and the tech behind putting school data
              on-chain.
            </h2>
            <p className="about-blog__subtitle">
              Explore our latest thoughts and updates from our blogs.
            </p>
          </div>
        )}

        <div className="about-blog__posts">
          {blogPosts.map((post) => (
            <div key={post.id} className="about-blog__card">
              <div className="about-blog__image-container">
                <Image
                  src={post.image || '/placeholder.svg'}
                  alt={post.title}
                  width={400}
                  height={300}
                  className="about-blog__image"
                />
              </div>
              <div className="about-blog__content">
                <h3 className="about-blog__post-title">{post.title}</h3>
                <p
                  className="about-blog__excerpt"
                  dangerouslySetInnerHTML={{ __html: post.excerpt }}
                />
                <div className="about-blog__action">
                  <Link href={`/blog/${post.slug}`} passHref>
                    <Button
                      kind="ghost"
                      className="about-blog__button"
                      renderIcon={ArrowRight}
                    >
                      Read More
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
