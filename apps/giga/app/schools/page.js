'use client';
import React from 'react';
import { useContributionList } from '../hooks/useContributorList';
const SchoolPage = () => {
  const { data: contributors, isLoading } = useContributionList();
  console.log('contributors', contributors);
  return <div>SchoolPage</div>;
};

export default SchoolPage;
