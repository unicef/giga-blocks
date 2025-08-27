import { useUploadContext } from '@contexts/uploadContext';
import { Card, Container, Grid } from '@mui/material';
import CsvFormatFile from '@sections/file/csvFormatFile';
import HorizontalNonLinearStepper from '@components/stepper';
import { useCallback, useEffect, useState } from 'react';
import type XLSX from 'xlsx-ugnis';
import { mapWorkbook } from '@utils/mapWorkbook';
import { separateUniqueAndDuplicates } from '@utils/index';
import DashboardLayout from '@layouts/dashboard/DashboardLayout';
import { CircularProgress } from '@mui/material';

const Upload = () => {
  const [fileData, setFileData] = useState<XLSX.WorkBook | null>(null);

  const {
    setDuplicates,
    setTableDatas,
    setAllData,
    setSheetNames,
    selectedSheetName,
    setShowStepper,
    showStepper,
    loading,
    setFileName,
    tableDatas,
    disableDropZone,
    setDisableDropZone,
  } = useUploadContext();

  const [files, setFiles] = useState<(File | string)[]>([]);

  useEffect(() => {
    const currentCsvUploadId = localStorage.getItem('currentCsvUploadId');
    if (currentCsvUploadId) {
      setDisableDropZone(true);
    }
    setShowStepper(true);
  }, []);

  console.log({ disableDropZone });
  return (
    <DashboardLayout>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={12} md={12}>
          {showStepper && (
            <Card sx={{ px: 3, py: 3 }}>
              <HorizontalNonLinearStepper propsTableData={tableDatas} setFile={setFiles} />
            </Card>
          )}
          {loading && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CircularProgress />
            </div>
          )}
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default Upload;
