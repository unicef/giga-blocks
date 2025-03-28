'use client';

import {
  ChevronLeft,
  ChevronRight,
  Filter,
  PageFirst,
  PageLast,
} from '@carbon/icons-react';
import {
  Search,
  Select,
  SelectItem,
  Button,
  Slider,
  RadioButtonGroup,
  RadioButton,
} from '@carbon/react';
import { useEffect, useState } from 'react';
import SchoolCard from '../../schoolCard/SchoolCard';
import './_schoolSearch.scss';
import { useSchoolGet } from '../../../app/hooks/useSchool';
import { useSchoolDetails } from '../../../app/hooks/useSchool';

export default function SchoolSearch() {
  const page = 1; // Ensure this is always defined
  const perPage = 10; // Ensure this is always defined

  const [searchTerm, setSearchTerm] = useState('Evergreen');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { data } = useSchoolGet(page, perPage);
  console.log('data', data);

  // Filter state
  const [numStudents, setNumStudents] = useState([0, 1000]);
  const [numTeachers, setNumTeachers] = useState([0, 1000]);
  const [numComputers, setNumComputers] = useState([0, 1000]);
  const [downloadSpeed, setDownloadSpeed] = useState([0, 1000]);
  const [connectivityStatus, setConnectivityStatus] = useState('all');
  const [activationStatus, setActivationStatus] = useState('all');
  const [connectionType, setConnectionType] = useState('all');
  const [electricityAvailability, setElectricityAvailability] = useState('all');
  const [waterAvailability, setWaterAvailability] = useState('all');

  // Toggle filter accordion
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  // Reset all filters
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

  // sample data
  const schools = [
    {
      id: 1,
      name: 'Evergreen Academy for Advanced Scientific and Holistic Learning Experience',
      location: 'South Africa',
      activated: true,
      hasImage: true,
    },
    {
      id: 2,
      name: 'Evergreen Academy for Advanced Scientific and Holistic Learning Experience',
      location: 'South Africa',
      activated: false,
      hasImage: false,
    },
    {
      id: 3,
      name: 'Evergreen Academy for Advanced Scientific and Holistic Learning Experience',
      location: 'South Africa',
      activated: true,
      hasImage: true,
    },
    {
      id: 4,
      name: 'Evergreen Academy for Advanced Scientific and Holistic Learning Experience',
      location: 'South Africa',
      activated: true,
      hasImage: true,
    },
    {
      id: 5,
      name: 'Evergreen Academy for Advanced Scientific and Holistic Learning Experience',
      location: 'South Africa',
      activated: false,
      hasImage: false,
    },
    {
      id: 6,
      name: 'Evergreen Academy for Advanced Scientific and Holistic Learning Experience',
      location: 'South Africa',
      activated: false,
      hasImage: false,
    },
    {
      id: 7,
      name: 'Evergreen Academy for Advanced Scientific and Holistic Learning Experience',
      location: 'South Africa',
      activated: true,
      hasImage: true,
    },
    {
      id: 8,
      name: 'Evergreen Academy for Advanced Scientific and Holistic Learning Experience',
      location: 'South Africa',
      activated: true,
      hasImage: true,
    },
  ];

  return (
    <div className="search-page">
      <div className="search-page__container">
        <div className="search-page__filters">
          <Search
            className="search-input"
            labelText="Search"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="md"
          />

          <Select
            className="filter-select"
            id="country-select"
            labelText="Select Country"
            defaultValue="placeholder-item"
            size="md"
          >
            <SelectItem
              disabled
              hidden
              value="placeholder-item"
              text="Select Country"
            />
            <SelectItem value="south-africa" text="South Africa" />
            <SelectItem value="kenya" text="Kenya" />
            <SelectItem value="nigeria" text="Nigeria" />
          </Select>

          <Select
            className="filter-select"
            id="education-select"
            labelText="Select Education Level"
            defaultValue="placeholder-item"
            size="md"
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

        <div className={`filter-accordion ${isFilterOpen ? 'open' : ''}`}>
          <div className="filter-accordion__content">
            <div className="filter-accordion__sliders">
              <div className="filter-accordion__slider">
                <div className="filter-accordion__slider-container">
                  <Slider
                    id="students-slider"
                    min={0}
                    max={1000}
                    value={numStudents[1]}
                    onRelease={({ value }) =>
                      setNumStudents((prev) => [prev[0], value])
                    }
                    labelText="Number of Students"
                  />
                </div>
              </div>

              <div className="filter-accordion__slider">
                <div className="filter-accordion__slider-container">
                  <Slider
                    id="teachers-slider"
                    min={0}
                    max={1000}
                    value={numTeachers[1]}
                    onRelease={(val) =>
                      setNumTeachers((prev) => [prev[0], val])
                    }
                    labelText="Number of Teachers"
                  />
                </div>
              </div>

              <div className="filter-accordion__slider">
                <div className="filter-accordion__slider-container">
                  <Slider
                    id="computers-slider"
                    min={0}
                    max={1000}
                    value={numComputers[1]}
                    onRelease={(val) =>
                      setNumComputers((prev) => [prev[0], val])
                    }
                    labelText="Number of Computers"
                  />
                </div>
              </div>

              <div className="filter-accordion__slider">
                <div className="filter-accordion__slider-container">
                  <Slider
                    id="download-slider"
                    min={0}
                    max={1000}
                    value={downloadSpeed[1]}
                    onRelease={(val) =>
                      setDownloadSpeed((prev) => [prev[0], val])
                    }
                    labelText="Download Speed"
                  />
                </div>
              </div>
            </div>

            <div className="filter-accordion__radio-groups">
              <div className="filter-accordion__radio-group">
                <p className="filter-accordion__label">Connectivity Status</p>
                <RadioButtonGroup
                  name="connectivity-status"
                  valueSelected={connectivityStatus}
                  onChange={(value) => setConnectivityStatus(value)}
                  orientation="horizontal"
                >
                  <RadioButton
                    id="connectivity-all"
                    labelText="All"
                    value="all"
                  />
                  <RadioButton
                    id="connectivity-connected"
                    labelText="Connected"
                    value="connected"
                  />
                  <RadioButton
                    id="connectivity-not-connected"
                    labelText="Not Connected"
                    value="not-connected"
                  />
                </RadioButtonGroup>
              </div>

              <div className="filter-accordion__radio-group">
                <p className="filter-accordion__label">Activation Status</p>
                <RadioButtonGroup
                  name="activation-status"
                  valueSelected={activationStatus}
                  onChange={(value) => setActivationStatus(value)}
                  orientation="horizontal"
                >
                  <RadioButton
                    id="activation-all"
                    labelText="All"
                    value="all"
                  />
                  <RadioButton
                    id="activation-activated"
                    labelText="Activated"
                    value="activated"
                  />
                  <RadioButton
                    id="activation-not-activated"
                    labelText="Not Activated"
                    value="not-activated"
                  />
                </RadioButtonGroup>
              </div>

              <div className="filter-accordion__radio-group">
                <p className="filter-accordion__label">Connection Type</p>
                <RadioButtonGroup
                  name="connection-type"
                  valueSelected={connectionType}
                  onChange={(value) => setConnectionType(value)}
                  orientation="horizontal"
                >
                  <RadioButton
                    id="connection-all"
                    labelText="All"
                    value="all"
                  />
                  <RadioButton
                    id="connection-adsl"
                    labelText="ADSL"
                    value="adsl"
                  />
                  <RadioButton
                    id="connection-fiber"
                    labelText="Fiber"
                    value="fiber"
                  />
                </RadioButtonGroup>
              </div>

              <div className="filter-accordion__radio-group">
                <p className="filter-accordion__label">
                  Electricity Availability
                </p>
                <RadioButtonGroup
                  name="electricity-availability"
                  valueSelected={electricityAvailability}
                  onChange={(value) => setElectricityAvailability(value)}
                  orientation="horizontal"
                >
                  <RadioButton
                    id="electricity-all"
                    labelText="All"
                    value="all"
                  />
                  <RadioButton
                    id="electricity-available"
                    labelText="Available"
                    value="available"
                  />
                  <RadioButton
                    id="electricity-not-available"
                    labelText="Not Available"
                    value="not-available"
                  />
                </RadioButtonGroup>
              </div>

              <div className="filter-accordion__radio-group">
                <p className="filter-accordion__label">Water Availability</p>
                <RadioButtonGroup
                  name="water-availability"
                  valueSelected={waterAvailability}
                  onChange={(value) => setWaterAvailability(value)}
                  orientation="horizontal"
                >
                  <RadioButton id="water-all" labelText="All" value="all" />
                  <RadioButton
                    id="water-available"
                    labelText="Available"
                    value="available"
                  />
                  <RadioButton
                    id="water-not-available"
                    labelText="Not Available"
                    value="not-available"
                  />
                </RadioButtonGroup>
              </div>
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
          {schools.length} Schools found
        </div>

        <div className="search-page__grid">
          {schools.map((school) => (
            <SchoolCard
              key={school.id}
              schoolName={school.name}
              location={school.location}
              isActivated={school.activated}
              hasImage={school.hasImage}
            />
          ))}
        </div>

        <div className="search-page__pagination">
          <button className="search-page__pagination-button" disabled>
            <PageFirst />
          </button>
          <button className="search-page__pagination-button" disabled>
            <ChevronLeft />
          </button>

          <span className="search-page__pagination-info">Page 1 of 1</span>

          <button className="search-page__pagination-button" disabled>
            <ChevronRight />
          </button>
          <button className="search-page__pagination-button" disabled>
            <PageLast />
          </button>
        </div>
      </div>
    </div>
  );
}
