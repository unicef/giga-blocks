// @mui
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';
import { useRouter } from 'next/router';

// ----------------------------------------------------------------------
type SelectedCountryType = {
  selectedCountry: string;
  open: boolean;
  handleClose: () => void;
};

export default function AlertDialog({ selectedCountry, open, handleClose }: SelectedCountryType) {
  const { push } = useRouter();

  const handleSelectGenerators = () => {
    push({
      pathname: '/catalog/generators',
      query: { countries: selectedCountry },
    });
  };

  const handleSelectWires = () => {
    push({
      pathname: '/catalog/wires',
      query: { countries: selectedCountry },
    });
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle> Choosen country: {selectedCountry}</DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please select one option: wires or generators
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button variant="contained" onClick={handleSelectWires}>
            Networks
          </Button>
          <Button variant="contained" onClick={handleSelectGenerators}>
            Generators
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
