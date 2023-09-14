import { useDropzone } from 'react-dropzone';
// @mui
import { Box, Stack, Button, IconButton, Typography, StackProps } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import CircularProgressWithLabel from '@components/circular-progress';
import { useUploadContext } from '@contexts/uploadContext';

// assets
import { UploadIllustration } from '../../assets/illustrations';
//
import Iconify from '../iconify';
//
import { UploadProps } from './types';
import RejectionFiles from './errors/RejectionFiles';
import MultiFilePreview from './preview/MultiFilePreview';
import SingleFilePreview from './preview/SingleFilePreview';

// ----------------------------------------------------------------------

const StyledDropZone = styled('div')(({ theme }) => ({
  outline: 'none',
  cursor: 'pointer',
  overflow: 'hidden',
  position: 'relative',
  padding: theme.spacing(5),
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create('padding'),
  backgroundColor: theme.palette.background.neutral,
  border: `1px dashed ${alpha(theme.palette.grey[500], 0.32)}`,
  '&:hover': {
    opacity: 0.72,
  },
}));

// ----------------------------------------------------------------------
interface PlaceholderProps extends StackProps {
  fileType?: string;
}

export default function UploadCsv({
  disabled,
  multiple = false,
  error,
  helperText,
  fileType,
  //
  file,
  onDelete,
  //
  files,
  thumbnail,
  progress,
  onUpload,
  onRemove,
  onRemoveAll,
  sx,
  ...other
}: UploadProps) {
  const maxSize = 1048576; // 1MB in bytes
  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    multiple: false,
    accept: {
      'text/csv': ['.csv'],
    },
    maxSize,
    disabled,
    ...other,
  });

  const { typeOfFile } = useUploadContext();
  const hasFile = !!file && !multiple;

  const hasFiles = files && multiple && files.length > 0;

  const isError = isDragReject || !!error;

  return (
    <Box sx={{ width: 1, position: 'relative' }}>
      <StyledDropZone
        {...getRootProps()}
        sx={{
          ...(isDragActive && {
            opacity: 0.72,
          }),
          ...(isError && {
            color: 'error.main',
            bgcolor: 'error.lighter',
            borderColor: 'error.light',
          }),
          ...(disabled && {
            opacity: 0.48,
            pointerEvents: 'none',
          }),
          ...(hasFile && {
            padding: '12% 0',
          }),
          ...sx,
        }}
      >
        <input {...getInputProps()} />

        <Placeholder
          fileType={fileType}
          sx={{
            ...(hasFile && {
              opacity: 0,
            }),
          }}
        />

        {hasFile && typeOfFile === 'csv' && <SingleFilePreview file={file} />}
      </StyledDropZone>
      <Box
        sx={{
          marginTop: 1,
          marginBottom: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography sx={{ fontSize: 14 }}>{helperText && helperText}</Typography>
        {progress > 0 && typeOfFile === 'csv' && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ fontSize: 14 }}>File upload progress:</Typography>
            <CircularProgressWithLabel value={progress} sx={{ mx: 2 }} />
          </Box>
        )}
      </Box>

      <RejectionFiles fileRejections={fileRejections} />

      {hasFile && onDelete && typeOfFile === 'csv' && (
        <IconButton
          size="small"
          onClick={onDelete}
          sx={{
            top: 16,
            right: 16,
            zIndex: 9,
            position: 'absolute',
            color: (theme) => alpha(theme.palette.common.white, 0.8),
            bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
            '&:hover': {
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.48),
            },
          }}
        >
          <Iconify icon="eva:close-fill" width={18} />
        </IconButton>
      )}

      {hasFiles && typeOfFile === 'csv' && (
        <>
          <Box sx={{ my: 3 }}>
            <MultiFilePreview
              progress={progress}
              files={files}
              thumbnail={thumbnail}
              onRemove={onRemove}
            />
          </Box>

          <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
            {onRemoveAll && typeOfFile === 'csv' && (
              <Button color="inherit" variant="outlined" size="small" onClick={onRemoveAll}>
                Remove all
              </Button>
            )}

            {onUpload && typeOfFile === 'csv' && (
              <Button size="small" variant="contained" onClick={onUpload}>
                Upload files
              </Button>
            )}
          </Stack>
        </>
      )}
    </Box>
  );
}

// ----------------------------------------------------------------------

function Placeholder({ fileType, ...other }: PlaceholderProps) {
  return (
    <Stack
      spacing={5}
      alignItems="center"
      justifyContent="center"
      direction={{
        xs: 'column',
        md: 'row',
      }}
      sx={{
        width: 1,
        textAlign: {
          xs: 'center',
          md: 'left',
        },
      }}
      {...other}
    >
      <UploadIllustration sx={{ width: 220 }} />

      <div>
        <Typography gutterBottom variant="h6">
          Drop or Select file ({fileType})
        </Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Drop files here or click
          <Typography
            variant="body2"
            component="span"
            sx={{
              mx: 0.5,
              color: 'primary.main',
              textDecoration: 'underline',
            }}
          >
            browse
          </Typography>
          thorough your machine
        </Typography>
      </div>
    </Stack>
  );
}
