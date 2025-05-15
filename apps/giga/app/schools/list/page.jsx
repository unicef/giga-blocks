'use client';
import { useSearchParams } from 'next/navigation';
import SchoolSearch from '../../../components/schoolSearch/schoolSearch/SchoolSearch';

const SchoolSearchPage = () => {
  const searchParams = useSearchParams();
  const linkActivation = searchParams.get('linkActivation');

  return (
    <>
      <SchoolSearch linkActivation={linkActivation} />
    </>
  );
};
export default SchoolSearchPage;
