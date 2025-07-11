import { useUploadContext } from '@contexts/uploadContext';
import { Button, CircularProgress, LinearProgress } from '@mui/material';
import { Box } from '@mui/system';

const MintingProgressBar = () => {
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
        {mintDetails.total > 0 ? (
          <>
            <h3>Minting</h3>
            <h5>
              School Minted:{mintDetails.mintedCount}/{mintDetails.total}
            </h5>
            <LinearProgress
              value={(mintDetails.mintedCount / mintDetails.total) * 100 || 0}
              variant="determinate"
              sx={{
                width: '20%',
                height: 8,
                borderRadius: 4,
                my: 1,
                backgroundColor: '#e0e0e0', // background track
                '& .MuiLinearProgress-bar': {
                  backgroundColor: '#00AB55', // progress bar
                },
              }}
            />
            <p>
              {mintDetails.mintedCount === mintDetails.total
                ? 'Minted Completed'
                : 'Minting in progress...'}
            </p>
          </>
        ) : (
          <>
            <CircularProgress />
          </>
        )}
      </Box>
    </>
  );
};

export default MintingProgressBar;
