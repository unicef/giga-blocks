import React from 'react';
import Heading from '../school-detail/heading';
import { Column, Form, Grid, TextInput, Button, Dropdown } from '@carbon/react';
import { Controller, useForm } from 'react-hook-form';

const ContributeForm = () => {
  const { handleSubmit, control } = useForm(); // Initialize the useForm hook here

  const onSubmit = (data) => {
    console.log('Submitted data:', data);
  };

  const dropdownOptions1 = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];

  const dropdownOptions2 = [
    { label: 'Choice A', value: 'choiceA' },
    { label: 'Choice B', value: 'choiceB' },
    { label: 'Choice C', value: 'choiceC' },
  ];

  return (
    <>
      <Heading schoolData="School" />
      {/* INTRODUCTION */}
      <Grid fullWidth className="mt-50px">
        <Column md={4} lg={5} sm={4}>
          <span style={{ fontSize: '1.5em' }}>Introduction</span>
        </Column>
        <Column md={4} lg={8} sm={4} className="school-detail-card">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="name"
              control={control} // Pass control to the Controller component
              rules={{ required: 'Full Name is required' }}
              render={({ field }) => (
                <TextInput
                  {...field}
                  id="name"
                  style={{ marginBottom: '25px', height: '48px' }}
                  labelText="Full Name"
                  placeholder="Enter your fullname here"
                />
              )}
            />
            <Controller
              name="address"
              control={control} // Pass control to the Controller component
              rules={{ required: 'Enter school address' }}
              render={({ field }) => (
                <TextInput
                  {...field}
                  id="address"
                  style={{ marginBottom: '25px', height: '48px' }}
                  labelText="Physical Address/ Nearest Settlement"
                  placeholder="Enter school address"
                />
              )}
            />
            <Controller
              name="longlat"
              control={control} // Pass control to the Controller component
              rules={{ required: 'Full Name is required' }}
              render={({ field }) => (
                <>
                  <TextInput
                    {...field}
                    id="longlat"
                    style={{ marginBottom: '25px', height: '48px' }}
                    labelText="Exact School's Location"
                    placeholder="Enter Latitude"
                  />
                  <TextInput
                    {...field}
                    id="longlat"
                    style={{ marginBottom: '25px', height: '48px' }}
                    placeholder="Enter Longitude"
                  />
                </>
              )}
            />
            <Controller
              name="status"
              control={control} // Pass control to the Controller component
              rules={{ required: 'Enter school status' }}
              render={({ field }) => (
                <TextInput
                  {...field}
                  id="status"
                  style={{ marginBottom: '25px', height: '48px' }}
                  labelText="School Status"
                  placeholder="Enter school status"
                />
              )}
            />
          </Form>
        </Column>
      </Grid>

      {/* EDUCATION */}
      <Grid fullWidth className="mt-50px">
        <Column md={4} lg={5} sm={4}>
          <span style={{ fontSize: '1.5em' }}>Education</span>
        </Column>
        <Column md={4} lg={8} sm={4} className="school-detail-card">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Dropdown
              id="dropdown1"
              titleText="Select Option 1"
              label="Select an option"
              items={dropdownOptions1}
              itemToString={(item) => (item ? item.label : '')}
              selectedItem={null} // You can set the default selected item here if needed
              onChange={(selectedItem) => {
                // Handle dropdown item selection here
                console.log('Selected Item 1:', selectedItem);
              }}
            />
            <Dropdown
              id="dropdown2"
              titleText="Select Option 2"
              label="Select another option"
              items={dropdownOptions2}
              itemToString={(item) => (item ? item.label : '')}
              selectedItem={null} // You can set the default selected item here if needed
              onChange={(selectedItem) => {
                // Handle dropdown item selection here
                console.log('Selected Item 2:', selectedItem);
              }}
            />
          </Form>
        </Column>
      </Grid>
      {/* CONNECTIVITY */}
      <Grid fullWidth className="mt-50px">
        <Column md={4} lg={5} sm={4}>
          <span style={{ fontSize: '1.5em' }}>Connectivity</span>
        </Column>
        <Column md={4} lg={8} sm={4} className="school-detail-card">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="connectivityStatus"
              control={control} // Pass control to the Controller component
              render={({ field }) => (
                <TextInput
                  {...field}
                  id="connectivityStatus"
                  style={{ marginBottom: '25px', height: '48px' }}
                  labelText="Connectivity Status"
                  placeholder="Enter connectivity status here"
                />
              )}
            />
            <Controller
              name="coverageAvailability"
              control={control} // Pass control to the Controller component
              rules={{ required: 'Enter school coverage availability' }}
              render={({ field }) => (
                <TextInput
                  {...field}
                  id="coverageAvailability"
                  style={{ marginBottom: '25px', height: '48px' }}
                  labelText="Coverage Availability"
                  placeholder="Enter school coverage availability"
                />
              )}
            />
            <Controller
              name="2gCovergage"
              control={control} // Pass control to the Controller component
              render={({ field }) => (
                <>
                  <TextInput
                    {...field}
                    id="2gCovergage"
                    style={{ marginBottom: '25px', height: '48px' }}
                    labelText="2G Coverage"
                    placeholder="Enter 2G Coverage"
                  />
                </>
              )}
            />
            <Controller
              name="3gCoverage"
              control={control} // Pass control to the Controller component
              render={({ field }) => (
                <>
                  <TextInput
                    {...field}
                    id="3gCoverage"
                    style={{ marginBottom: '25px', height: '48px' }}
                    labelText="3G Coverage"
                    placeholder="Enter 3G Coverage"
                  />
                </>
              )}
            />
            <Controller
              name="4gCoverage"
              control={control} // Pass control to the Controller component
              render={({ field }) => (
                <>
                  <TextInput
                    {...field}
                    id="4gCoverage"
                    style={{ marginBottom: '25px', height: '48px' }}
                    labelText="4G Coverage"
                    placeholder="Enter 4G Coverage"
                  />
                </>
              )}
            />
          </Form>
          <Column md={4} lg={16} sm={4}>
            <Button
              type="submit"
              style={{ width: '100%', marginBottom: '32px' }}
            >
              Submit
            </Button>
          </Column>
        </Column>
      </Grid>
    </>
  );
};

export default ContributeForm;
