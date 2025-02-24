import { TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DatePicker, DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import * as React from 'react';

export default function ActiveDialog() {
  const [open, setOpen] = React.useState(false);
  const [startDate, setStartDate] = React.useState<dayjs.Dayjs | null>(null);
  const [endDate, setEndDate] = React.useState<dayjs.Dayjs | null>(null);
  const [alignment, setAlignment] = React.useState('active');

  const handleChange = (event: React.SyntheticEvent, newAlignment: string) => {
    setAlignment(newAlignment);
    console.log(newAlignment);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Start Date:', startDate ? startDate.format('YYYY-MM-DD HH:mm') : 'Not selected');
    console.log('End Date:', endDate ? endDate.format('YYYY-MM-DD HH:mm') : 'Not selected');
    handleClose();
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
            {/* Toggle Button To Activate and Deactivate School */}
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
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}
