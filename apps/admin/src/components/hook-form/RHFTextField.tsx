import { useFormContext, Controller } from 'react-hook-form';
import { TextField, TextFieldProps } from '@mui/material';

type Props = {
  name: string;
} & TextFieldProps;

export default function RHFTextField({ name, helperText, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          value={field.value}
          error={!!error}
          // sx={{
          //   '& .MuiOutlinedInput-root': {
          //     '& fieldset': {
          //       borderColor: 'default !important',
          //       color: 'white !important',
          //     },
          //     '& .MuiOutlinedInput-notchedOutline': {
          //       borderColor: 'rgba(145, 158, 171, 0.32) !important',
          //     },
          //     '& input': {
          //       color: 'white !important', // Sets the input text color to white
          //       boxShadow: '0 0 0 30px #005b5b inset !important',
          //       caretColor: 'white !important', // Sets the input cursor blink color to white
          //     },
          //     '& input:-webkit-autofill': {
          //       WebkitTextFillColor: 'white !important',
          //     },
          //   },
          //   '& .MuiInputLabel-root, & .MuiInputLabel-root.Mui-focused': {
          //     color: '#fff !important',
          //   },
          // }}
          // FormHelperTextProps={{
          //   style: {
          //     color: '#f7931e', // Sets the helper text color to white
          //   },
          // }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#efefef',
              },
              '&:hover fieldset': {
                borderColor: '#efefef',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#efefef',
              },
              '& input': {
                color: 'white',
                '&:-webkit-autofill': {
                  WebkitBoxShadow: '0 0 0 100px #2C2B33 inset',
                  WebkitTextFillColor: 'white !important',
                },
              },
            },
            '& .MuiInputLabel-root': {
              color: '#efefef',
              '&.Mui-focused': {
                color: '#efefef',
              },
            },
            '& .MuiFormHelperText-root': {
              color: 'red',
            },
          }}
          helperText={error ? error.message : helperText}
          {...other}
        />
      )}
    />
  );
}
