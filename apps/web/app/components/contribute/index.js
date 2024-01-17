'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { Form, TextInput, Button, Dropdown } from '@carbon/react';
import { Controller, useForm } from 'react-hook-form';
import Web3Modal from '../congratulation-modal';
import { useContributeData } from '../../hooks/useContributeData';
import { useCountryName } from '../../hooks/useCountryName';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { Modal, ModalBody } from '@carbon/react';
import Map from '../../components/dragableMarker';

const ContributeForm = ({
  data,
  isOpen,
  onClose,
  updateSelectedTabIndex,
  refetch,
}) => {
  const router = useRouter();
  const contributeDataMutation = useContributeData();
  const { handleSubmit, control, setValue } = useForm();
  const { id } = useParams();
  const [selectedOptions, setSelectedOptions] = useState({});
  const [error, setError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [markerCoords, setMarkerCoords] = useState({
    lat: data.latitude,
    long: data.longitude,
  });
  const countryName = useCountryName(markerCoords.lat, markerCoords.long);

  const handleMarkerDragEnd = (lngLat) => {
    setMarkerCoords({ lat: lngLat.lat, long: lngLat.lng });
  };

  useEffect(() => {
    setValue('latitude', markerCoords.lat);
    setValue('longitude', markerCoords.long);
  }, [markerCoords, setValue]);

  useEffect(() => {
    setValue('latitude', markerCoords.lat);
    setValue('longitude', markerCoords.long);
    if (countryName.data) {
      setValue('country', countryName.data);
    }
  }, [markerCoords, setValue, countryName.data]);

  const setDefaultValues = () => {
    setValue('latitude', data.latitude);
    setValue('longitude', data.longitude);
    setValue('country', data.country);
    setSelectedOptions({
      dropdown1: { selectedItem: { value: data?.school_type } },
      dropdown3: { selectedItem: { value: data?.connectivity } },
      dropdown4: { selectedItem: { value: data?.coverage_availability } },
      dropdown5: { selectedItem: { value: data?.electricity_available } },
    });
  };

  useEffect(() => {
    if (
      data &&
      (!selectedOptions.dropdown1 ||
        (!selectedOptions.dropdown1.selectedItem.value &&
          !selectedOptions.dropdown3) ||
        (!selectedOptions.dropdown3.selectedItem.value &&
          !selectedOptions.dropdown4) ||
        (!selectedOptions.dropdown4.selectedItem.value &&
          !selectedOptions.dropdown5) ||
        !selectedOptions.dropdown5.selectedItem.value)
    ) {
      setValue('latitude', data.latitude);
      setValue('longitude', data.longitude);
      setValue('country', data.country);
      setSelectedOptions({
        dropdown1: { selectedItem: { value: data?.school_type } },
        dropdown3: { selectedItem: { value: data?.connectivity } },
        dropdown4: { selectedItem: { value: data?.coverage_availability } },
        dropdown5: { selectedItem: { value: data?.electricity_available } },
      });
    }
  }, [data, router]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    refetch();
    setIsModalOpen(false);
  };

  const handleModalClose = () => {
    refetch();
    onClose();
    updateSelectedTabIndex({ selectedIndex: 1 });
  };

  const onSubmit = (formData) => {
    try {
      setError(false);
      const changedData = {};

      if (
        selectedOptions?.dropdown1?.selectedItem?.value !== data.school_type
      ) {
        changedData.school_type =
          selectedOptions?.dropdown1?.selectedItem?.value;
      }
      if (formData.country !== data.country) {
        changedData.country = countryName.data;
      }

      if (Number(formData.latitude) !== Number(data.latitude)) {
        changedData.latitude = Number(formData.latitude);
      }

      if (Number(formData.longitude) !== Number(data.longitude)) {
        changedData.longitude = Number(formData.longitude);
      }
      if (
        selectedOptions.dropdown3?.selectedItem?.value !== data.connectivity
      ) {
        changedData.connectivity =
          selectedOptions.dropdown3?.selectedItem?.value;
      }
      if (
        selectedOptions.dropdown4?.selectedItem?.value !==
        data.coverage_availability
      ) {
        changedData.coverage_availability =
          selectedOptions.dropdown4?.selectedItem?.value;
      }

      if (
        selectedOptions.dropdown5?.selectedItem?.value !==
        data.electricity_available
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
        setDefaultValues();
      }
      onClose();
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
    { label: 'Yes', value: true },
    { label: 'No', value: false },
  ];
  const coverage_availability = [
    { label: 'Yes', value: true },
    { label: 'No', value: false },
  ];
  const electricity_available = [
    { label: 'Yes', value: true },
    { label: 'No', value: false },
  ];

  return (
    <>
      {/* INTRODUCTION */}
      <Modal open={isOpen} onRequestClose={onClose} passiveModal={true}>
        <h1 style={{ marginBottom: '24px' }}>
          Contribute Data for {`${data?.name}`}
        </h1>
        <ModalBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Dropdown
              id="dropdown1"
              titleText="Type of school"
              style={{ marginBottom: '25px' }}
              label={
                data?.school_type === 'private' ||
                data?.school_type === 'Private'
                  ? 'Private'
                  : 'Public'
              }
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
              disabled
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
            <Map
              lat={markerCoords.lat}
              long={markerCoords.long}
              onMarkerDragEnd={handleMarkerDragEnd}
            />

            <Controller
              name="latitude"
              control={control}
              disabled
              render={({ field }) => (
                <>
                  <TextInput
                    {...field}
                    id="latitude"
                    style={{
                      marginBottom: '25px',
                      height: '48px',
                    }}
                    labelText="Exact School's Location"
                    placeholder="Enter Latitude"
                  />
                </>
              )}
            />
            <Controller
              name="longitude"
              control={control}
              disabled
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
              label={data?.connectivity ? 'Yes' : 'No'}
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
              label={data?.coverage_availability ? 'Yes' : 'No'}
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
                * Please make changes to school data before submitting
              </p>
            )}
          </Form>
        </ModalBody>
        <Button onClick={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          Contribute Now
        </Button>
      </Modal>
      <Web3Modal
        id={id}
        isOpen={isModalOpen}
        onClose={closeModal}
        onTabChange={handleModalClose}
      />
    </>
  );
};

export default ContributeForm;
