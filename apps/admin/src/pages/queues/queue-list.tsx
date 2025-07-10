'use client';

import React, { useState } from 'react';
import {
  Tabs,
  Tab,
  Box,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  CircularProgress,
} from '@mui/material';
import RetryButton from './retry-button';
import { useQueueFailedJobsQuery, useQueueJobsQuery } from '@hooks/queues/useQueues';

const queueTypes = [
  { label: 'Mail Queue', value: 'MAIL_QUEUE' },
  { label: 'Mint Queue', value: 'MINT_QUEUE' },
  { label: 'Image Queue', value: 'IMAGE_QUEUE' },
  { label: 'Onchain Data Queue', value: 'ONCHAIN_DATA_QUEUE' },
  { label: 'VC Queue', value: 'VC_QUEUE' },
  { label: 'Bulk Image Queue', value: 'BULK_IMAGE_QUEUE' },
];

const renderNestedData = (data: any, depth = 0): React.ReactNode => {
  if (Array.isArray(data)) {
    return (
      <ul>
        {data.map((item, index) => (
          <li key={index}>{renderNestedData(item, depth + 1)}</li>
        ))}
      </ul>
    );
  } else if (typeof data === 'object' && data !== null) {
    return (
      <ul>
        {Object.entries(data).map(([key, value]) => (
          <li key={key}>
            <strong>{key}:</strong> {renderNestedData(value, depth + 1)}
          </li>
        ))}
      </ul>
    );
  } else {
    return <span>{data}</span>;
  }
};

const QueueList: React.FC = () => {
  const [queueType, setQueueType] = useState(queueTypes[0].value);

  const { data, isFetching } = useQueueFailedJobsQuery(queueType);
  console.log({ data });

  interface Job {
    id: string;
    name: string;
    status: string;
    processedOn: number;
    finishedOn: number;
    attemptsMade: number;
    failedReason?: string;
    data: any;
  }

  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const openJobDetails = (job: any) => {
    setSelectedJob(job);
  };

  const closeJobDetails = () => {
    setSelectedJob(null);
  };

  return (
    <Box sx={{ p: 4, bgcolor: 'background.paper', boxShadow: 3, borderRadius: 2 }}>
      <Tabs
        value={queueType}
        onChange={(_, value) => setQueueType(value)}
        variant="scrollable"
        scrollButtons="auto"
      >
        {queueTypes.map((type) => (
          <Tab key={type.value} label={type.label} value={type.value} />
        ))}
      </Tabs>

      <Box mt={4}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Job ID</TableCell>
              <TableCell>Job Name</TableCell>
              <TableCell>Processed On</TableCell>
              <TableCell>Finished On</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isFetching ? (
              <TableRow>
                <TableCell colSpan={6} sx={{ p: 3 }}>
                  <Box display="flex" justifyContent="center" alignItems="center">
                    <CircularProgress />
                  </Box>
                </TableCell>
              </TableRow>
            ) : data?.length === 0 ? (
              <>
                <TableRow>
                  <TableCell colSpan={6} sx={{ p: 3, textAlign: 'center' }}>
                    No  Failed Jobs found in {queueType}
                  </TableCell>
                </TableRow>
              </>
            ) : (
              data?.map((job: any) => (
                <TableRow key={job.id} hover onClick={() => openJobDetails(job)}>
                  <TableCell>{job.id}</TableCell>
                  <TableCell>{job.name}</TableCell>
                  <TableCell>{new Date(job.processedOn).toLocaleString()}</TableCell>
                  <TableCell>{new Date(job.finishedOn).toLocaleString()}</TableCell>
                  <TableCell>{job.status}</TableCell>
                  <TableCell>
                    <RetryButton queueType={queueType} jobId={job.id} />
                    <Button variant="outlined" size="small" sx={{ ml: 1 }}>
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Box>

      {/* Job Details Dialog */}
      <Dialog open={!!selectedJob} onClose={closeJobDetails} maxWidth="sm" fullWidth>
        <DialogTitle>Job Details</DialogTitle>
        <DialogContent dividers>
          {selectedJob && (
            <>
              <Typography gutterBottom>
                <strong>Job ID:</strong> {selectedJob.id}
              </Typography>
              <Typography gutterBottom>
                <strong>Job Name:</strong> {selectedJob.name}
              </Typography>
              <Typography gutterBottom>
                <strong>Status:</strong> {selectedJob.status}
              </Typography>
              <Typography gutterBottom>
                <strong>Processed On:</strong> {new Date(selectedJob.processedOn).toLocaleString()}
              </Typography>
              <Typography gutterBottom>
                <strong>Finished On:</strong> {new Date(selectedJob.finishedOn).toLocaleString()}
              </Typography>
              <Typography gutterBottom>
                <strong>Attempts Made:</strong> {selectedJob.attemptsMade}
              </Typography>
              <Typography gutterBottom>
                <strong>Failed Reason:</strong> {selectedJob.failedReason}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Batch Details:
              </Typography>
              <Box maxHeight={300} overflow="auto">
                {renderNestedData(selectedJob.data)}
              </Box>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeJobDetails} variant="contained" color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default QueueList;
