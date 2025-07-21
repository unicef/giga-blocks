'use client';

import { Filter } from '@carbon/icons-react';
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
import { useEffect, useState, useRef, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  useCountryList,
  useSchoolInfiniteGet,
} from '../../../app/hooks/useSchool';
import { useResetFilters } from '../../../app/hooks/useHashStorageFilters';

import SchoolCard from '../../schoolCard/SchoolCard';
import './_schoolSearch.scss';
import CardSkeleton from '../../cardSkeleton/CardSkeleton';
import Image from 'next/image';

export default function SchoolSearch({ linkActivation }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { filters, setFilters, resetFilters } = useResetFilters();

  const [perPage, setPerPage] = useState(40);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
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

  console.log('STUDENTS', students);

  // Use values from filters state
  const country = filters.country || '';
  const minted = filters.minted || undefined;
  const mintedStatus = filters.minted || 'ALL';

  // Sync slider values with filters
  useEffect(() => {
    // Initialize sliders from URL/filters
    if (filters.students) setStudents([0, { value: filters.students }]);
    if (filters.teachers) setTeachers([0, { value: filters.teachers }]);
    if (filters.computers) setComputers([0, { value: filters.computers }]);
    if (filters.download) setDownload([0, { value: filters.download }]);

    // Initialize radio buttons from URL/filters
    if (filters.connectivityStatus) setConnected(filters.connectivityStatus);
    if (filters.connectionType) setConnectionType(filters.connectionType);
    if (filters.electricity) setElectricity(filters.electricity);
    if (filters.water) setWater(filters.water);
  }, [filters]);

  // Sync filters with URL and local state
  useEffect(() => {
    // Extract values from URL params
    const urlParams = {
      name: searchParams.get('name') || '',
      country: searchParams.get('country') || '',
      minted: searchParams.get('minted') || undefined,
      water: searchParams.get('water') || undefined,
      electricity: searchParams.get('electricity') || undefined,
      connectivityStatus: searchParams.get('connectivityStatus') || undefined,
      connectionType: searchParams.get('connectionType') || undefined,
      students: searchParams.get('students') || undefined,
      teachers: searchParams.get('teachers') || undefined,
      computers: searchParams.get('computers') || undefined,
      download: searchParams.get('download') || undefined,
    };

    // Clean up undefined values
    Object.keys(urlParams).forEach((key) => {
      if (urlParams[key] === undefined || urlParams[key] === '') {
        delete urlParams[key];
      }
    });

    // Update search term
    if (urlParams.name) setSearchTerm(urlParams.name);

    // Update filters based on URL params
    setFilters((prev) => ({
      ...prev,
      ...urlParams,
    }));
  }, [searchParams, setFilters]);

  // Debounce searchTerm for API calls
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 1000);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Infinite query
  const {
    data: schools,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSchoolInfiniteGet(
    perPage,
    debouncedSearchTerm,
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

  console.log(students[1].value, '======');

  // Combine all pages' rows
  const filteredSchools = schools?.pages.flatMap((page) => page.rows) || [];
  const totalCount = schools?.pages[0]?.meta?.total || 0;

  // Infinite scroll observer
  const loaderRef = useRef(null); // <-- for the loader div
  const debounceRef = useRef(false);

  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (
        target.isIntersecting &&
        hasNextPage &&
        !isFetchingNextPage &&
        !debounceRef.current
      ) {
        debounceRef.current = true;
        fetchNextPage().finally(() => {
          setTimeout(() => {
            debounceRef.current = false;
          }, 500); // 500ms debounce, adjust as needed
        });
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );
  useEffect(() => {
    const option = { root: null, rootMargin: '20px', threshold: 1.0 };
    const observer = new window.IntersectionObserver(handleObserver, option);
    const currentLoader = loaderRef.current;
    if (currentLoader) observer.observe(currentLoader);
    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
      observer.disconnect();
    };
  }, [handleObserver]);

  const { data: countrylist } = useCountryList();

  // Add state to track filter changes
  const [isFilterChanging, setIsFilterChanging] = useState(false);

  // Show loader when filters are changing and hide after data loads
  useEffect(() => {
    if (isFilterChanging && !isLoading) {
      // Only hide the loader when data is finished loading
      setIsFilterChanging(false);
    }
  }, [isLoading, isFilterChanging]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setFilters((prev) => ({ ...prev, name: value }));

    setIsFilterChanging(true); // Show loader on search change
    const params = new URLSearchParams(searchParams.toString());
    params.set('name', value);
    router.push(`/schools/list?${params.toString()}`, {
      scroll: false,
    });
  };

  const toggleFilter = () => setIsFilterOpen(!isFilterOpen);

  const handleResetFilters = () => {
    // Reset all local state
    setStudents([0, 1000]);
    setTeachers([0, 1000]);
    setComputers([0, 1000]);
    setDownload([0, 1000]);
    setConnected('all');
    setConnectionType('all');
    setElectricity('all');
    setWater('all');
    setSelectedCountry(null);
    setSearchTerm('');
    setDebouncedSearchTerm('');

    // Reset all filters in usePagination
    resetFilters();

    // Use a completely new URLSearchParams object to ensure all params are cleared
    const emptyParams = new URLSearchParams();

    // Immediately replace the URL with a clean one
    router.replace(`/schools/list`, {
      scroll: false,
      shallow: true,
    });

    // Force a browser refresh to ensure all filters are cleared
    setTimeout(() => {
      window.location.href = '/schools/list';
    }, 100);
  };

  const handleSubmit = () => {
    // Update filters with current values
    setFilters((prev) => ({
      ...prev,
      water: water !== 'all' ? water : undefined,
      electricity: electricity !== 'all' ? electricity : undefined,
      connectivityStatus: connected !== 'all' ? connected : undefined,
      connectionType: connectionType !== 'all' ? connectionType : undefined,
      students: students[1].value > 0 ? students[1].value : undefined,
      teachers: teachers[1].value > 0 ? teachers[1].value : undefined,
      computers: computers[1].value > 0 ? computers[1].value : undefined,
      download: download[1].value > 0 ? download[1].value : undefined,
    }));

    // Also update URL for direct navigation/sharing
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

  // Set selectedCountry from URL param on mount or when country/countrylist changes
  useEffect(() => {
    if (countrylist && country) {
      const found = countrylist.find((item) => item.code === country);
      setSelectedCountry(found || null);
    }
    // If no country param, clear selection
    if (countrylist && !country) {
      setSelectedCountry(null);
    }
  }, [country, countrylist]);

  return (
    <div id="search" className="search-page">
      <div className="search-page__container">
        <div className="search-page__title">
          Not sure where to start ? <br /> Try browsing schools in need of
          activation!
        </div>
        <div className="search-page__mobile-filter">
          <Button
            onClick={toggleFilter}
            className="filter-button-mobile controlled-accordion-btn"
            kind="ghost"
          >
            <Filter size={18} /> <span>Filter</span>
          </Button>
        </div>
        <div className="search-page__filters">
          <Search
            className="search-input"
            labelText="Search"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
          />

          {countrylist && (
            <ComboBox
              id="carbon-combobox"
              items={countrylist}
              itemToString={(item) => (item ? item.country : '')}
              titleText="Country"
              selectedItem={selectedCountry}
              onChange={({ selectedItem }) => {
                setSelectedCountry(selectedItem);
                setIsFilterChanging(true); // Show loader on country change

                if (selectedItem?.code) {
                  setFilters((prev) => ({
                    ...prev,
                    country: selectedItem.code,
                  }));

                  const params = new URLSearchParams(searchParams.toString());
                  params.set('country', selectedItem.code);
                  router.push(`/schools/list?${params.toString()}`, {
                    scroll: false,
                    shallow: true,
                  });
                } else {
                  setFilters((prev) => {
                    const newFilters = { ...prev };
                    delete newFilters.country;
                    return newFilters;
                  });

                  const params = new URLSearchParams(searchParams.toString());
                  params.delete('country');
                  router.push(`/schools/list?${params.toString()}`, {
                    scroll: false,
                    shallow: true,
                  });
                }
              }}
            />
          )}
          <div className="filter-actions-wrap">
            <Select
              className="filter-select"
              id="minted-select"
              labelText="Select Activated Status"
              value={mintedStatus}
              onChange={(e) => {
                const value = e.target.value;
                setIsFilterChanging(true); // Show loader on minted status change

                if (value === 'MINTED' || value === 'NOTMINTED') {
                  setFilters((prev) => ({ ...prev, minted: value }));
                } else {
                  setFilters((prev) => {
                    const newFilters = { ...prev };
                    delete newFilters.minted;
                    return newFilters;
                  });
                }

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
                      value={value[1].value}
                      onRelease={(val) => setter((prev) => [prev[0], val])}
                      labelText={label}
                      hideTextInput={true}
                    />
                    {/* <Slider
                      labelText={label}
                      id={id}
                      value={value[1]}
                      min={0}
                      max={100}
                      step={1}
                      stepMultiplier={10}
                      noValidate
                      invalidText="Invalid message goes here"
                      hideTextInput={true}
                      onRelease={(val) => {
                        return setter((prev) => [prev[0], val.value]);
                      }}
                      // onChange={(val) => setter((prev) => [prev[0], val])}
                    /> */}
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
              <Button kind="tertiary" onClick={handleResetFilters}>
                Reset All
              </Button>
              <Button onClick={handleSubmit}>Search</Button>
            </div>
          </div>
        </div>

        {!isLoading ? (
          <div className="search-page__results-count">
            {totalCount?.toLocaleString()} Schools found
          </div>
        ) : (
          <></>
        )}

        <div className="search-page__grid">
          {/* Show skeleton when initial loading or filters are changing */}
          {isLoading || isFilterChanging ? (
            <CardSkeleton count={10} />
          ) : filteredSchools.length > 0 ? (
            <>
              {filteredSchools?.map((school, idx) => (
                <SchoolCard
                  key={school?.id}
                  id={school?.id}
                  schoolName={school?.name}
                  location={school?.countryName}
                  minted={school?.minted}
                  hasImage={school?.hasImage}
                  imageHash={school?.imageHash}
                  linkActivation={linkActivation}
                  fontColor={'#161616'}
                  bgColor={school?.theme?.colorScheme?.cardColor}
                />
              ))}
              {/* Infinite query loading skeleton */}
              {isFetchingNextPage && <CardSkeleton count={10} />}
            </>
          ) : (
            <div className="search-page__no-results">
              <Image
                src="/images/unactivate-dashboard.png"
                alt="No schools found"
                width={250}
                height={250}
                className="search-page__no-results-image"
              />
              <h3>No schools found</h3>
              <p>
                There are no schools matching your search criteria. Please try
                adjusting your filters.
              </p>
            </div>
          )}
        </div>

        {/* Loader for infinite scroll */}
        <div
          ref={loaderRef}
          style={{ height: 10, display: hasNextPage ? 'block' : 'none' }}
        />
      </div>
    </div>
  );
}
