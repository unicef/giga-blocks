import React from 'react';
import { Container, Typography } from '@mui/material';
import QueueList from './queue-list';
import DashboardLayout from '@layouts/dashboard';

const QueueMainView: React.FC = () => {
  return (
    <DashboardLayout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
          Queue Management
        </Typography>
        <QueueList />
      </Container>
    </DashboardLayout>
  );
};

export default QueueMainView;
