import { useEffect, useState, useCallback } from 'react';
import { Alert, Box, Stack, Button, TextField } from '@mui/material';
import Iconify from '@components/iconify';
import { UploadCsv } from '@components/upload';
import fileUpload from '@utils/fileUpload';
import { AxiosError } from 'axios';
import { useSnackbar } from '@components/snackbar';
import ConfirmDialog from '@components/confirm-dialog';
import { useUploadContext } from '@contexts/uploadContext';
import { readFileAsync } from '@utils/readFilesAsync';
import * as XLSX from 'xlsx-ugnis';
import api from '@constants/api'
import { MAX_FILE_SIZE } from '@constants/constantValue';


interface Props {
  title?: string;
  onCreate?: VoidFunction;
  onUpdate?: VoidFunction;
  folderName?: string;
  handleFileData: (data: XLSX.WorkBook, file: File) => void;
  onChangeFolderName?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CsvFormatFile({
  title = 'Upload Files (.csv only)',
  onCreate,
  onUpdate,
  folderName,
  handleFileData,
  onChangeFolderName,
}: Props) {
  const [files, setFiles] = useState<(File | string)[]>([]);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [showErrorMsg, setShowErrorMsg] = useState<string>('');
  const {
    isFileValidated,
    setIsFileValidated,
    disableDropZone,
    setDisableDropZone,
    setTypeOfFile,
    typeOfFile,
    selectedFiles,
    setSelectedFiles
  } = useUploadContext();
  const { enqueueSnackbar } = useSnackbar();
  const API_URL = `${api.BASE_URL}${api.SCHOOLS.UPLOAD}`

  const errorMessageArray = showErrorMsg && JSON.parse(showErrorMsg);

  useEffect(() => {
    setFiles([]);
  }, [typeOfFile]);

  const handleDrop = useCallback(
    async (uploadedFiles: File[]) => {
      setSelectedFiles(uploadedFiles);
      const arrayBuffer = await readFileAsync(uploadedFiles[0]); // only accepting single
      const workbook = XLSX.read(arrayBuffer, {
        cellDates: true,
        dense: true,
      });
      handleFileData(workbook, uploadedFiles[0]);
      setTypeOfFile('csv');
    },
    [handleFileData, setTypeOfFile]
  );

  useEffect(() => {
    if (isFileValidated) {
      const newFiles = selectedFiles.map((file:any) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
      setIsFileValidated(false);
    }
  }, [isFileValidated, selectedFiles, setIsFileValidated]);

  const handleUpload = async () => {
    if (files.length > 0) {
      const formData = new FormData();

      files.forEach((file) => {
        formData.append(`files`, file);
      });

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
          // Handle successful upload
          if (response?.status === 200) {
            enqueueSnackbar('Successfully uploaded to database!');
          }
        })
        .catch((error: AxiosError) => {
          // Handle upload error
          console.log(error);
        //   setShowErrorMsg(error?.message);
          setProgress(0);
        });
    }
  };

  const handleRemoveFile = (inputFile: File | string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file !== inputFile));
    setDisableDropZone(false);
    setProgress(0);
    setShowErrorMsg('');
  };

  const handleRemoveAllFiles = () => {
    setOpenConfirm(false);
    setFiles([]);
    setDisableDropZone(false);
    setProgress(0);
    setShowErrorMsg('');
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
    setShowErrorMsg('');
  };

  return (
    <div>
      <h4>{title}</h4>
      {(onCreate || onUpdate) && (
        <TextField
          fullWidth
          label="Folder name"
          value={folderName}
          onChange={onChangeFolderName}
          sx={{ mb: 3 }}
        />
      )}
      <UploadCsv
        multiple
        sx={disableDropZone ? { pointerEvents: 'none', userSelect: 'none' } : {}}
        files={files}
        onDrop={handleDrop}
        onRemove={handleRemoveFile}
        fileType="csv only"
        progress={progress}
        helperText={
          <div>
            (Note: File size should not exceed {MAX_FILE_SIZE} MB) <br />
            Also, please ensure that the file name precisely matches the sheet name.
            <a href="/school.csv" target="_blank" rel="noopener noreferrer" style={{color: "purple"}}> Download Sample File</a>
          
          </div>
        }
      />
      <Box sx={{ marginTop: 2, marginBottom: 2, textAlign: 'right' }}>
        {/* {!!files.length && typeOfFile === 'csv' && (
          <>
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:cloud-upload-fill" />}
              onClick={handleUpload}
              sx={{ mx: 1 }}
            >
              Upload to database
            </Button>{' '}
            <Button variant="outlined" color="inherit" sx={{ mx: 1 }} onClick={handleOpenConfirm}>
              Remove all
            </Button>
          </>
        )} */}

        {(onCreate || onUpdate) && (
          <Stack direction="row" justifyContent="flex-end" flexGrow={1}>
            <Button variant="soft" onClick={onCreate || onUpdate}>
              {onUpdate ? 'Save' : 'Create'}
            </Button>
          </Stack>
        )}
      </Box>
      {errorMessageArray.length > 0 && (
        <Alert severity="error">
          <ul>
            {errorMessageArray.map((errorMsg: string, index: number) => (
              <li key={index}>- {errorMsg}</li>
            ))}
          </ul>
        </Alert>
      )}

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Remove all the files"
        content="Are you sure want to remove all the files?"
        action={
          <Button variant="contained" color="error" onClick={handleRemoveAllFiles}>
            Remove
          </Button>
        }
      />
    </div>
  );
}
