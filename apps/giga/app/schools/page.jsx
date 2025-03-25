'use client';
import React from 'react';
import SchoolHeader from '../../components/schoolSearch/components/header/header';
import SchoolSearch from '../../components/schoolSearch/components/schoolSearch/SchoolSearch';
import { useContributionList } from '../hooks/useContributorList';
import { Loading } from '@carbon/react';

export default function SchoolPage() {
  // const { data: contributors, isLoading, error } = useContributionList();

  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // }

  // if (isLoading) {
  //   return <Loading />;
  // }

  return (
    <div>
      <SchoolHeader />
      <SchoolSearch />
    </div>
  );
}
