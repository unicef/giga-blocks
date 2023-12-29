import { Modal, TextInput, Form, InlineNotification, Button } from '@carbon/react';
import { useLogin } from '../../hooks/useSignUp';
import { useForm, Controller } from 'react-hook-form';
import { saveAccessToken, saveCurrentUser } from '../../utils/sessionManager';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '../../auth/useAuthContext';
import { useEffect, useState } from 'react';
import CountdownTimer from '../countdowntimer'
import { useOtp } from '../../hooks/useOtp';

const CarbonModal = ({ open, onClose, email, setSeconds, seconds, error, setError }) => {
  const { handleSubmit, control, reset } = useForm();
  
  const [otpError, setOtpError] = useState(true)
  const { initialize } = useAuthContext();
  const login = useLogin();
  const { push } = useRouter();
  const {mutateAsync:otpMutateAsync} = useOtp()
  const [notification, setNotification] = useState(null);

  const onAdd = async (data) => {

    const payload = {
      email,
      otp: data.name,
    };
    login
      .mutateAsync(payload)
      .then((res) => {
        saveCurrentUser(res.data);
        saveAccessToken(res.data.access_token);
        initialize();
        setNotification({
          kind: 'success',
          title: 'OTP login successful.',
        });
        push('/contributeSchool');
      })
      .catch((err) => {
        setNotification({
          kind: 'error',
          title: `${err.response.data.message}`,
        });
        setError(`${err.response.data.message}, please re-send OTP and try again.`);
      });
  };

  const onCloseNotification = () => {
    setNotification(null);
  };

  const onSubmit = async () => {

    if(email === ''){
      setNotification({
        kind: 'error',
        title: 'Please enter email',
      })
      return null
    }

    otpMutateAsync({ email })
      .then(() => {
        setNotification({
          kind: 'success',
          title: 'Sent successfully',
        })
        setError('Please enter the new OTP.');
        setSeconds(180)
      })
      .catch((error) => {
        setNotification({
          kind: 'error',
          title: 'User not found.',
        });
      });
  };

  const checkEmpty = (e) => {
    const value = e.target.value;
    if (value.length === 6){
      setOtpError(false)
    }
    else{
      setOtpError(true)
    }
  }

  const handleKeyDown = (e) => {
    const value = e.target.value
    if(value.length === 6){
      if (e.key === 'Enter') {
    e.preventDefault();
        onAdd({name: value});
      }
    }
  };

  return (
    <>
      {notification && (
        <InlineNotification
          aria-label="closes notification"
          kind={notification.kind}
          onClose={onCloseNotification}
          title={notification.title}
          style={{
            position: 'fixed',
            top: '50px',
            right: '2px',
            width: '400px',
            zIndex: 1000,
          }}
        />
      )}
      <Modal
        open={open}
        onSecondarySubmit={onClose}
        modalHeading={!error ? `Please check your email` : error}
        onRequestClose={onClose}
        modalLabel={`OTP sent to ${email}.`}
        secondaryButtonText="Cancel"
        primaryButtonText="Submit"
        primaryButtonDisabled={otpError}
        onRequestSubmit={handleSubmit(onAdd)}
      >
        <Form>
          <Controller
            name="name"
            control={control}
            rules={{ required: 'OTP is required', 
            pattern: {
              message: 'OTP',
            }, }}
            
            render={({ field }) => (
              <TextInput
                {...field}
                id="name"
                labelText="Enter OTP here"
                onKeyDown={handleKeyDown}
                onChange={(e) => {
                  checkEmpty(e);
                  field.onChange(e);
                }}
                type='number'
                maxLength={6}
              />
            )}
          />
        </Form>
        <CountdownTimer setSeconds={setSeconds} seconds={seconds}/>
        <a
                style={{
                  marginTop: '10px',
                  cursor: 'pointer'
                }}
                onClick={onSubmit}
              >
                Resend OTP
        </a>
      </Modal>
    </>
  );
};

export default CarbonModal;
