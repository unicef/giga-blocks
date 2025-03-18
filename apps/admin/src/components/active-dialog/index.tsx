import { useActivatePostSchools } from '@hooks/school/useSchool';
import { TextField, FormControlLabel, Switch, Snackbar } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import * as React from 'react';

export default function ActiveDialog() {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const [startDate, setStartDate] = React.useState<dayjs.Dayjs | null>(null);
  const [endDate, setEndDate] = React.useState<dayjs.Dayjs | null>(null);
  const [isActive, setIsActive] = React.useState(true);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState<'success' | 'error'>('success');

  const { mutate, isLoading } = useActivatePostSchools();

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setStartDate(null);
    setEndDate(null);
    setIsActive(true);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!startDate || !endDate || !name.trim()) {
      setSnackbarMessage('All fields are required');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    const activationData = {
      name,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      status: isActive ? 'ACTIVE' : 'INACTIVE',
    };

    mutate(activationData, {
      onSuccess: () => {
        setSnackbarMessage('School activated successfully!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        resetForm();
        handleClose();
      },
      onError: (err) => {
        setSnackbarMessage(`Failed to activate school: ${err.message}`);
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      },
    });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create Link
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Generate event-specific links</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ mb: 2 }}>
              Enter details and select a start and end date for the event-specific link.
            </DialogContentText>

            {/* Name Input Field */}
            <TextField
              label="Event Name"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ mb: 2 }}
            />

            {/* Date Pickers in a Row */}
            <div style={{ display: 'flex', gap: '16px' }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
                <DatePicker
                  label="End Date"
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
            </div>

            {/* MUI Switch for Activation */}
            <FormControlLabel
              control={<Switch checked={isActive} onChange={() => setIsActive(!isActive)} />}
              label={isActive ? 'Active' : 'Inactive'}
              sx={{ mt: 2 }}
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Activating...' : 'Submit'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Snackbar Component */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </React.Fragment>
  );
}
