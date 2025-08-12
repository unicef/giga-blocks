'use client';

import { ArrowLeft } from '@carbon/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import { getBlogPostBySlug } from '../../libs/blogData';
import './_blogDetails.scss';
import Custom404 from '../../not-found';

export default function BlogPostPage({ params }) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    return (
      <>
        <Custom404 />
      </>
    );
  }

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
            <h1 className="blog-post__title">{post.title}</h1>
            <div className="blog-post__author">
              <Image
                src={post.authorImage}
                alt={post.author}
                width={40}
                height={40}
                className="blog-post__author-image"
              />
              <div className="blog-post__author-info">
                <span className="blog-post__author-name">{post.author}</span>
                <span className="blog-post__date">{post.date}</span>
              </div>
            </div>
          </header>
          <div className="blog-post__featured-image">
            <Image
              src={post.featuredImage}
              alt={post.title}
              width={800}
              height={400}
              className="blog-post__image"
            />
          </div>
          <div className="blog-post__body">
            {/* {post.content.map((section, idx) => {
              if (section.type === 'intro') {
                return (
                  <p key={idx} className="blog-post__intro">
                    {section.text}
                  </p>
                );
              }
              if (section.type === 'link') {
                return (
                  <p key={idx} className="blog-post__intro">
                    <a href="/artist/1">{section.text}</a>
                  </p>
                );
              }
              if (section.type === 'section') {
                return (
                  <section key={idx} className="blog-post__section">
                    <h2 className="blog-post__section-title">
                      <span className="blog-post__section-number"></span>
                      {section.title}
                    </h2>
                    <p>{section.text}</p>
                  </section>
                );
              }
              if (section.type === 'caption') {
                return (
                  <p key={idx} className="blog-post__caption">
                    {section.text}
                  </p>
                );
              }
              if (section.type === 'conclusion') {
                return (
                  <div key={idx} className="blog-post__conclusion">
                    <p>{section.text}</p>
                  </div>
                );
              }
              return null;
            })}
            {post.images && (
              <div className="blog-post__image-grid">
                {post.images.map((img, idx) => (
                  <div key={idx} className="blog-post__grid-image">
                    <Image
                      src={img}
                      alt={post.title}
                      width={400}
                      height={400}
                      className="blog-post__image"
                    />
                  </div>
                ))}
              </div>
            )} */}
            <div
              dangerouslySetInnerHTML={{ __html: post.content }}
              style={{ marginTop: '20px' }}
            />
          </div>
        </article>
      </div>
    </div>
  );
}
