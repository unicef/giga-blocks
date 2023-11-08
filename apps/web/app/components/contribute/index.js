'use client';
import React, { useEffect, useState } from 'react';
import { Column, Form, Grid, TextInput, Button, Dropdown } from '@carbon/react';
import { Controller, useForm } from 'react-hook-form';
import Web3Modal from '../congratulation-modal';
import { useContributeData } from '../../hooks/useContributeData';
import { useParams } from 'next/navigation';
import { useSchoolDetails } from '../../hooks/useSchool';

const ContributeForm = () => {
  const contributeDataMutation = useContributeData();
  const { handleSubmit, control, setValue } = useForm();
  const { id } = useParams();
  const { data } = useSchoolDetails(id);
  const [selectedOptions, setSelectedOptions] = useState({});

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (data) {
      setValue('lat', data.latitude);
      setValue('lon', data.longitude);
    }
  }, [data]);

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
        school_Id: id,
      };
      openModal();
      contributeDataMutation.mutate(formattedData);
    } catch (error) {}
  };

  const typeOfSchool = [
    { label: 'Private', value: 'private' },
    { label: 'Public', value: 'public' },
  ];

  const country = [
    { label: 'Nepal', value: 'nepal' },
    { label: 'Pakistan', value: 'pakistan' },
    { label: 'Camaroon', value: 'camaroon' },
  ];
  const connectivity = [
    { label: 'True', value: 'true' },
    { label: 'False', value: 'false' },
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
              label={data?.school_type}
              items={typeOfSchool}
              itemToString={(item) => (item ? item.label : '')}
              selectedItem={selectedOptions.typeOfSchool}
              onChange={(selectedItem) => {
                setSelectedOptions((prevOptions) => ({
                  ...prevOptions,
                  dropdown1: selectedItem,
                }));
              }}
            />
            <Dropdown
              id="dropdown2"
              style={{ marginTop: '24px', marginBottom: '24px' }}
              titleText="Country"
              label={data?.country}
              items={country}
              itemToString={(item) => (item ? item.label : '')}
              selectedItem={selectedOptions.country}
              onChange={(selectedItem) => {
                setSelectedOptions((prevOptions) => ({
                  ...prevOptions,
                  dropdown2: selectedItem,
                }));
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
              label={data?.connectivity ? 'True' : 'False'}
              items={connectivity}
              itemToString={(item) => (item ? item.label : '')}
              selectedItem={selectedOptions.connectivity}
              onChange={(selectedItem) => {
                setSelectedOptions((prevOptions) => ({
                  ...prevOptions,
                  dropdown3: selectedItem,
                }));
              }}
            />
            <Dropdown
              id="dropdown4"
              style={{ marginTop: '24px', marginBottom: '24px' }}
              titleText="Coverage Availability"
              label={data?.coverage_availability}
              items={coverageAvailability}
              itemToString={(item) => (item ? item.label : '')}
              selectedItem={selectedOptions.coverageAvailability}
              onChange={(selectedItem) => {
                setSelectedOptions((prevOptions) => ({
                  ...prevOptions,
                  dropdown4: selectedItem,
                }));
              }}
            />
            <Dropdown
              id="dropdown5"
              style={{ marginTop: '24px', marginBottom: '24px' }}
              titleText="Electricity Availability"
              label={data?.electricity_available ? 'Yes' : 'No'}
              items={electricityAvailability}
              itemToString={(item) => (item ? item.label : '')}
              selectedItem={selectedOptions.electricityAvailability}
              onChange={(selectedItem) => {
                setSelectedOptions((prevOptions) => ({
                  ...prevOptions,
                  dropdown5: selectedItem,
                }));
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
