'use client';
import React, { useEffect, useState } from 'react';
import {
  Column,
  Form,
  Grid,
  TextInput,
  Button,
  Dropdown,
  ModalHeader,
} from '@carbon/react';
import { Controller, useForm } from 'react-hook-form';
import Web3Modal from '../congratulation-modal';
import { useContributeData } from '../../hooks/useContributeData';
import { useParams } from 'next/navigation';
import { useSchoolDetails } from '../../hooks/useSchool';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '../../utils/sessionManager';
import { Modal, ModalBody, ModalFooter } from '@carbon/react';

const ContributeForm = ({ data, isOpen, onClose }) => {
  const router = useRouter();
  const contributeDataMutation = useContributeData();
  const { handleSubmit, control, setValue } = useForm();
  const { id } = useParams();
  const [selectedOptions, setSelectedOptions] = useState({});
  const [error, setError] = useState(false);
  const user = getCurrentUser();

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push('/signIn');
    }
    if (data) {
      setValue('latitude', data.latitude);
      setValue('longitude', data.longitude);
      setValue('country', data.country);
    }
  }, [data, user, router]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    router.push('/');
    setIsModalOpen(false);
  };

  const onSubmit = (data) => {
    try {
      setError(false);
      const changedData = {};

      if (
        selectedOptions?.dropdown1?.selectedItem?.value !== data.school_type
      ) {
        changedData.school_type =
          selectedOptions?.dropdown1?.selectedItem?.value;
      }

      if (data.country !== data.country) {
        changedData.country = data.country;
      }

      if (data.lat !== data.lat) {
        changedData.latitude = data.lat;
      }

      if (data.lon !== data.lon) {
        changedData.longitude = data.lon;
      }

      if (
        selectedOptions.dropdown3?.selectedItem?.value !== data.connectivity
      ) {
        changedData.connectivity =
          selectedOptions.dropdown3?.selectedItem?.value;
      }

      if (
        selectedOptions.dropdown4?.selectedItem?.value !==
        data.coverageAvailability
      ) {
        changedData.coverage_availability =
          selectedOptions.dropdown4?.selectedItem?.value;
      }

      if (
        selectedOptions.dropdown5?.selectedItem?.value !==
        data.electricityAvailability
      ) {
        changedData.electricity_available =
          selectedOptions.dropdown5?.selectedItem?.value;
      }
      if (!Object.keys(changedData).length) {
        setError(true);
        return;
      }

      if (Object.keys(changedData).length > 0) {
        const formattedData = {
          contributed_data: JSON.stringify(changedData),
          school_Id: id,
        };
        contributeDataMutation.mutate(formattedData);
      }
      openModal();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
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
      <Modal open={isOpen} onRequestClose={onClose} passiveModal={true}>
        <ModalHeader>
          <h1>Contribute Data for {`${data.name}`}</h1>
        </ModalHeader>
        <ModalBody>
          <Grid fullWidth style={{ marginTop: '20px' }}>
            <Column md={4} lg={12} sm={4} className="school-detail-card">
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
                    setError(false);
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
                    setError(false);
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
                    setError(false);
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
                    setError(false);
                  }}
                />
                {error && (
                  <p style={{ color: 'red' }}>
                    ** Please make changes to school data before submitting
                  </p>
                )}
                <Button
                  onClick={handleSubmit(onSubmit)}
                  style={{ width: '100%', marginBottom: '24px' }}
                >
                  Submit
                </Button>
              </Form>
            </Column>
          </Grid>
        </ModalBody>
      </Modal>
      <Web3Modal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default ContributeForm;
