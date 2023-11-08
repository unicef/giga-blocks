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
      setValue('latitude', data.latitude);
      setValue('longitude', data.longitude);
      setValue('country', data.country);
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
      const contributedData = {
        school_type: selectedOptions?.dropdown1?.selectedItem?.value,
        country: data.country,
        latitude: data.lat,
        longitude: data.lon,
        connectivity: selectedOptions.dropdown3?.selectedItem?.value,
        coverage_availability: selectedOptions.dropdown4?.selectedItem?.value,
        electricity_available: selectedOptions.dropdown5?.selectedItem?.value,
      };
      const formattedData = {
        contributed_data: JSON.stringify(contributedData),
        school_Id: id,
      };
      openModal();
      contributeDataMutation.mutate(formattedData);
    } catch (error) {}
  };

  const school_type = [
    { label: 'Private', value: 'private' },
    { label: 'Public', value: 'public' },
  ];
  const connectivity = [
    { label: 'True', value: 'true' },
    { label: 'False', value: 'false' },
  ];
  const coverage_availability = [
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' },
  ];
  const electricity_available = [
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
              style={{ marginBottom: '25px' }}
              label={data?.school_type === 'private' ? 'Private' : 'Public'}
              items={school_type}
              itemToString={(item) => (item ? item.label : '')}
              selectedItem={selectedOptions.school_type}
              onChange={(selectedItem) => {
                setSelectedOptions((prevOptions) => ({
                  ...prevOptions,
                  dropdown1: selectedItem,
                }));
              }}
            />
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <>
                  <TextInput
                    {...field}
                    id="country"
                    style={{ marginBottom: '25px', height: '48px' }}
                    labelText="School Country"
                    placeholder="Enter Country"
                  />
                </>
              )}
            />
            <Controller
              name="latitude"
              control={control}
              render={({ field }) => (
                <>
                  <TextInput
                    {...field}
                    id="latitude"
                    style={{ marginBottom: '25px', height: '48px' }}
                    labelText="Exact School's Location"
                    placeholder="Enter Latitude"
                  />
                </>
              )}
            />
            <Controller
              name="longitude"
              control={control}
              render={({ field }) => (
                <>
                  <TextInput
                    {...field}
                    id="longitude"
                    style={{ marginBottom: '25px', height: '48px' }}
                    placeholder="Enter Longitude"
                  />
                </>
              )}
            />
            <Dropdown
              id="connectivity"
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
              items={coverage_availability}
              itemToString={(item) => (item ? item.label : '')}
              selectedItem={selectedOptions.coverage_availability}
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
              items={electricity_available}
              itemToString={(item) => (item ? item.label : '')}
              selectedItem={selectedOptions.electricity_available}
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
