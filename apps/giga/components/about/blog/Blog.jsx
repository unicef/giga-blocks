'use client';

import Image from 'next/image';
import { Button } from '@carbon/react';
import { ArrowRight } from '@carbon/icons-react';
import Link from 'next/link';
import './_blog.scss';

export default function Blog() {
  // Blog post data
  const blogPosts = [
    {
      id: 1,
      title: 'How does art work in Giga?',
      excerpt:
        'Out of an estimated 6 million schools worldwide. No one knows the exact number, but our mapping efforts help governments locate and support them.',
      image: '/images/school-image.png',
      slug: '/blog/how-does-art-work-in-giga',
    },
    {
      id: 2,
      title: 'The technicalities of putting school data on-chain',
      excerpt:
        'Out of an estimated 6 million schools worldwide. No one knows the exact number, but our mapping efforts help governments locate and support them.',
      image: '/images/school_header.png',
      slug: '/blog/technicalities-of-school-data-on-chain',
    },
  ];

  return (
    <section className="about-blog">
      <div className="about-blog__container">
        <div className="about-blog__header">
          <h2 className="about-blog__title">
            Understand the role of art and the tech behind putting school data
            on-chain.
          </h2>
          <p className="about-blog__subtitle">
            Explore our latest thoughts and updates below
          </p>
        </div>

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
                <p className="about-blog__excerpt">{post.excerpt}</p>
                <div className="about-blog__action">
                  <Link href={post.slug} passHref>
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
