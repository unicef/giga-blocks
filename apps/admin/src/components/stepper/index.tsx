import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import { useEffect, useState } from 'react';
import Step from '@mui/material/Step';
import fileUpload from '@utils/fileUpload';
import { styled } from '@mui/material/styles';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { useUploadContext } from '@contexts/uploadContext';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import SpreadSheetTable from './spreadsheetTable';
import SpreadSheetValidationTable from './spreadsheetValidationTable';
import routes from '../../constants/api'
import { useSnackbar } from '@components/snackbar';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';

const steps = ['Preview File', 'Validate File'];

export default function HorizontalLinearStepper({propsTableData, setFile}:{propsTableData: any, setFile:any}) {
  const [activeStep, setActiveStep] = useState(0);
  const [files, setFiles] = useState<(File | string)[]>([]);
  const [hideButton, setHideButton] = useState(false)
  const [progress, setProgress] = useState<number>(0);
  // const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const { setShowStepper, setSelectedSheetName, setIsFileValidated, typeOfFile, setDisableDropZone, setTableDatas, disableDropZone, isFileValidated, selectedFiles,setLoading} =
    useUploadContext();
  const [hasErrors, setHasErrors] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const {push} = useRouter()

  const baseUrl = routes.BASE_URL
  const API_URL = `${baseUrl}${routes.SCHOOLS.UPLOAD}`;
  setTableDatas(propsTableData)

  useEffect(() => {
    setFiles([]);
  }, [typeOfFile]);

  useEffect(() => {
    if (isFileValidated) {
      const newFiles = selectedFiles?.map((file:any) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
      setIsFileValidated(false);
    }
  }, [isFileValidated, selectedFiles, setIsFileValidated]);

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
    setIsFileValidated(true);
    setSelectedSheetName('');
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setDisableDropZone(true);
    setFile([])
  };

  const handleUpload = async () => {
    if (files.length > 0) {
      const formData = new FormData();

      files.forEach((file) => {
        formData.append(`files`, file);
      });
      setShowStepper(false);
      setLoading(true)
      await fileUpload
        .post(API_URL, formData, {
          onUploadProgress: (progressEvent: any) => {
            const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setProgress(percentage);
          },
        })
        .then((response) => {
          setFiles([]);
          setProgress(0);
          setDisableDropZone(false);
          setLoading(false)
          // Handle successful upload
          if (response?.status === 200) {
            enqueueSnackbar('Successfully uploaded to database!');
            push(`/school/un-minted?uploadId=${response.data.data}`)
          }
          if(response?.status === 500){
            enqueueSnackbar('Error uploading to database! Please check your file',{variant: 'error'});
          }
        })
        .catch((error: AxiosError) => {
          // Handle upload error
          setProgress(0);
          enqueueSnackbar('Error uploading to database! Please check your file',{variant: 'error'});
          setLoading(false)
          setFile([])
          setDisableDropZone(false)
        });
    }
  };

  const handleReupload = () => {
    setShowStepper(false);
    setDisableDropZone(false);
    setSelectedSheetName('');
    setFile([])
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep} sx={{ py: 2 }} connector={<QontoConnector />}>
        {steps?.map((label, index) => {
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
                {!hideButton && <Alert severity="success" sx={{ mx: 2 }}>
                  File Looks all good!
                </Alert>}
                <Button variant="contained" onClick={handleUpload}>
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
