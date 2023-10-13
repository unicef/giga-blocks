import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import { styled } from '@mui/material/styles';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { useUploadContext } from '@contexts/uploadContext';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import SpreadSheetTable from './spreadsheetTable';
import SpreadSheetValidationTable from './spreadsheetValidationTable';

const steps = ['Preview File', 'Validate File'];

export default function HorizontalLinearStepper({propsTableData}:{propsTableData: any}) {
  const [activeStep, setActiveStep] = React.useState(0);
  const { setShowStepper, setSelectedSheetName, setIsFileValidated, setDisableDropZone, setTableDatas } =
    useUploadContext();
  const [hasErrors, setHasErrors] = React.useState(false);

  setTableDatas(propsTableData)

  const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 10,
      left: 'calc(-50% + 16px)',
      right: 'calc(50% + 16px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: hasErrors ? 'red' : '#00AB55',
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: hasErrors ? 'red' : '#00AB55',
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
      borderTopWidth: 2,
    },
    '& .MuiStepLabel-active': {
      color: 'red !important',
    },
  }));

  const RedStepLabel = styled(StepLabel)(({ theme }) => ({
    '& .Mui-active	': {
      color: 'red !important',
    },
  }));

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setDisableDropZone(true);
  };

  const handleFinish = () => {
    setShowStepper(false);
    setIsFileValidated(true);
    setDisableDropZone(true);
    setSelectedSheetName('');
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setDisableDropZone(false);
  };

  const handleReupload = () => {
    setShowStepper(false);
    setDisableDropZone(false);
    setSelectedSheetName('');
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep} sx={{ py: 2 }} connector={<QontoConnector />}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};

          return (
            <Step key={label} {...stepProps}>
              {hasErrors && label === 'Validate File' ? (
                <RedStepLabel>
                  <h4 style={{ color: 'red' }}>Validation Failed</h4>
                </RedStepLabel>
              ) : (
                <StepLabel {...labelProps}>
                  <h4>{label}</h4>
                </StepLabel>
              )}
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length - 1 ? (
        <>
          {/* here you need to validation Table */}
          <SpreadSheetValidationTable setHasErrors={setHasErrors} />
          <Box sx={{ display: 'flex', flexDirection: 'row', py: 3, px: 1 }}>
            <Button
              variant="outlined"
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {hasErrors ? (
              <Box style={{ display: 'flex', alignItems: 'center' }}>
                <Alert severity="error" sx={{ mx: 2 }}>
                  Please make the necessary changes in the file and upload again!
                </Alert>

                <Button variant="contained" color="warning" onClick={handleReupload}>
                  Reupload
                </Button>
              </Box>
            ) : (
              <Box style={{ display: 'flex', alignItems: 'center' }}>
                <Alert severity="success" sx={{ mx: 2 }}>
                  File Looks all good!
                </Alert>
                <Button variant="contained" onClick={handleFinish}>
                  Finish
                </Button>
              </Box>
            )}
          </Box>
        </>
      ) : (
        <>
          {/* here you need to show the content (Preview) */}

          <SpreadSheetTable />
          <Box sx={{ display: 'flex', flexDirection: 'row', py: 3, px: 1 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button variant="contained" onClick={handleNext}>
              Next
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}
