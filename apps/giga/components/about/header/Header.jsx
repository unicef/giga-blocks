'use client';

import Image from 'next/image';
import './_header.scss';

export default function Header() {
  return (
    <div className="about-content">
      <div className="about-text">
        <h1 className="about-title">About Giga Blocks</h1>

        <p className="about-paragraph">
          Do you know how many schools there are in the world? Neither do we.
          Our best guess is around 6 million, but no one can say for sure. Of
          the 2 million schools that have been located, roughly 50% still lack
          internet access—meaning their students miss out on vital information,
          opportunity, and choice. When a school has no official record on a
          global ledger, it risks going unseen by those who could help improve
          its connectivity.
        </p>

        <p className="about-paragraph">
          Giga Blocks addresses this by "activating" schools—placing their core
          data on a permissionless blockchain that will outlast this website
          (and possibly all of us!). Once a school is on-chain, its existence is
          permanently recognized, allowing communities, partners, and global
          stakeholders to collaborate on real solutions. Because if you can't be
          found, you can't be funded.
        </p>
      </div>

      <div className="about-image">
        <Image
          src="/images/about-header.png"
          alt="Illustration of a person interacting with digital content"
          width={500}
          height={400}
          className="illustration"
          priority
        />
      </div>
    </div>
  );
}
