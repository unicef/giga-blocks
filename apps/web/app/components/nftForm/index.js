import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Form,
  TextInput,
  Button,
  Grid,
  Column,
  Dropdown,
  InlineNotification,
} from '@carbon/react';
import './form.scss';
import { useRegistration } from '../../hooks/useRegistration';
import countryList from 'react-select-country-list';
import { ArrowRight } from '@carbon/icons-react';

const RegisterForm = () => {
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const registerApi = useRegistration();
  const options = countryList().getData();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [notification, setNotification] = useState(null);

  const handleSelectChange = ({selectedItem}) => {
    setValue('country', selectedItem.label);
    setSelectedCountry(selectedItem);
  };

  const onSubmit = async (data) => {
    try {
      const { success } = await registerApi.mutateAsync(data);
      if (success) {
        setValue('fullname', '');
        setValue('email', '');
        setValue('country', '');
        setSelectedCountry(null);
        setNotification({
          kind: 'success',
          title: 'Email has been recorded successfully',
        });
      }
    } catch (error) {
      setValue('fullname', '');
      setValue('email', '');
      setValue('country', '');
      setSelectedCountry(null);
      setNotification({
        kind: 'error',
        title:
          error?.response?.data?.message === 'Bad Request Exception'
            ? 'Enter required information.'
            : error?.response?.data?.message,
      });
    }
  };

  const onCloseNotification = () => {
    setNotification(null);
  };

  useEffect(() => {
    if (notification) {
      const timeoutId = setTimeout(() => {
        onCloseNotification();
      }, 4000);

      return () => clearTimeout(timeoutId);
    }
  }, [notification]);

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
      <Grid className="form-gap" id="joinCommunityForm" fullWidth>
        <Column className="heading-col" md={4} lg={7} sm={4}>
          <h1 className="heading10">
            Join the <br />
            <span style={{ color: '#277aff' }}>
              Developer
              <br /> Community
            </span>{' '}
            <br />
            Waiting List!
          </h1>
        </Column>
        <Column md={4} lg={8} sm={4}>
          <Form className="form" onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="fullname"
              control={control}
              rules={{
                pattern: {
                  value: /^[^\d]+$/,
                  message: 'Invalid name ',
                },
              }}
              render={({ field }) => (
                <TextInput
                  {...field}
                  style={{ marginBottom: '32px' }}
                  id="fullname"
                  invalidText="Invalid error message."
                  labelText="Name"
                  placeholder="Enter your fullname here"
    
                />
              )}
            />
            {errors.fullname && (
              <p
                style={{
                  color: 'red',
                  margin: '6px 0 12px 0',
                  fontSize: '12px',
                }}
              >
                {errors.fullname.message}
              </p>
            )}
            <Controller
              name="email"
              control={control}
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: 'Invalid email address',
                },
              }}
              render={({ field }) => (
                <TextInput
                  {...field}
                  id="email"
                  // style={{ marginBottom: '25px', height: '48px' }}
                  invalidText="Invalid error message."
                  labelText="Email"
                  placeholder="Enter your email here"
                />
              )}
            />
            {errors.email && (
              <p
                style={{
                  color: 'red',
                  margin: '6px 0 12px 0',
                  fontSize: '12px',
                }}
              >
                {errors.email.message}
              </p>
            )}
            <div style={{ marginTop: '32px' }}>
              <Controller
                name="country"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Dropdown
                    {...field}
                    ariaLabel="Select Country"
                    id="carbon-dropdown-example"
                    style={{ marginBottom: '48px', height: '48px' }}
                    items={options}
                    label="Select Country"
                    titleText="Select Country"
                    onChange={(selectedItem) =>
                      handleSelectChange(selectedItem)
                    }
                    initialSelectedItem={{ value: '', label: 'Select country' }}
                    selectedItem={selectedCountry}
                  />
                )}
              />
            </div>
            <br />
            <Button
              className="submit-btn"
              disabled={registerApi.isLoading}
              type="submit"
              renderIcon={ArrowRight}
            >
              Submit
            </Button>
          </Form>
        </Column>
      </Grid>
    </>
  );
};

export default RegisterForm;
