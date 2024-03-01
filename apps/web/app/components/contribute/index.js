'use client';
import React, { useEffect, useState } from 'react';
import { TextInput, Button } from '@carbon/react';
import { Controller, useForm } from 'react-hook-form';
import Web3Modal from '../congratulation-modal';
import { useContributeData } from '../../hooks/useContributeData';
import { useCountryName } from '../../hooks/useCountryName';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { Modal, ModalBody } from '@carbon/react';
import Map from '../../components/dragableMarker';
import './contribute.scss';

const ContributeForm = ({
  data,
  isOpen,
  onClose,
  updateSelectedTabIndex,
  refetch,
}) => {
  const router = useRouter();
  const contributeDataMutation = useContributeData();
  const { control, setValue } = useForm();
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

  const handleFormSubmit = (e) => {
    e.preventDefault()
    const formData = {
      schoolType: e.target['schoolType'].value,
      country: countryName.data,
      latitude: markerCoords.lat,
      longitude: markerCoords.long,
      connectivity: e.target['connectivity'].value === 'true',
      coverage_availability: e.target['coverage'].value === 'true',
      electricity_available: e.target['electricity'].value === 'true',
    }
    
    try {
      setError(false);
      const changedData = {};

      if (
        formData?.schoolType !== data.school_type
      ) {
        changedData.school_type =
        formData?.schoolType;
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
        formData?.connectivity !== data.connectivity
      ) {
        changedData.connectivity =
        formData?.connectivity;
      }
      if (
        formData?.coverage_availability !==
        data.coverage_availability
      ) {
        changedData.coverage_availability =
        formData?.coverage_availability;
      }

      if (
        formData?.electricity_available !==
        data.electricity_available
      ) {
        changedData.electricity_available =
        formData?.electricity_available;
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

  }

  return (
    <>
      {/* INTRODUCTION */}
      <Modal open={isOpen} onRequestClose={onClose} passiveModal={true}>
        <h1 style={{ marginBottom: '24px' }}>
          Contribute Data for {`${data?.name}`}
        </h1>
        <ModalBody>
          {typeof(data?.school_type) === 'string' && <form
          onSubmit={handleFormSubmit}
          >
            <p style={{ fontSize: '0.75rem', color: '#525252' }}>
              School Type
            </p>
            <div style={{display: 'flex', gap: '50px', marginTop: '5px'}}>
            <div style={{display: 'flex', alignItems: 'center'}}>
            <input type='radio' defaultChecked={data?.school_type === 'public' ? true : false} name="schoolType" value={'public'}/>
            <label>Public</label>
            </div>
            <div style={{display: 'flex', alignItems: 'center'}}>
            <input type='radio' defaultChecked={data?.school_type === 'private' ? true : false} name="schoolType" value={'private'}/>
            <label>Private</label>
            </div>
            </div>

            <p style={{ fontSize: '0.75rem', color: '#525252', marginTop: '30px' }}>
              School Location
            </p>
            <p
              style={{
                fontSize: '0.75rem',
                color: '#525252',
                paddintTop: '12px',
                paddingBottom: '12px',
              }}
            >
              Click and drag the pin on the map to select/change school
              location.
            </p>
            <Map
              lat={markerCoords.lat}
              long={markerCoords.long}
              onMarkerDragEnd={handleMarkerDragEnd}
            />
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
              }}
            >
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
                      labelText="Latitude"
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
                      labelText="Longitude"
                      style={{
                        marginBottom: '25px',
                        height: '48px',
                      }}
                      placeholder="Enter Longitude"
                    />
                  </>
                )}
              />
            </div>
            <p style={{ fontSize: '0.75rem', color: '#525252', marginTop: '30px'  }}>
              Connectivity
            </p>
            <div style={{display: 'flex', gap: '50px', marginTop: '5px'}}>
            <div style={{display: 'flex', alignItems: 'center'}}>
            <input type='radio' defaultChecked={data?.connectivity == true} name="connectivity" value={true}/>
            <label>Yes</label>
            </div>
            <div style={{display: 'flex', alignItems: 'center'}}>
            <input type='radio' defaultChecked={data?.connectivity == false} name="connectivity" value={false}/>
            <label>No</label>
            </div>
            </div>
            <p style={{ fontSize: '0.75rem', color: '#525252', marginTop: '30px' }}>
            Coverage Availability
            </p>
            <div style={{display: 'flex', gap: '50px', marginTop: '5px'}}>
            <div style={{display: 'flex', alignItems: 'center'}}>
            <input type='radio' defaultChecked={data?.coverage_availability == true} name="coverage" value={true}/>
            <label>Yes</label>
            </div>
            <div style={{display: 'flex', alignItems: 'center'}}>
            <input type='radio' defaultChecked={data?.coverage_availability == false} name="coverage" value={false}/>
            <label>No</label>
            </div>
            </div>
            <p style={{ fontSize: '0.75rem', color: '#525252', marginTop: '30px'  }}>
            Electricity Availability
            </p>
            <div style={{display: 'flex', gap: '50px', marginTop: '5px'}}>
            <div style={{display: 'flex', alignItems: 'center'}}>
            <input type='radio' defaultChecked={data?.electricity_available === true} name="electricity" value={true}/>
            <label>Yes</label>
            </div>
            <div style={{display: 'flex', alignItems: 'center'}}>
            <input type='radio' defaultChecked={data?.electricity_available === false} name="electricity" value={false}/>
            <label>No</label>
            </div>
            </div>
            {error && (
              <p style={{ color: 'red' }}>
                * Please make changes to school data before submitting
              </p>
            )}
            <div style={{marginTop: '15px'}}>
            <Button type='submit' style={{ width: '100%' }}>
          Contribute Now
        </Button>
        </div>
          </form>}
        </ModalBody>
        
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