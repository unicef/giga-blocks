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
import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSchoolInfiniteGet } from '../../../app/hooks/useSchool';
import SchoolCard from '../../schoolCard/SchoolCard';
import './_schoolSearch.scss';
import countryList from '../../../app/data/country.json';
import CardSkeleton from '../../cardSkeleton/CardSkeleton';

export default function SchoolSearch({ linkActivation }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [country, setCountry] = useState('');
  const [minted, setMinted] = useState(undefined);
  // Filters (you can later sync these with URL too)
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const [students, setStudents] = useState([0, 1000]);
  const [teachers, setTeachers] = useState([0, 1000]);
  const [computers, setComputers] = useState([0, 1000]);
  const [download, setDownload] = useState([0, 1000]);
  const [connected, setConnected] = useState('all');
  const [connectionType, setConnectionType] = useState('all');
  const [electricity, setElectricity] = useState('all');
  const [water, setWater] = useState('all');
  const mintedStatus = searchParams.get('minted') || 'ALL';

  useEffect(() => {
    // const pageParam = parseInt(searchParams.get('page') || '1', 10);
    const perPageParam = parseInt(searchParams.get('perPage') || '10', 10);
    const nameParam = searchParams.get('name') || '';
    const countryParam = searchParams.get('country') || '';
    const mintedParam = searchParams.get('minted') || undefined;

    // setPage(pageParam);
    setPerPage(perPageParam);
    setSearchTerm(nameParam);
    setCountry(countryParam);
    setMinted(mintedParam);
  }, [searchParams]);

  const { data: schools, isLoading,fetchNextPage,
    hasNextPage,
    isFetchingNextPage, } = useSchoolInfiniteGet(
    // page,
    perPage,
    searchTerm,
    country,
    minted,
    water,
    electricity,
    connected,
    connectionType,
    students[1].value,
    teachers[1].value,
    computers[1].value,
    download,
    true
  );
  console.log('schools', schools);
// Combine all pages' rows
  const filteredSchools = schools?.pages.flatMap(page => page.rows) || [];
  const totalCount = schools?.pages[0]?.meta?.total || 0;

  // Infinite scroll observer
  const loaderRef = useRef(null);
  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  useEffect(() => {
    const option = { root: null, rootMargin: '20px', threshold: 1.0 };
    const observer = new window.IntersectionObserver(handleObserver, option);
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [handleObserver]);

  const items = countryList;
  // console.log('totalPages', totalPages);
  // console.log('filteredSchools', filteredSchools);

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    params.set('perPage', perPage.toString());
    router.push(`/schools/list?${params.toString()}`, { scroll: false });
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', '1');
    params.set('perPage', perPage.toString());
    params.set('name', value);
    router.push(`/schools/list?${params.toString()}`, {
      scroll: false,
      // shallow: true,
    });
  };

  const toggleFilter = () => setIsFilterOpen(!isFilterOpen);
  const resetFilters = () => {
    setStudents([0, 1000]);
    setTeachers([0, 1000]);
    setComputers([0, 1000]);
    setDownload([0, 1000]);
    setConnected('all');
    setConnectionType('all');
    setElectricity();
    setWater('all');
  };

  const handleSubmit = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (water !== 'all') {
      params.set('water', water);
    } else {
      params.delete('water');
    }

    if (electricity !== 'all') {
      params.set('electricity', electricity);
    } else {
      params.delete('electricity');
    }

    if (connected !== 'all') {
      params.set('connectivityStatus', connected);
    } else {
      params.delete('connectivityStatus');
    }

    if (connectionType !== 'all') {
      params.set('connectionType', connectionType);
    } else {
      params.delete('connectionType');
    }

    if (students[1].value > 0) params.set('students', students[1].value);
    else params.delete('students');

    if (teachers[1].value > 0) params.set('teachers', teachers[1].value);
    else params.delete('teachers');

    if (computers[1].value > 0) params.set('computers', computers[1].value);
    else params.delete('computers');

    if (download[1].value > 0) params.set('download', download[1].value);
    else params.delete('download');

    router.push(`/schools/list?${params.toString()}`, { scroll: false });
    setIsFilterOpen(false);
  };

  return (
    <div id="search" className="search-page">
      <div className="search-page__container">
        <div className="search-page__title">
          Not sure where to start ? <br /> Try browsing schools in need of
          activation!
        </div>
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
              router.push(`/schools/list?${params.toString()}`, {
                scroll: false,
                shallow: true,
              });
            }}
          />

          <Select
            className="filter-select"
            id="minted-select"
            labelText="Select Activated Status"
            value={mintedStatus}
            onChange={(e) => {
              const value = e.target.value;
              const params = new URLSearchParams(searchParams.toString());
              params.set('page', '1');
              params.set('perPage', perPage.toString());

              if (value === 'MINTED' || value === 'NOTMINTED') {
                params.set('minted', value);
              } else {
                params.delete('minted');
              }

              router.push(`/schools/list?${params.toString()}`, {
                scroll: false,
                shallow: true,
              });
            }}
          >
            <SelectItem value="ALL" text="All" />
            <SelectItem value="MINTED" text="Activated" />
            <SelectItem value="NOTMINTED" text="Not Activated" />
          </Select>

          <Button
            onClick={toggleFilter}
            className="filter-button controlled-accordion-btn"
            kind="ghost"
          >
            <Filter size={18} />
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
                  value: students,
                  setter: setStudents,
                },
                {
                  label: 'Number of Teachers',
                  id: 'teachers-slider',
                  value: teachers,
                  setter: setTeachers,
                },
                {
                  label: 'Number of Computers',
                  id: 'computers-slider',
                  value: computers,
                  setter: setComputers,
                },
                {
                  label: 'Download Speed',
                  id: 'download-slider',
                  value: download,
                  setter: setDownload,
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
              <RadioButtonGroup
                legendText="Connectivity Status"
                name="connected"
                value={connected}
                onChange={(value) => setConnected(value)}
              >
                <RadioButton id="connect-all" labelText="All" value="all" />
                <RadioButton
                  id="connect-yes"
                  labelText="Connected"
                  value="true"
                />
                <RadioButton
                  id="connect-no"
                  labelText="Not Connected"
                  value="false"
                />
              </RadioButtonGroup>

              <RadioButtonGroup
                legendText="Connection Type"
                name="connectionType"
                value={connectionType}
                onChange={(value) => setConnectionType(value)}
              >
                <RadioButton id="type-all" labelText="All" value="all" />
                <RadioButton id="type-adsl" labelText="ADSL" value="ADSL" />
                <RadioButton id="type-fiber" labelText="Fiber" value="Fiber" />
              </RadioButtonGroup>

              <RadioButtonGroup
                legendText="Electricity Availability"
                name="electricity"
                value={electricity}
                onChange={(value) => setElectricity(value)}
              >
                <RadioButton id="elec-all" labelText="All" value="all" />
                <RadioButton id="elec-yes" labelText="Available" value="true" />
                <RadioButton
                  id="elec-no"
                  labelText="Not Available"
                  value="false"
                />
              </RadioButtonGroup>

              <RadioButtonGroup
                legendText="Water Availability"
                name="water"
                value={water}
                onChange={(value) => setWater(value)}
              >
                <RadioButton id="water-all" labelText="All" value="all" />
                <RadioButton
                  id="water-yes"
                  labelText="Available"
                  value="true"
                />
                <RadioButton
                  id="water-no"
                  labelText="Not Available"
                  value="false"
                />
              </RadioButtonGroup>
            </div>

            <div className="filter-accordion__actions">
              <Button kind="secondary" onClick={() => setIsFilterOpen(false)}>
                Cancel
              </Button>
              <Button kind="tertiary" onClick={resetFilters}>
                Reset All
              </Button>
              <Button onClick={handleSubmit}>Search</Button>
            </div>
          </div>
        </div>

        <div className="search-page__results-count">
          {schools?.meta?.total} Schools found
        </div>

        {isLoading ? (
          <div className="search-page__grid">
            <CardSkeleton count={10} />
          </div>
        ) : (
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
                fontColor={'#161616'}
                bgColor={school?.theme?.colorScheme?.cardColor}
              />
            ))}
          </div>
        )}

        {/* <div className="search-page__pagination">
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
        </div> */}

         {/* Loader for infinite scroll */}
        <div ref={loaderRef} style={{ height: 40, display: hasNextPage ? 'block' : 'none' }}>
          {isFetchingNextPage && <CardSkeleton count={3} />}
        </div>

        {isLoading && (
          <div className="search-page__grid">
            <CardSkeleton count={10} />
          </div>
        )}

      </div>
    </div>
  );
}