'use client';
import React, { useState } from 'react';
import { Column, Form, Grid, TextInput, Button, Dropdown } from '@carbon/react';
import { Controller, useForm } from 'react-hook-form';
import Web3Modal from '../congratulation-modal';
import { useContributeData } from '../../hooks/useContributeData';

const ContributeForm = () => {
  const contributeDataMutation = useContributeData();
  const { handleSubmit, control } = useForm();

  const [selectedOptions, setSelectedOptions] = useState({
    dropdown1: null,
    dropdown2: null,
    dropdown3: null,
    dropdown4: null,
    dropdown5: null,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onSubmit = (data) => {
    try {
      const formattedData = {
        contributed_data: JSON.stringify(data),
        contributedUserId: 'a8142989-516f-431f-8217-53f8dfe47398',
        school_Id: '7c5fe459-4f17-4806-8060-c0b8251cd982',
      };
      contributeDataMutation.mutate(formattedData);
      console.log(data);
      // openModal();
    } catch (error) {
      console.log('form submit', error);
    }
  };

  const typeOfSchool = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];

  const country = [
    { label: 'Nepal', value: 'nepal' },
    { label: 'Pakistan', value: 'pakistan' },
    { label: 'Camaroon', value: 'camaroon' },
  ];
  const connectivity = [
    { label: 'Good', value: 'good' },
    { label: 'Average', value: 'average' },
    { label: 'Poor', value: 'poor' },
  ];
  const coverageAvailability = [
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' },
  ];
  const electricityAvailability = [
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' },
  ];

  return (
    <>
      {/* INTRODUCTION */}
      <Grid fullWidth style={{ marginTop: '50px' }}>
        <Column md={4} lg={5} sm={4}>
          <span style={{ fontSize: '1.5em' }}>Introduction</span>
        </Column>
        <Column md={4} lg={8} sm={4} className="school-detail-card">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Dropdown
              id="dropdown1"
              titleText="Type of school"
              label="Select options"
              items={typeOfSchool}
              itemToString={(item) => (item ? item.label : '')}
              selectedItem={selectedOptions.typeOfSchool}
              onChange={(selectedItem) => {
                setSelectedOptions((prevOptions) => ({
                  ...prevOptions,
                  dropdown1: selectedItem,
                }));
                console.log('Selected Item 1:', selectedItem);
              }}
            />
            <Dropdown
              id="dropdown2"
              style={{ marginTop: '24px', marginBottom: '24px' }}
              titleText="Country"
              label="Select country"
              items={country}
              itemToString={(item) => (item ? item.label : '')}
              selectedItem={selectedOptions.country}
              onChange={(selectedItem) => {
                setSelectedOptions((prevOptions) => ({
                  ...prevOptions,
                  dropdown2: selectedItem,
                }));
                console.log('Selected Item 1:', selectedItem);
              }}
            />
            <Controller
              name="lat"
              control={control}
              render={({ field }) => (
                <>
                  <TextInput
                    {...field}
                    id="lat"
                    style={{ marginBottom: '25px', height: '48px' }}
                    labelText="Exact School's Location"
                    placeholder="Enter Latitude"
                  />
                </>
              )}
            />
            <Controller
              name="lon"
              control={control}
              render={({ field }) => (
                <>
                  <TextInput
                    {...field}
                    id="lon"
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
              items={connectivity}
              itemToString={(item) => (item ? item.label : '')}
              selectedItem={selectedOptions.connectivity}
              onChange={(selectedItem) => {
                setSelectedOptions((prevOptions) => ({
                  ...prevOptions,
                  dropdown3: selectedItem,
                }));
                console.log('Selected Item 1:', selectedItem);
              }}
            />
            <Dropdown
              id="dropdown4"
              style={{ marginTop: '24px', marginBottom: '24px' }}
              titleText="Coverage Availability"
              label="Select options"
              items={coverageAvailability}
              itemToString={(item) => (item ? item.label : '')}
              selectedItem={selectedOptions.coverageAvailability}
              onChange={(selectedItem) => {
                setSelectedOptions((prevOptions) => ({
                  ...prevOptions,
                  dropdown4: selectedItem,
                }));
                console.log('Selected Item 4:', selectedItem);
              }}
            />
            <Dropdown
              id="dropdown5"
              style={{ marginTop: '24px', marginBottom: '24px' }}
              titleText="Electricity Availability"
              label="Select electricity availability"
              items={electricityAvailability}
              itemToString={(item) => (item ? item.label : '')}
              selectedItem={selectedOptions.electricityAvailability}
              onChange={(selectedItem) => {
                setSelectedOptions((prevOptions) => ({
                  ...prevOptions,
                  dropdown5: selectedItem,
                }));
                console.log('Selected Item 5:', selectedItem);
              }}
            />

            <Button
              onClick={handleSubmit(onSubmit)}
              style={{ width: '100%', marginBottom: '24px' }}
            >
              Submit
            </Button>
          </Form>
        </Column>
        <Web3Modal isOpen={isModalOpen} onClose={closeModal} />
      </Grid>
    </>
  );
};

export default ContributeForm;
