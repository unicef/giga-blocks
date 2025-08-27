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
  CardContent,
} from '@mui/material';
import { useEffect, useState } from 'react';
import Scrollbar from '@components/scrollbar';
import { TableNoData, TablePaginationCustom, useTable } from '@components/table';
import {
  useGetInformationWorker,
  usePostInformationWorker,
  useSendEmail,
} from '@hooks/informationWorker/useInformationWorker';

const InformationWorker = () => {
  const [contributorTableData, setContributorTableData] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [emailModal, setEmailModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    did: '',
  });
  const [errors, setErrors] = useState<{ name?: string; email?: string; did?: string }>({});
  const IssuerUI = process.env.NEXT_PUBLIC_ISSUER_UI;
  const { page, setPage, rowsPerPage, onChangePage, onChangeRowsPerPage } = useTable();

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

  const { data } = useGetInformationWorker({
    page: Number(page) + 1,
    perPage: rowsPerPage,
  });
  const { mutate: postInformationWorker, isLoading: isSubmitting } = usePostInformationWorker();
  const { mutate: sendEmail } = useSendEmail();

  useEffect(() => {
    if (data) {
      setContributorTableData(data?.informationWorker?.rows);
    }
  }, [data]);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => {
    setOpenModal(false);
    setFormData({ name: '', email: '', did: '' });
    setErrors({});
  };

  const handleClick = () => {
    window.open(IssuerUI, '_blank', 'noopener,noreferrer');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const newErrors: { name?: string; email?: string; did?: string } = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.did.trim()) newErrors.did = 'DID is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    postInformationWorker(
      { ...formData },
      {
        onSuccess: () => {
          handleClose();
        },
        onError: (error) => {
          console.error('Failed to add Information Worker:', error);
        },
      }
    );
  };

  const openEmailModal = () => setEmailModal(true);
  const closeEmailModal = () => setEmailModal(false);

  const confirmSendEmail = () => {
    sendEmail();
    closeEmailModal();
  };

  return (
    <DashboardLayout>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ fontSize: '1.5em', fontWeight: '600' }}>Information Worker</span>
        <div style={{ display: 'flex', gap: '15px' }}>
          <Button variant="contained" style={{ background: '#638efaff' }} onClick={handleClick}>
            Issue VC
          </Button>
          <Button variant="contained" style={{ background: '#474747' }} onClick={handleOpen}>
            Add CIW
          </Button>
          <Button variant="contained" onClick={openEmailModal} disabled={data?.informationWorker?.meta?.total == 0 || data?.emailSentFalseCount == 0}>
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
                    marginleft: '4px',
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
                      data?.informationWorker?.meta?.total === 0
                    }
                  />
                )}
              </TableBody>
            </Table>
            <div style={{ justifyContent: 'right', marginTop: '20px' }}>
              <TablePaginationCustom
                count={data?.informationWorker?.meta?.total || 0}
                page={page || 0}
                rowsPerPage={rowsPerPage}
                onPageChange={onChangePage}
                onRowsPerPageChange={onChangeRowsPerPage}
                setPage={setPage}
              />
            </div>
          </Scrollbar>
        </TableContainer>
      </Card>

      {/* Add Worker Modal */}
      <Dialog open={openModal} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Add Information Worker</DialogTitle>
        <DialogContent dividers>
          <Card
            sx={{
              backgroundColor: '#e6e5f8ff',
              borderRadius: 2,
              mb: 3, //
              boxShadow: 'none',
            }}
          >
            <CardContent sx={{ py: 2 }}>
              <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                Prerequisites (Complete these first)
              </Typography>
              <ol style={{ paddingLeft: '20px', margin: 0 }}>
                <li>Visit the Privado ID issuer UI</li>
                <li>Create VC using the worker's DID and School ID</li>
                <li>Note down the VC details and worker Information</li>
              </ol>
            </CardContent>
          </Card>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            fullWidth
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            margin="dense"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            fullWidth
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            margin="dense"
            label="DID"
            name="did"
            required
            value={formData.did}
            onChange={handleChange}
            fullWidth
            error={!!errors.did}
            helperText={errors.did}
            placeholder="did:polygonid:polygon:..."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
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
