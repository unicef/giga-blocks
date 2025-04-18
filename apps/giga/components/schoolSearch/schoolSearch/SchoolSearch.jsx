'use client';

import {
  ChevronLeft,
  ChevronRight,
  Filter,
  PageFirst,
  PageLast,
} from '@carbon/icons-react';
import {
  Button,
  ComboBox,
  RadioButton,
  RadioButtonGroup,
  Search,
  Select,
  SelectItem,
  Slider,
} from '@carbon/react';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSchoolGet } from '../../../app/hooks/useSchool';
import SchoolCard from '../../schoolCard/SchoolCard';
import './_schoolSearch.scss';
import countryList from '../../../app/data/country.json';

export default function SchoolSearch({ linkActivation }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get('page') || '1', 10);
  const perPage = parseInt(searchParams.get('perPage') || '10', 10);
  const searchTerm = searchParams.get('name') || '';
  const country = searchParams.get('country') || '';

  const { data: schools } = useSchoolGet(page, perPage, searchTerm, country);

  const totalPages = schools?.meta?.lastPage || 1;
  const filteredSchools = schools?.rows || [];
  const items = countryList;

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    params.set('perPage', perPage.toString());
    router.push(`/schools?${params.toString()}`, {
      scroll: false,
      shallow: true,
    });
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', '1');
    params.set('perPage', perPage.toString());
    params.set('name', value);
    router.push(`/schools?${params.toString()}`, {
      scroll: false,
      shallow: true,
    });
  };

  // Filters (you can later sync these with URL too)
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [numStudents, setNumStudents] = useState([0, 1000]);
  const [numTeachers, setNumTeachers] = useState([0, 1000]);
  const [numComputers, setNumComputers] = useState([0, 1000]);
  const [downloadSpeed, setDownloadSpeed] = useState([0, 1000]);
  const [connectivityStatus, setConnectivityStatus] = useState('all');
  const [activationStatus, setActivationStatus] = useState('all');
  const [connectionType, setConnectionType] = useState('all');
  const [electricityAvailability, setElectricityAvailability] = useState('all');
  const [waterAvailability, setWaterAvailability] = useState('all');

  const toggleFilter = () => setIsFilterOpen(!isFilterOpen);
  const resetFilters = () => {
    setNumStudents([0, 1000]);
    setNumTeachers([0, 1000]);
    setNumComputers([0, 1000]);
    setDownloadSpeed([0, 1000]);
    setConnectivityStatus('all');
    setActivationStatus('all');
    setConnectionType('all');
    setElectricityAvailability('all');
    setWaterAvailability('all');
  };

  const handleSubmit = () => {
    console.log({
      searchTerm,
      numStudents,
      numTeachers,
      numComputers,
      downloadSpeed,
      connectivityStatus,
      activationStatus,
      connectionType,
      electricityAvailability,
      waterAvailability,
    });
    setIsFilterOpen(false);
  };

  return (
    <div className="search-page">
      <div className="search-page__container">
        <div className="search-page__filters">
          <Search
            className="search-input"
            labelText="Search"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
          />

          <ComboBox
            id="carbon-combobox"
            items={items}
            itemToString={(item) => (item ? item.country : '')}
            titleText="Country"
            selectedItem={selectedCountry}
            onChange={({ selectedItem }) => {
              setSelectedCountry(selectedItem);
              const params = new URLSearchParams(searchParams.toString());
              params.set('page', '1');
              params.set('perPage', perPage.toString());
              if (selectedItem?.code) {
                params.set('country', selectedItem.code);
              } else {
                params.delete('country');
              }
              router.push(`/schools?${params.toString()}`, {
                scroll: false,
                shallow: true,
              });
            }}
          />

          <Select
            className="filter-select"
            id="education-select"
            labelText="Select Education Level"
            defaultValue="placeholder-item"
          >
            <SelectItem
              disabled
              hidden
              value="placeholder-item"
              text="Select Education Level"
            />
            <SelectItem value="primary" text="Primary" />
            <SelectItem value="secondary" text="Secondary" />
            <SelectItem value="tertiary" text="Tertiary" />
          </Select>

          <Button
            onClick={toggleFilter}
            className="filter-button controlled-accordion-btn"
            kind="ghost"
          >
            <Filter size={20} />
          </Button>
        </div>

        {/* Filter Accordion */}
        <div className={`filter-accordion ${isFilterOpen ? 'open' : ''}`}>
          <div className="filter-accordion__content">
            <div className="filter-accordion__sliders">
              {[
                {
                  label: 'Number of Students',
                  id: 'students-slider',
                  value: numStudents,
                  setter: setNumStudents,
                },
                {
                  label: 'Number of Teachers',
                  id: 'teachers-slider',
                  value: numTeachers,
                  setter: setNumTeachers,
                },
                {
                  label: 'Number of Computers',
                  id: 'computers-slider',
                  value: numComputers,
                  setter: setNumComputers,
                },
                {
                  label: 'Download Speed',
                  id: 'download-slider',
                  value: downloadSpeed,
                  setter: setDownloadSpeed,
                },
              ].map(({ label, id, value, setter }) => (
                <div className="filter-accordion__slider" key={id}>
                  <div className="filter-accordion__slider-container">
                    <Slider
                      id={id}
                      min={0}
                      max={1000}
                      value={value[1]}
                      onRelease={(val) => setter((prev) => [prev[0], val])}
                      labelText={label}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="filter-accordion__radio-groups">
              {/* RADIO GROUPS.) */}
            </div>

            <div className="filter-accordion__actions">
              <Button kind="secondary" onClick={() => setIsFilterOpen(false)}>
                Cancel
              </Button>
              <Button kind="tertiary" onClick={resetFilters}>
                Reset All
              </Button>
              <Button onClick={handleSubmit}>Activate</Button>
            </div>
          </div>
        </div>

        <div className="search-page__results-count">
          {schools?.meta?.total} Schools found
        </div>

        <div className="search-page__grid">
          {filteredSchools?.map((school) => (
            <SchoolCard
              key={school.id}
              id={school.id}
              schoolName={school.name}
              location={school.region_name}
              minted={school.minted}
              hasImage={school.hasImage}
              imageHash={school.imageHash}
              linkActivation={linkActivation}
            />
          ))}
        </div>

        <div className="search-page__pagination">
          <button
            className="search-page__pagination-button"
            onClick={() => handlePageChange(1)}
            disabled={page === 1}
          >
            <PageFirst />
          </button>

          <button
            className="search-page__pagination-button"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            <ChevronLeft />
          </button>

          <span className="search-page__pagination-info">
            Page {page} of {totalPages}
          </span>

          <button
            className="search-page__pagination-button"
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
          >
            <ChevronRight />
          </button>

          <button
            className="search-page__pagination-button"
            onClick={() => handlePageChange(totalPages)}
            disabled={page === totalPages}
          >
            <PageLast />
          </button>
        </div>
      </div>
    </div>
  );
}
