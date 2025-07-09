import { useSnackbar } from '@components/snackbar';
import { useUploadContext } from '@contexts/uploadContext';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Step from '@mui/material/Step';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import { styled } from '@mui/material/styles';
import fileUpload from '@utils/fileUpload';
import { AxiosError } from 'axios';
import { useRouter } from 'next/compat/router';
import * as React from 'react';
import { useEffect, useState } from 'react';
import routes from '../../constants/api';
import SpreadSheetTable from './spreadsheetTable';
import SpreadSheetValidationTable from './spreadsheetValidationTable';
import api from '@utils/apiCall';
import { CircularProgress, LinearProgress } from '@mui/material';
import CsvDetailsTable from './csvDetailsTable';
import { UploadCsv } from './steps/uploadCsv';
import { NextRouter } from 'next/router';
import MintingProgressBar from './MintingProgressBar';
import MintDetails from './MintDetails';

const steps = ['Upload', 'Preview File', 'Validate File', 'Mint'];

type ValidationResult = {
  alreadyMinted: string[];
  invalidSchools: string[];
  inProgressSchools: string[];
};

export default function HorizontalLinearStepper({
  propsTableData,
  setFile,
}: {
  propsTableData: any;
  setFile: any;
}) {
  const [activeStep, setActiveStep] = useState(0);
  const [csvUploadId, setCsvUploadId] = useState('');
  const [files, setFiles] = useState<(File | string)[]>([]);
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const {
    setShowStepper,
    setSelectedSheetName,
    setIsFileValidated,
    setSelectedFiles,
    typeOfFile,
    setDisableDropZone,
    setTableDatas,
    disableDropZone,
    isFileValidated,
    selectedFiles,
    setLoading,
    loading,
    tableDatas: rows,
    setMintDetails,
    mintDetails,
  } = useUploadContext();

  const [hasErrors, setHasErrors] = useState(false);
  const [proceedToMinting, setProceedToMinting] = useState(false);
  const [showMintingProgressBar, setShowMintingProgressBar] = useState(false);
  const [viewDetails, setViewDetails] = useState(false);
  const [csvDetails, setCsvDetails] = useState({
    mintedCount: 0,
    notMintedCount: 0,
    mintingCount: 0,
    schools: [],
  });

  const { enqueueSnackbar } = useSnackbar();
  const { push } = useRouter() as NextRouter as NextRouter;

  const baseUrl = routes.BASE_URL;
  const API_URL = `${baseUrl}${routes.SCHOOLS.UPLOAD}`;
  const VALIDATE_FILE_API_URL = `${baseUrl}${routes.SCHOOLS.VALIDATECSV}`;
  const TOTAL_MINTED_API_URL = `${baseUrl}${routes.SCHOOLS.TOTALMINTED}/${csvUploadId}`;
  const CSV_DETAILS_API_URL = `${baseUrl}${routes.SCHOOLS.DETAILS}/${csvUploadId}`;
  const currentCsvUploadId = 'currentCsvUploadId';
  setTableDatas(propsTableData);

  useEffect(() => {
    setFiles([]);
  }, [typeOfFile]);

  useEffect(() => {
    // if (isFileValidated) {
    const newFiles = selectedFiles?.map((file: any) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );

    setFiles([...newFiles]);
    // setIsFileValidated(false);
    // }
  }, [selectedFiles, setIsFileValidated]);

  useEffect(() => {
    //send file to validate if activate step is 1
    if (activeStep === 2 && files.length > 0 && !isFileValidated) {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append(`files`, file);
      });
      fileUpload
        .post(VALIDATE_FILE_API_URL, formData)
        .then((response) => {
          if (response?.status === 200) {
            setIsFileValidated(true);
            setValidationResult({
              alreadyMinted: response.data?.data?.alreadyMinted || [],
              invalidSchools: response.data?.data?.invalidSchools || [],
              inProgressSchools: response.data?.data?.inProgressSchools || [],
            });
          }
        })
        .catch((error: AxiosError) => {
          enqueueSnackbar(error.message, { variant: 'error' });
          setHasErrors(true);
          setActiveStep(0);
          setDisableDropZone(false);
        });
    } else if (activeStep == 0) {
      setDisableDropZone(false);
    }
  }, [activeStep]);

  useEffect(() => {
    const fetchMintedStatus = async () => {
      try {
        setShowMintingProgressBar(true);
        const res = await api.get(TOTAL_MINTED_API_URL);
        console.log(res.data);
        setMintDetails(res.data);
        //clear from local storage
        if (res?.data?.mintedCount === res?.data?.total) {
          localStorage.removeItem(currentCsvUploadId);
          setDisableDropZone(false);
        }
      } catch (err) {
        console.error('Error fetching minted status', err);
      }
    };
    if (!csvUploadId) return; // Exit if csvUploadId is not set
    // Initial call
    fetchMintedStatus();

    // Set interval to fetch every 20 seconds
    const intervalId = setInterval(fetchMintedStatus, 20000);

    // Clean up
    return () => clearInterval(intervalId);
  }, [csvUploadId]);

  useEffect(() => {
    if (csvUploadId && viewDetails) {
      api
        .get(CSV_DETAILS_API_URL)
        .then((response) => {
          setCsvDetails(response.data);
        })
        .catch((error: AxiosError) => {
          enqueueSnackbar(error.message, { variant: 'error' });
        });
    }
  }, [viewDetails, mintDetails]);

  useEffect(() => {
    const csvUploadId = localStorage.getItem(currentCsvUploadId);

    if (csvUploadId) {
      setCsvUploadId(csvUploadId);
      setActiveStep(4);
    }
  }, []);

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
    setSelectedSheetName('');
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setDisableDropZone(true);
    setFile([]);
  };

  const handleUpload = async () => {
    if (files.length > 0) {
      setLoading(true);
      const formData = new FormData();
      files.forEach((file) => {
        formData.append(`files`, file);
      });
      const reader = new FileReader();
      const file = files[0] as File;
      reader.onload = async (e) => {
        const text = e.target?.result as string;

        // Convert CSV to array of arrays
        const rows = text
          .trim()
          .split('\n')
          .map((row) => row.split(','));

        const header = rows[0]; // Save header separately
        const dataRows = rows.slice(1);

        // Collect all invalid IDs from validationResult
        const invalidIds = new Set([
          ...(validationResult?.alreadyMinted || []),
          ...(validationResult?.invalidSchools || []),
          ...(validationResult?.inProgressSchools || []),
        ]);

        // Filter out rows where first column (school_id) is in invalidIds
        const filteredRows = dataRows.filter((row) => !invalidIds.has(row[0]));
        // Re-attach header
        const filteredCSV = [header, ...filteredRows].map((row) => row.join(',')).join('\n');

        // Convert filtered CSV string back to File
        const filteredFile = new File([filteredCSV], file.name, {
          type: 'text/csv',
        });
        const formData = new FormData();
        formData.append('files', filteredFile);
        await fileUpload
          .post(API_URL, formData, {
            onUploadProgress: (progressEvent: any) => {
              const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              setProgress(percentage);
            },
          })
          .then((response) => {
            setCsvUploadId(response.data?.csvUploadId);
            setLoading(false);
            localStorage.setItem(currentCsvUploadId, response.data?.csvUploadId);

            setFiles([]);
            setProgress(0);
            setDisableDropZone(true);
            // Handle successful upload
            if (response?.status === 200) {
              enqueueSnackbar('Schools are added in queue. Processing will take some time.');
            }
            if (response?.status === 500) {
              enqueueSnackbar('Error uploading to database! Please check your file', {
                variant: 'error',
              });
            }
          })
          .catch((error: AxiosError) => {
            // Handle upload error
            setProgress(0);
            enqueueSnackbar(error.message, { variant: 'error' });
            setLoading(false);
            setFile([]);
            setDisableDropZone(false);
          });
      };
      reader.readAsText(file);
    }
  };

  const handleReupload = () => {
    setIsFileValidated(false);
    setActiveStep(0);
    setDisableDropZone(false);
    setSelectedSheetName('');
    setFile([]);
    setSelectedFiles([]);
  };

  const handleBackToDashboard = () => {
    setIsFileValidated(false);
    setShowStepper(false);
    setSelectedFiles([]);
    push('/dashboard');
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
      {activeStep === 2 ? (
        <>
          {/* here you need to validation Table */}
          <SpreadSheetValidationTable
            setHasErrors={setHasErrors}
            validationResult={validationResult}
            isFileValidated={isFileValidated}
            setProceedToMinting={setProceedToMinting}
          />
          <Box sx={{ display: 'flex', flexDirection: 'row', py: 3, px: 1 }}>
            <Button
              variant="outlined"
              color="inherit"
              // disabled={activeStep === 0}
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
                {/* {!hideButton && (
                  <Alert severity="success" sx={{ mx: 2 }}>
                    File Looks all good!
                  </Alert>
                )} */}
                <Button disabled={!proceedToMinting} variant="contained" onClick={handleNext}>
                  Next
                </Button>
              </Box>
            )}
          </Box>
        </>
      ) : activeStep === 1 ? (
        <>
          {/* here you need to show the content (Preview) */}

          <SpreadSheetTable />
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
              disabled={isFileValidated} // Disable back button once validated
              color="inherit"
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Button variant="contained" onClick={handleNext}>
              Next
            </Button>
          </Box>
        </>
      ) : activeStep === 0 ? (
        <>
          <UploadCsv />
          <Box sx={{ display: 'flex', flexDirection: 'row', py: 3, px: 1 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button disabled={files.length === 0} variant="contained" onClick={handleNext}>
              Next
            </Button>
          </Box>
        </>
      ) : (
        <>
          {showMintingProgressBar ? (
            !viewDetails ? (
              <>
                <MintingProgressBar />
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
                    disabled={mintDetails?.mintedCount !== mintDetails.total}
                    onClick={handleBackToDashboard}
                    sx={{ mr: 1 }}
                  >
                    Finish
                  </Button>
                  <Button
                    variant="contained"
                    style={{ background: '#00AB55' }}
                    color="success"
                    onClick={() => setViewDetails(true)}
                  >
                    View Details
                  </Button>
                </Box>
              </>
            ) : (
              <>
                <MintDetails csvDetails={csvDetails} setViewDetails={setViewDetails} />
              </>
            )
          ) : (
            <>
              {!loading && (
                <>
                  <SpreadSheetTable invalidate={validationResult} />
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
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                      Back
                    </Button>
                    <Box>
                      <Button
                        variant="outlined"
                        color="inherit"
                        onClick={handleReupload}
                        sx={{ mr: 1 }}
                      >
                        Cancel
                      </Button>
                      <Button variant="contained" onClick={handleUpload}>
                        Mint
                      </Button>
                    </Box>
                  </Box>
                </>
              )}
            </>
          )}
        </>
      )}
    </Box>
  );
}
