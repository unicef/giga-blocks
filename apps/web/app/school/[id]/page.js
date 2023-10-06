'use client';

import SchoolDetail from './detail';
import GraphQlProvider from '../../libs/graphql-query-client';
import { useParams } from 'next/navigation'

const SchoolDetailPage = () => {
  const params = useParams()
  return (
    <GraphQlProvider>
    {params.id &&  <SchoolDetail id = {params.id}/>}
    </GraphQlProvider>
  );
};
export default SchoolDetailPage;
