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
  const dropdownOptions3 = [
    { label: 'Choice A', value: 'choiceA' },
    { label: 'Choice B', value: 'choiceB' },
    { label: 'Choice C', value: 'choiceC' },
  ];
  const dropdownOptions4 = [
    { label: 'Choice A', value: 'choiceA' },
    { label: 'Choice B', value: 'choiceB' },
    { label: 'Choice C', value: 'choiceC' },
  ];
  const dropdownOptions5 = [
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
            <Dropdown
              id="dropdown1"
              titleText="Type of school"
              label="Select options"
              items={dropdownOptions1}
              itemToString={(item) => (item ? item.label : '')}
              selectedItem={null}
              onChange={(selectedItem) => {
                console.log('Selected Item 1:', selectedItem);
              }}
            />
            <Dropdown
              id="dropdown2"
              style={{ marginTop: '24px', marginBottom: '24px' }}
              titleText="Country"
              label="Select country"
              items={dropdownOptions2}
              itemToString={(item) => (item ? item.label : '')}
              selectedItem={null}
              onChange={(selectedItem) => {
                console.log('Selected Item 2:', selectedItem);
              }}
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
            <Dropdown
              id="dropdown3"
              style={{ marginBottom: '24px' }}
              titleText="Connectivity"
              label="Select connectivity"
              items={dropdownOptions3}
              itemToString={(item) => (item ? item.label : '')}
              selectedItem={null}
              onChange={(selectedItem) => {
                console.log('Selected Item 3:', selectedItem);
              }}
            />
            <Dropdown
              id="dropdown4"
              style={{ marginTop: '24px', marginBottom: '24px' }}
              titleText="Coverage Availability"
              label="Select options"
              items={dropdownOptions4}
              itemToString={(item) => (item ? item.label : '')}
              selectedItem={null}
              onChange={(selectedItem) => {
                console.log('Selected Item 2:', selectedItem);
              }}
            />
            <Dropdown
              id="dropdown5"
              style={{ marginTop: '24px', marginBottom: '24px' }}
              titleText="Electricity Availability"
              label="Select electricity availability"
              items={dropdownOptions5}
              itemToString={(item) => (item ? item.label : '')}
              selectedItem={null}
              onChange={(selectedItem) => {
                console.log('Selected Item 2:', selectedItem);
              }}
            />

            <Button style={{ width: '100%', marginBottom: '24px' }}>
              Submit
            </Button>
          </Form>
        </Column>
      </Grid>
    </>
  );
};

export default ContributeForm;
