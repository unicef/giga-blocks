import { useActivatePostSchools } from '@hooks/school/useSchool';
import { TextField, ToggleButton, ToggleButtonGroup, Grid } from '@mui/material';
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
  const [alignment, setAlignment] = React.useState('');

  const { mutate, isLoading, isError, error, isSuccess } = useActivatePostSchools();

  const handleChange = (event: React.SyntheticEvent, newAlignment: string) => {
    setAlignment(newAlignment);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim()) {
      console.error('Name is required');
      return;
    }

    if (!startDate || !endDate) {
      console.error('Start and End Date are required');
      return;
    }

    const activationData = {
      name,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      status: alignment,
    };

    mutate(activationData, {
      onSuccess: () => {
        console.log('School activated successfully');
        handleClose();
      },
      onError: (err) => {
        console.error('Failed to activate school:', err);
      },
    });
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
              Enter a name and select a start and end date for the event-specific link to define its
              active period.
            </DialogContentText>

            {/* Name Field */}
            <TextField
              label="Event Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              required
              sx={{ mb: 2 }}
            />

            {/* Start Date and End Date in a single row */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={6}>
                  <DatePicker
                    label="Start Date"
                    value={startDate}
                    onChange={(newValue) => setStartDate(newValue)}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </Grid>
                <Grid item xs={6}>
                  <DatePicker
                    label="End Date"
                    value={endDate}
                    onChange={(newValue) => setEndDate(newValue)}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </Grid>
              </Grid>
            </LocalizationProvider>

            {/* Toggle Button */}
            <ToggleButtonGroup
              color="primary"
              size="small"
              value={alignment}
              exclusive
              onChange={handleChange}
              aria-label="Activate"
              sx={{ mt: 2, mb: 2 }}
            >
              <ToggleButton value="ACTIVE">Activate</ToggleButton>
            </ToggleButtonGroup>

            {/* Error Handling */}
            {isError && <p style={{ color: 'red' }}>Error: {error?.message}</p>}
            {isSuccess && <p style={{ color: 'green' }}>School activated successfully!</p>}
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
    </React.Fragment>
  );
}
