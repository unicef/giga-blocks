'use client';

import { useRouter } from 'next/navigation';
import { ArrowRight } from '@carbon/icons-react';
import { Button } from '@carbon/react';

const CtaSection = ({ title }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/schools?page=1&perPage=10&minted=NOTMINTED');

    setTimeout(() => {
      const element = document.getElementById('search');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };

  return (
    <section className="cta-section">
      <div className="cta-content">
        <h2 className="cta-title">{title}</h2>
        <Button
          className="cta-button"
          renderIcon={ArrowRight}
          onClick={handleClick}
        >
          Activate a school
        </Button>
      </div>
    </section>
  );
};

export default CtaSection;
