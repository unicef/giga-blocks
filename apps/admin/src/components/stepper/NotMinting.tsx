import { Document } from '@carbon/react/icons';
import { Button, Paper, Typography } from '@mui/material';
import palette from 'src/theme/palette';

const NotMinting = () => {
  return (
    <Paper
      sx={{
        textAlign: 'center',
        py: 6,
        border: `1px solid ${palette('light').grey[300]}`,
        mb: 4,
      }}
    >
      <Document size={50} color={palette('light').grey[400]} />
      <Typography variant="h6" fontWeight={600} mt={2}>
        No School Activation in process
      </Typography>
      <Typography variant="body2" mt={1} color="text.secondary">
        Streamline your school activation process: upload a CSV file and activate all listed schools
        in a single action.
      </Typography>
      <Button
        href={`school/import`}
        variant="contained"
        sx={{
          mt: 3,
          borderRadius: 2,
          px: 4,
          py: 1.5,
          backgroundColor: '#000',
          '&:hover': {
            backgroundColor: '#333',
          },
        }}
      >
        Activate School
      </Button>
    </Paper>
  );
};

export default NotMinting;
