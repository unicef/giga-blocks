import React from 'react';
import QueueList from './queue-list';
import DashboardLayout from '@layouts/dashboard';

const QueueMainView: React.FC = () => {
  return (
    <DashboardLayout>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ fontSize: '1.5em', fontWeight: '600' }}>Queue Management</span>
        <div style={{ display: 'flex', gap: '15px' }}>
          
        </div>
      </div>
      <QueueList />
    </DashboardLayout>
  );
};

export default QueueMainView;
