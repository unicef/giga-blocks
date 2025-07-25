'use client';

import DashboardLayout from '@layouts/dashboard';
import {
  Table,
  TableBody,
  TableContainer,
  Card,
  Divider,
  Button,
  TableCell,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Box,
  Grid,
} from '@mui/material';
import { useEffect, useState } from 'react';
import Scrollbar from '@components/scrollbar';
import { TableNoData } from '@components/table';
// import { useInformationWorkers } from '@hooks/useInformationWorkers';

const InformationWorker = () => {
  const [contributorTableData, setContributorTableData] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [emailModal, setEmailModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    did: '',
  });

  const tips = [
    {
      number: 1,
      title: 'Create VC in Privado ID',
      description:
        "Visit the Privado ID issuer UI and create a Verifiable Credential using the worker's DID and School ID",
    },
    {
      number: 2,
      title: 'Add Worker Here',
      description:
        'Add the worker details in this dashboard and system will automatically send the VC to the worker via email',
    },
    {
      number: 3,
      title: 'Send VC Email',
      description: 'System automatically sends the Verifiable Credential to the worker via email',
    },
  ];

  //   const { data, isLoading } = useInformationWorkers();

  //   useEffect(() => {
  //     if (data) {
  //       setContributorTableData(data);
  //     }
  //   }, [data]);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => {
    setOpenModal(false);
    setFormData({ name: '', email: '', did: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log('Submitted:', formData);
    setContributorTableData((prev) => [...prev, { ...formData, emailSent: false }]);
    handleClose();
  };

  const openEmailModal = () => setEmailModal(true);
  const closeEmailModal = () => setEmailModal(false);

  const confirmSendEmail = () => {
    console.log('Sending emails to workers...');
    // TODO: call API or handle email logic
    closeEmailModal();
  };

  return (
    <DashboardLayout>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ fontSize: '1.5em', fontWeight: '600' }}>Information Worker</span>
        <div style={{ display: 'flex', gap: '15px' }}>
          <Button variant="contained" style={{ background: '#474747' }} onClick={handleOpen}>
            Add
          </Button>
          <Button variant="contained" onClick={openEmailModal}>
            Send Email
          </Button>
        </div>
      </div>
      <Card
        sx={{
          p: 3,
          // backgroundColor: '#f5f7fe',
          borderRadius: 2,
          borderLeft: '6px solid #3dc7f1ff', // Only left border colored
          borderTop: 'none',
          borderRight: 'none',
          borderBottom: 'none',
          // border: '4px solid #3dc7f1ff',
          mb: 3,
        }}
      >
        <Box display="flex" alignItems="center" mb={2}>
          <Typography variant="h5" fontWeight={700} ml={1}>
            Admin WorkFlow for Adding Information Workers
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {tips.map((tip) => (
            <Grid item xs={12} md={4} key={tip.number}>
              <Box display="flex" alignItems="flex-start">
                <Box
                  sx={{
                    width: 45,
                    height: 30,
                    backgroundColor: '#6dcff6ff',
                    borderRadius: '50%',
                    color: '#48abf2ff',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2,
                  }}
                >
                  {tip.number}
                </Box>
                <Box>
                  <Typography fontWeight={600}>{tip.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {tip.description}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Card>

      <Card>
        <Divider />
        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <Scrollbar>
            <Table sx={{ minWidth: 800 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>DID</TableCell>
                  <TableCell>Email Sent</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {contributorTableData?.length > 0 ? (
                  contributorTableData.map((row, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>{row.did}</TableCell>
                      <TableCell>{row.emailSent ? 'Yes' : 'No'}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableNoData
                    isNotFound={
                      // !isLoading &&
                      contributorTableData?.length === 0
                    }
                  />
                )}
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>
      </Card>

      {/* Add Worker Modal */}
      <Dialog open={openModal} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Add Information Worker</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="DID"
            name="did"
            value={formData.did}
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Email Confirmation Modal */}
      <Dialog open={emailModal} onClose={closeEmailModal} maxWidth="xs" fullWidth>
        <DialogTitle>Send Credentials</DialogTitle>
        <DialogContent>
          <Typography>
            Verifiable Credentials will be sent to the Information worker in their emails.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEmailModal} variant="outlined">
            Cancel
          </Button>
          <Button onClick={confirmSendEmail} variant="contained" color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
};

export default InformationWorker;
