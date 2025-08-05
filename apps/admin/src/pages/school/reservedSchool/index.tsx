import React from 'react';
import SchoolList from './school-list';
import DashboardLayout from '@layouts/dashboard';

const QueueMainView: React.FC = () => {
  return (
    <DashboardLayout>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ fontSize: '1.5em', fontWeight: '600' }}>School  Reserved</span>
        <div style={{ display: 'flex', gap: '15px' }}>
          
        </div>
      </div>
      <SchoolList />
    </DashboardLayout>
  );
};

export default QueueMainView;
