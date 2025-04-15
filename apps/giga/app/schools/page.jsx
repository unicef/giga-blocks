'use client';
import SchoolHeader from '../../components/schoolSearch/header/header';
import SchoolSearch from '../../components/schoolSearch/schoolSearch/SchoolSearch';
import { useSearchParams } from 'next/navigation';
import { useGetActiveSchool } from '../../app/hooks/useActivation';

export default function SchoolPage() {
  const searchParams = useSearchParams();
  const linkActivation = searchParams.get('linkActivation');
  const { data } = useGetActiveSchool(linkActivation);
  console.log('data', data);
  return (
    <div>
      <SchoolHeader />
      <SchoolSearch />
    </div>
  );
}
