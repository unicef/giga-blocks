import { useUploadContext } from "@contexts/uploadContext";
import { Card, Container, Grid } from "@mui/material";
import CsvFormatFile from "@sections/file/csvFormatFile";
import HorizontalNonLinearStepper from '@components/stepper';
import { useCallback, useState } from "react";
import type XLSX from 'xlsx-ugnis';
import { mapWorkbook } from '@utils/mapWorkbook';
import { separateUniqueAndDuplicates } from '@utils/index';
import DashboardLayout from '@layouts/dashboard/DashboardLayout';
import {CircularProgress} from '@mui/material';

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
        tableDatas
      } = useUploadContext();

  const [files, setFiles] = useState<(File | string)[]>([]);

    const handleFile = useCallback(
        async (data: XLSX.WorkBook, file: File) => {
          if (file) {
            setShowStepper(true);
            setFileData(data);
            const isSingleSheet = data.SheetNames.length === 1;
            if (isSingleSheet) {
              const sheetNames = data.SheetNames;
              const mappedData:any = mapWorkbook(data);
              const sanitizedData = mappedData?.map((row:any) => row?.map((cell:any) => cell ?? ''));
              const { duplicate } = separateUniqueAndDuplicates(sanitizedData);
              setDuplicates(duplicate);
              //use unique for removing duplicate data inside setTableDatas and setDuplicates
              setTableDatas(mappedData);
              setAllData(mappedData);
              setSheetNames(sheetNames);
              setFileName(file?.name);
            } else {
              const sheetNames = data.SheetNames;
              const sheetData = mapWorkbook(data, selectedSheetName);
              const duplicateData: string[] = [];
              const allSheetData = sheetNames?.map((sheetName) => {
                const res = mapWorkbook(data, sheetName);
                const { unique, duplicate } = separateUniqueAndDuplicates(res);
                const finalData = unique?.map((row) => row?.map((cell:any) => cell ?? ''));
                duplicateData.push(...duplicate);
                return finalData;
              });
              const sanitizedData = sheetData?.map((row) => row?.map((cell) => cell ?? ''));
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
          setSheetNames,
          setTableDatas,
          setDuplicates
        ]
      );

    return ( 
        <DashboardLayout>
        <Container maxWidth={'xl'}>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6} md={6}>
            <Card sx={{ px: 3, py: 1 }}>
              <CsvFormatFile handleFileData={handleFile} setFiles={setFiles} files={files}/>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            {showStepper && (
              <Card sx={{ px: 3, py: 3 }}>
                <HorizontalNonLinearStepper propsTableData = {tableDatas} setFile={setFiles}/>
              </Card>
            )}
            {loading &&(
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CircularProgress />
              </div>
            )}
          </Grid>
        </Grid>
      </Container>
      </DashboardLayout>
     );
}
 
export default Upload;