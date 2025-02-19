'use client';
import React from 'react';
import { useContributionList } from '../hooks/useContributorList';

const SchoolPage = () => {
  const { data: contributors, isLoading, error } = useContributionList();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>SchoolPage</h1>
      <ul>
        {contributors &&
          contributors.map((contributor) => (
            <li key={contributor.id}>{contributor.name}</li>
          ))}
      </ul>
    </div>
  );
};

export default SchoolPage;
