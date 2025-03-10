import { TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useActivatePostSchools, useActivateSchool } from '@hooks/school/useSchool';
import * as React from 'react';

export default function ActiveDialog() {
  const [open, setOpen] = React.useState(false);
  const [startDate, setStartDate] = React.useState<dayjs.Dayjs | null>(null);
  const [endDate, setEndDate] = React.useState<dayjs.Dayjs | null>(null);
  const [alignment, setAlignment] = React.useState('');

  const { mutate, isLoading, isError, error, isSuccess } = useActivatePostSchools();
  const { data } = useActivateSchool();

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

    if (!startDate || !endDate) {
      console.error('Start and End Date are required');
      return;
    }

    const activationData = {
      startDate: startDate.format('YYYY-MM-DD'),
      endDate: endDate.format('YYYY-MM-DD'),
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
        Activate School
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Activate School</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Select start and end date to activate schools if not activated already.
            </DialogContentText>

            <ToggleButtonGroup
              color="primary"
              size="small"
              value={alignment}
              exclusive
              onChange={handleChange}
              aria-label="Activate"
              sx={{ mt: 2, mb: 2 }}
            >
              <ToggleButton value="activate">Activate</ToggleButton>
              <ToggleButton value="deactivate">Deactivate</ToggleButton>
            </ToggleButtonGroup>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Start Date"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
              <div style={{ marginTop: '18px' }}>
                <DatePicker
                  label="End Date"
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </div>
            </LocalizationProvider>

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
