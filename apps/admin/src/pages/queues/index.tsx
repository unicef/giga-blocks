import React from 'react';
import { Container, Typography } from '@mui/material';
import QueueList from './queue-list';

const QueueMainView: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
        Queue Management
      </Typography>
      <QueueList />
    </Container>
  );
};

export default QueueMainView;
