import { Box } from '@mui/system';
import CsvDetailsTable from './csvDetailsTable';
import { Button, CircularProgress } from '@mui/material';
import { useUploadContext } from '@contexts/uploadContext';

const MintDetails = ({
  setViewDetails,
  csvDetails,
}: {
  setViewDetails: (view: boolean) => void;
  csvDetails: { schools: string[] };
}) => {
  const { mintDetails } = useUploadContext();

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          py: 3,
          px: 1,
        }}
      >
        <h3>
          {' '}
          {mintDetails.total > 0 && mintDetails.mintedCount === mintDetails.total
            ? 'Minted Completed'
            : 'Minting in progress...'}
        </h3>
        {csvDetails.schools.length > 0 ? (
          <CsvDetailsTable schools={csvDetails.schools} />
        ) : (
          <>
            <CircularProgress />
          </>
        )}
        <h4>Total:{csvDetails?.schools?.length || 0}</h4>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          py: 3,
          px: 1,
        }}
      >
        <Button
          variant="outlined"
          color="inherit"
          onClick={() => setViewDetails(false)}
          sx={{ mr: 1 }}
        >
          Back
        </Button>
      </Box>
    </>
  );
};

export default MintDetails;
