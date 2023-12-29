import {
  Modal,
  TextInput,
  Form,
  InlineNotification,
  Button,
} from '@carbon/react';
import { useLogin } from '../../hooks/useSignUp';
import { useForm, Controller } from 'react-hook-form';
import { saveAccessToken, saveCurrentUser } from '../../utils/sessionManager';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '../../auth/useAuthContext';
import { useEffect, useState } from 'react';
import { useOtp } from '../../hooks/useOtp';

const CarbonModal = ({ open, onClose, email }) => {
  const { handleSubmit, control, reset } = useForm();
  const [error, setError] = useState();
  const { initialize } = useAuthContext();
  const login = useLogin();
  const { push } = useRouter();
  const { mutateAsync: otpMutateAsync } = useOtp();
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
        console.log(err);
        setNotification({
          kind: 'error',
          title: 'Error in OTP login. Please try again.',
        });
        setError('OTP verification unsuccessful. Please try again.');
      });
  };

  useEffect(() => {
    if (notification) {
      const timeoutId = setTimeout(() => {
        onCloseNotification();
      }, 4000);

      return () => clearTimeout(timeoutId);
    }
  }, [notification]);

  const onCloseNotification = () => {
    setNotification(null);
  };

  const onSubmit = async () => {
    otpMutateAsync({ email })
      .then(() => {
        setNotification({
          kind: 'success',
          title: 'Sent successfully',
        });
      })
      .catch((error) => {
        setNotification({
          kind: 'error',
          title: 'User not found.',
        });
      });
  };

  return (
    <>
      {notification && (
        <InlineNotification
          aria-label="closes notification"
          timeout={1}
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
        onRequestSubmit={handleSubmit(onAdd)}
      >
        <Form>
          <Controller
            name="name"
            control={control}
            rules={{ required: 'Email is required' }}
            render={({ field }) => (
              <TextInput
                {...field}
                id="name"
                // style={{height: "48px" }}
                labelText="Enter OTP here"
                placeholder=""
                onChange={(e) => {
                  field.onChange(e);
                }}
              />
            )}
          />
        </Form>
        <Button
          className="submit-btn"
          style={{
            marginTop: '20px',
            width: '100%',
            background: 'transparent',
            color: '#0f62fe',
            border: '1px solid #0f62fe',
          }}
          onClick={onSubmit}
        >
          Resend OTP
        </Button>
      </Modal>
    </>
  );
};

export default CarbonModal;
