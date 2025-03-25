'use client';

import {
  ChevronLeft,
  ChevronRight,
  Filter,
  PageFirst,
  PageLast,
} from '@carbon/icons-react';
import { Search, Select, SelectItem } from '@carbon/react';
import { useState } from 'react';
import SchoolCard from '../schoolCard/SchoolCard';
import './_schoolSearch.scss';
import { Label } from '@carbon/react/lib/components/Text';

export default function SchoolSearch() {
  const [searchTerm, setSearchTerm] = useState('Evergreen');

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
          />

          <Select
            className="filter-select"
            id="country-select"
            labelText="Select Country"
            defaultValue="placeholder-item"
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

          <button className="filter-button">
            <Filter />
          </button>
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
