import { ArrowRight } from '@carbon/icons-react';
import { Button } from '@carbon/react';

const CtaSection = ({ title, btnText }) => {
  return (
    <section className="cta-section">
      <div className="cta-content">
        <h2 className="cta-title">{title}</h2>
        <Button
          className="cta-button"
          renderIcon={ArrowRight}
          onClick={() => (window.location.href = '/schools/list')}
        >
          Activate a school
        </Button>
      </div>
    </section>
  );
};
export default CtaSection;
