import { useEffect, useState, useCallback } from 'react';
import { Alert, Box, Stack, Button, TextField } from '@mui/material';
import { UploadCsv } from '@components/upload';
import ConfirmDialog from '@components/confirm-dialog';
import { useUploadContext } from '@contexts/uploadContext';
import { readFileAsync } from '@utils/readFilesAsync';
import * as XLSX from 'xlsx-ugnis';
import { MAX_FILE_SIZE } from '@constants/constantValue';

const basePath = process.env.NEXT_PUBLIC_ADMIN_BASE_PATH

interface Props {
  title?: string;
  onCreate?: VoidFunction;
  onUpdate?: VoidFunction;
  folderName?: string;
  handleFileData: (data: XLSX.WorkBook, file: File) => void;
  files: any;
  setFiles: Function;
  onChangeFolderName?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CsvFormatFile({
  title = 'Upload Files (.csv only)',
  onCreate,
  onUpdate,
  folderName,
  handleFileData,
  onChangeFolderName,
  files,
  setFiles
}: Props) {
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
      const newFiles = selectedFiles?.map((file:any) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      setFiles((prevFiles:any) => [...prevFiles, ...newFiles]);
      setIsFileValidated(false);
    }
  }, [isFileValidated, selectedFiles, setIsFileValidated]);

  const handleRemoveFile = (inputFile: File | string) => {
    setFiles((prevFiles:any) => prevFiles.filter((file:any) => file !== inputFile));
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
            <a href={`${basePath}/school.csv` }target="_blank" rel="noopener noreferrer" style={{color: "purple"}}> Download Sample File</a>
          
          </div>
        }
      />
      <Box sx={{ marginTop: 2, marginBottom: 2, textAlign: 'right' }}>
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
            {errorMessageArray?.map((errorMsg: string, index: number) => (
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
