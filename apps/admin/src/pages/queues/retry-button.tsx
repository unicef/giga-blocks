import React from 'react';
import { Button } from '@mui/material';
import { useRetryJobMutation } from '@hooks/queues/useQueues';

type RetryButtonProps = {
  queueType: string;
  jobId: number | string;
};

const RetryButton: React.FC<RetryButtonProps> = ({ queueType, jobId }) => {
  const retryMutation = useRetryJobMutation(queueType);

  return (
    <Button
      variant="outlined"
      color="error"
      onClick={() => retryMutation.mutate(jobId)}
      disabled={retryMutation.isPending}
    >
      {false ? 'Retrying...' : 'Retry'}
    </Button>
  );
};

export default RetryButton;
