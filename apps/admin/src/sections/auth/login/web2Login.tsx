import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Stack, Typography, TextField, Button, Card, Modal } from '@mui/material';
import { useAuthContext } from 'src/auth/useAuthContext';
import { useSnackbar } from '@components/snackbar';
import { saveAccessToken, saveCurrentUser, saveRefreshToken } from '@utils/sessionManager';
import client from '@utils/client';

type Inputs = {
  email: string;
};

export default function Web2Login() {
  const { enqueueSnackbar } = useSnackbar();
  const { setAuthState } = useAuthContext();
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [isVerifyLoading, setIsVerifyLoading] = useState<Boolean>(false);
  const [email, setEmail] = useState<String>('');
  const [open, setOpen] = useState<Boolean>(false);
  const [otp, setOtp] = useState<String>('');

  const isOpen = open ? true : false;

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setEmail(data?.email);
    sendOtp(data);
  };

  const sendOtp = async (payload: Inputs) => {
    try {
      setIsLoading(true);
      const response = await client.post('/auth/admin/send-otp', payload);
      if (response.status === 201) {
        setOpen(true);
      }
    } catch (err) {
      enqueueSnackbar(err?.message, { variant: 'error' });
      throw err?.message;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async (payload: any) => {
    try {
      setIsVerifyLoading(true);
      const { data, status } = await client.post('auth/login', payload);
      if (status === 201) {
        const currentUser = {
          email: data.email,
          username: data.name,
          userId: data.id,
          role: data.roles,
        };
        setAuthState((prev: any) => ({
          ...prev,
          isAuthenticated: true,
          isInitialized: true,
          token: data.access_token,
          user: currentUser,
        }));

        saveCurrentUser(currentUser);
        saveAccessToken(data.access_token);
        saveRefreshToken(data.refresh_token);
        push('/dashboard');
      }
    } catch (err) {
      throw err;
    } finally {
      setIsVerifyLoading(false);
    }
  };

  return (
    <>
      <Stack spacing={3}>
        <Typography variant="h4" color="white">
          Web2 Login
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <TextField
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
              id="outlined-basic"
              label="email*"
              variant="outlined"
              placeholder="Enter your email address"
              {...register('email', {
                pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                required: true,
              })}
              helperText={errors.email && 'Please enter valid email'}
            />
            <div style={{ display: 'flex', justifyContent: 'end' }}>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                disabled={isLoading ? true : false}
              >
                {isLoading && 'Sending Otp'}
                {!isLoading && 'Login'}
              </Button>
            </div>
          </Stack>
        </form>
      </Stack>

      <Modal open={isOpen}>
        <div style={{ height: '100vh', display: 'grid', placeItems: 'center' }}>
          <Card sx={{ padding: '2rem' }}>
            <Typography variant="h6" color="black" marginBottom={2}>
              Verify your account
            </Typography>
            <Stack>
              <Typography paragraph>
                We have sent a verification code to your email address.
                <br /> Please enter the verification code below:
              </Typography>
              <TextField
                variant="outlined"
                value={otp}
                fullWidth
                placeholder="Enter verification code"
                type="number"
                onChange={(e) => setOtp(e.target.value)}
              />
              <Stack direction="row" justifyContent="center" marginTop={2} spacing={5}>
                <Button variant="contained" color="secondary" onClick={handleClose}>
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => verifyOtp({ email: email, otp: otp })}
                  disabled={isVerifyLoading ? true : false}
                >
                  {isVerifyLoading ? 'Verifying' : 'Verify'}
                </Button>
              </Stack>
            </Stack>
          </Card>
        </div>
      </Modal>
    </>
  );
}
