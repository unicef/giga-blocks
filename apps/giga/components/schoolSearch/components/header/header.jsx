'use client';

import Image from 'next/image';
import './_header.scss';

export default function SchoolHeader() {
  return (
    <section className="school-list">
      <div className="school-list__content">
        <h2 className="school-list__title">Ready to make a difference?</h2>
        <h3 className="school-list__subtitle">
          Let's find a school to activate
        </h3>
        <p className="school-list__description">
          If you have a specific school in mind, use the search bar to find it
          instantly. Not sure where to begin? Narrow your search by selecting a
          country and an education level. Track how many schools have already
          been activated and how close we are to bridging the digital divide.
          Once you find a school, activating it is just a few clicks away!
        </p>
      </div>
      <div className="school-list__image-container">
        <Image
          src="/images/school_header.png"
          alt="Child thinking with hand on face"
          width={600}
          height={600}
          priority
        />
      </div>
    </section>
  );
}
