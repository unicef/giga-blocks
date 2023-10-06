import React, { useState, useMemo } from 'react';
import { Form, TextInput, Button, Grid, Column, Dropdown } from '@carbon/react';
import './form.scss';
// import { useSchoolRegistration } from "../../app/api/school-register";
import { useRegistration } from '../../hooks/useRegistration';
import countryList from 'react-select-country-list';
import { ArrowRight } from '@carbon/icons-react';

const RegisterForm = () => {
  const registerApi = useRegistration();
  const options = useMemo(() => countryList().getData(), []);
  const [selectedCountry, setSelectedCountry] = useState({
    value: '',
    label: 'Select Country',
  });
  const [error, setError] = useState(undefined);

  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
  });
  const handleFormDataChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      ['country']: value.selectedItem.label,
    }));
    setSelectedCountry(value.selectedItem);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { isSuccess } = await registerApi.mutateAsync(formData);
      if (isSuccess) {
        setFormData({
          fullname: '',
          email: '',
        });
        setSelectedCountry({ value: '', label: 'Select country' });
      }
    } catch (error) {
      setError(error && error?.response?.data?.message);
    }
  };

  return (
    <>
      <Grid className="form-gap" fullWidth>
        <Column className="heading-col" md={4} lg={7} sm={4}>
          <h1 className="heading">
            Join the Developer Community Waiting List!
          </h1>
        </Column>
        <Column className="form" md={4} lg={8} sm={4}>
          <Form onSubmit={handleSubmit}>
            <TextInput
              id="fullname"
              name="fullname"
              onChange={handleFormDataChange}
              style={{ marginBottom: '25px', height: '48px' }}
              invalidText="Invalid error message."
              labelText="Name"
              value={formData.fullname}
              placeholder="Enter your fullname here"
            />
            <TextInput
              id="email"
              name="email"
              onChange={handleFormDataChange}
              style={{ marginBottom: '25px', height: '48px' }}
              invalidText="Invalid error message."
              labelText="Email"
              value={formData.email}
              placeholder="Enter you email here"
            />
            <Dropdown
              ariaLabel="Select Country"
              id="carbon-dropdown-example"
              style={{ marginBottom: '25px', height: '48px' }}
              items={options}
              label="Select Country"
              titleText="Select Country"
              onChange={(value) => handleSelectChange(value)}
              initialSelectedItem={{ value: '', label: 'Select country' }}
              selectedItem={selectedCountry}
            />
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
