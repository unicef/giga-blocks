import LandingPage from './home/page';
import SchoolCard from '../components/schoolCard/SchoolCard';
import FAQs from '../components/faqs/faqs';

export default function Page() {
  const schoolData = [
    {
      id: '1',
      schoolName: 'Greenwood High School',
      location: 'Nairobi, Kenya',
      minted: true,
      imageHash: 'QmT6Xa1B7sYxZ82hP3Aj9RMV2cZTpWy4uYfNaRW9LgYxTX',
      linkActivation: 'https://example.com/activate/greenwood',
    },
    {
      id: '2',
      schoolName: 'Sunrise Elementary',
      location: 'Lusaka, Zambia',
      minted: false,
      imageHash: 'QmY9vK3RMmBQm6EJK8cEiAhM25X7oSAVf1DhQQTjZ8rH6A',
      linkActivation: 'https://example.com/activate/sunrise',
    },
    {
      id: '3',
      schoolName: 'Hope Valley Secondary',
      location: 'Kampala, Uganda',
      minted: true,
      imageHash: 'QmZkT5dP6MfQQxFS1Rt6W38K8zG67pzL9Lf5R1FWURR1Cg',
      linkActivation: 'https://example.com/activate/hopevalley',
    },
    {
      id: '4',
      schoolName: 'Ocean Breeze Academy',
      location: 'Accra, Ghana',
      minted: false,
      imageHash: 'QmXT2FxSsnWxzkb9PbAwkqcdMLL7uFwYPwccpRAqG1p7eY',
      linkActivation: 'https://example.com/activate/oceanbreeze',
    },
  ];
  return (
    <>
      <LandingPage />
      <FAQs />
      {schoolData.map((school) => (
        <SchoolCard
          key={school.id}
          schoolName={school.schoolName}
          location={school.location}
          minted={school.minted}
          imageHash={school.imageHash}
          linkActivation={school.linkActivation}
        />
      ))}
    </>
  );
}
