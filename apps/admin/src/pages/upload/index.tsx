import UploadContextProvider, { useUploadContext } from "@contexts/uploadContext";
import { Card, Container, Grid } from "@mui/material";
import CsvFormatFile from "@sections/file/csvFormatFile";
import HorizontalNonLinearStepper from '@components/stepper';
import { useCallback, useState } from "react";
import type XLSX from 'xlsx-ugnis';
import { mapWorkbook } from '@utils/mapWorkbook';
import { separateUniqueAndDuplicates } from '@utils/index';
import DashboardLayout from '@layouts/dashboard/DashboardLayout';

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
        setProductType,
        setFileName,
        tableDatas
      } = useUploadContext();

    const handleFile = useCallback(
        async (data: XLSX.WorkBook, file: File) => {
          if (file) {
            setShowStepper(true);
            setFileData(data);
            const isSingleSheet = data.SheetNames.length === 1;
            if (isSingleSheet) {
              const sheetNames = data.SheetNames;
              const mappedData = mapWorkbook(data);
              const sanitizedData = mappedData.map((row) => row.map((cell) => cell ?? ''));
              const { unique, duplicate } = separateUniqueAndDuplicates(sanitizedData);
              setDuplicates(duplicate);
              setTableDatas(unique);
              setAllData(unique);
              setSheetNames(sheetNames);
              setFileName(file?.name);
            } else {
              const sheetNames = data.SheetNames;
              const sheetData = mapWorkbook(data, selectedSheetName);
              const duplicateData: string[] = [];
              const allSheetData = sheetNames.map((sheetName) => {
                const res = mapWorkbook(data, sheetName);
                const { unique, duplicate } = separateUniqueAndDuplicates(res);
                const finalData = unique.map((row) => row.map((cell:any) => cell ?? ''));
                duplicateData.push(...duplicate);
                return finalData;
              });
              const sanitizedData = sheetData.map((row) => row.map((cell) => cell ?? ''));
              const { unique } = separateUniqueAndDuplicates(sanitizedData);
              setDuplicates(duplicateData);
              setTableDatas(unique);
              setSheetNames(sheetNames);
              setAllData(allSheetData);
            }
          }
        },
        [
          selectedSheetName,
          setFileName,
          setShowStepper,
          setSheetNames,
          setTableDatas,
          setAllData,
          setDuplicates,
        ]
      );

    return ( 
        <DashboardLayout>
        <UploadContextProvider>
        <Container maxWidth={'xl'}>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6} md={6}>
            <Card sx={{ px: 3, py: 1 }}>
              <CsvFormatFile handleFileData={handleFile} />
            </Card>
          </Grid>
          {/* <Grid item xs={12} sm={6} md={6}>
            <Card sx={{ px: 3, py: 1 }}>
              <XlsFormatFile handleFileData={handleFile} />
            </Card>
          </Grid> */}
          <Grid item xs={12} sm={12} md={12}>
            {showStepper && (
              <Card sx={{ px: 3, py: 3 }}>
                <HorizontalNonLinearStepper propsTableData = {tableDatas} />
              </Card>
            )}
          </Grid>
        </Grid>
      </Container>
      </UploadContextProvider>
      </DashboardLayout>
     );
}
 
export default Upload;