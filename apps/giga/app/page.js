import LandingPage from './home/page';
import FAQs from '../components/faqs/faqs';
import BlockMetrics from '../components/blockMetrics/blockMetrics';
import FeaturedSchool from '../components/featuredSchool/FeaturedSchool';

export default function Page() {
  return (
    <>
      <LandingPage />
      <BlockMetrics />
      <FeaturedSchool />
      <FAQs />
    </>
  );
}
