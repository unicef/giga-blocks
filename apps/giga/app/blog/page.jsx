'use client';

import { ArrowLeft } from '@carbon/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import Blog from '../../components/about/blog/Blog';

export default function BlogPost() {
  return (
    <>
      <Blog showHeader={false} className="blog-list" />
    </>
  );
}
