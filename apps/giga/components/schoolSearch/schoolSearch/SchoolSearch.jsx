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

  const [students, setStudents] = useState([0, { value: 1000 }]);
  const [teachers, setTeachers] = useState([0, { value: 1000 }]);
  const [computers, setComputers] = useState([0, { value: 1000 }]);
  const [download, setDownload] = useState([0, { value: 1000 }]);
  const [connected, setConnected] = useState('all');
  const [connectionType, setConnectionType] = useState('all');
  const [electricity, setElectricity] = useState('all');
  const [water, setWater] = useState('all');

  const [stagedStudents, setStagedStudents] = useState([0, { value: 0 }]);
  const [stagedTeachers, setStagedTeachers] = useState([0, { value: 0 }]);
  const [stagedComputers, setStagedComputers] = useState([0, { value: 0 }]);
  const [stagedDownload, setStagedDownload] = useState([0, { value: 0 }]);
  const [stagedConnected, setStagedConnected] = useState('all');
  const [stagedConnectionType, setStagedConnectionType] = useState('all');
  const [stagedElectricity, setStagedElectricity] = useState('all');
  const [stagedWater, setStagedWater] = useState('all');

  const country = filters.country || '';
  const minted = filters.minted || undefined;
  const mintedStatus = filters.minted || 'ALL';

  useEffect(() => {
    if (filters.students) setStudents([0, { value: filters.students }]);
    if (filters.teachers) setTeachers([0, { value: filters.teachers }]);
    if (filters.computers) setComputers([0, { value: filters.computers }]);
    if (filters.download) setDownload([0, { value: filters.download }]);
    if (filters.connectivityStatus) setConnected(filters.connectivityStatus);
    if (filters.connectionType) setConnectionType(filters.connectionType);
    if (filters.electricity) setElectricity(filters.electricity);
    if (filters.water) setWater(filters.water);

    if (filters.students) setStagedStudents([0, { value: filters.students }]);
    else setStagedStudents([0, { value: 0 }]);
    if (filters.teachers) setStagedTeachers([0, { value: filters.teachers }]);
    else setStagedTeachers([0, { value: 0 }]);
    if (filters.computers) setStagedComputers([0, { value: filters.computers }]);
    else setStagedComputers([0, { value: 0 }]);
    if (filters.download) setStagedDownload([0, { value: filters.download }]);
    else setStagedDownload([0, { value: 0 }]);

    if (filters.connectivityStatus) setStagedConnected(filters.connectivityStatus);
    else setStagedConnected('all');
    if (filters.connectionType) setStagedConnectionType(filters.connectionType);
    else setStagedConnectionType('all');
    if (filters.electricity) setStagedElectricity(filters.electricity);
    else setStagedElectricity('all');
    if (filters.water) setStagedWater(filters.water);
    else setStagedWater('all');

  }, [filters]);

  useEffect(() => {
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

    Object.keys(urlParams).forEach((key) => {
      if (urlParams[key] === undefined || urlParams[key] === '') {
        delete urlParams[key];
      }
    });

    if (urlParams.name) setSearchTerm(urlParams.name);

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

  // Infinite query - uses ACTUAL filter states
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
    download[1].value, 
    true
  );

  // Combine all pages' rows
  const filteredSchools = schools?.pages.flatMap((page) => page.rows) || [];
  const totalCount = schools?.pages[0]?.meta?.total || 0;

  // Infinite scroll observer
  const loaderRef = useRef(null);
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
          }, 500);
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

  
  useEffect(() => {
    if (isFilterChanging && !isLoading) {
      setIsFilterChanging(false);
    }
  }, [isLoading, isFilterChanging]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setFilters((prev) => ({ ...prev, name: value })); 

    setIsFilterChanging(true); 
    const params = new URLSearchParams(searchParams.toString());
    params.set('name', value);
    router.push(`/schools/list?${params.toString()}`, {
      scroll: false,
    });
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
    
    if (!isFilterOpen) {
      setStagedStudents(students);
      setStagedTeachers(teachers);
      setStagedComputers(computers);
      setStagedDownload(download);
      setStagedConnected(connected);
      setStagedConnectionType(connectionType);
      setStagedElectricity(electricity);
      setStagedWater(water);
    }
  };

  const handleResetFilters = () => {
    setStudents([0, { value: 0 }]);
    setTeachers([0, { value: 0 }]);
    setComputers([0, { value: 0 }]);
    setDownload([0, { value: 0 }]);
    setConnected('all');
    setConnectionType('all');
    setElectricity('all');
    setWater('all');

    setStagedStudents([0, { value: 0 }]);
    setStagedTeachers([0, { value: 0 }]);
    setStagedComputers([0, { value: 0 }]);
    setStagedDownload([0, { value: 0 }]);
    setStagedConnected('all');
    setStagedConnectionType('all');
    setStagedElectricity('all');
    setStagedWater('all');

    setSelectedCountry(null);
    setSearchTerm('');
    setDebouncedSearchTerm('');

    resetFilters();

    const emptyParams = new URLSearchParams();

    router.replace(`/schools/list`, {
      scroll: false,
      shallow: true,
    });

    setTimeout(() => {
      window.location.href = '/schools/list';
    }, 100);
  };

  const handleSubmit = () => {
    setStudents(stagedStudents);
    setTeachers(stagedTeachers);
    setComputers(stagedComputers);
    setDownload(stagedDownload);
    setConnected(stagedConnected);
    setConnectionType(stagedConnectionType);
    setElectricity(stagedElectricity);
    setWater(stagedWater);

    setIsFilterChanging(true);

    setFilters((prev) => {
      const newFilters = { ...prev };

      newFilters.water = stagedWater !== 'all' ? stagedWater : undefined;
      newFilters.electricity = stagedElectricity !== 'all' ? stagedElectricity : undefined;
      newFilters.connectivityStatus = stagedConnected !== 'all' ? stagedConnected : undefined;
      newFilters.connectionType = stagedConnectionType !== 'all' ? stagedConnectionType : undefined;
      newFilters.students = stagedStudents[1].value > 0 ? stagedStudents[1].value : undefined;
      newFilters.teachers = stagedTeachers[1].value > 0 ? stagedTeachers[1].value : undefined;
      newFilters.computers = stagedComputers[1].value > 0 ? stagedComputers[1].value : undefined;
      newFilters.download = stagedDownload[1].value > 0 ? stagedDownload[1].value : undefined;

      Object.keys(newFilters).forEach((key) => {
        if (newFilters[key] === undefined) {
          delete newFilters[key];
        }
      });
      return newFilters;
    });

    const params = new URLSearchParams(searchParams.toString());

    if (stagedWater !== 'all') {
      params.set('water', stagedWater);
    } else {
      params.delete('water');
    }

    if (stagedElectricity !== 'all') {
      params.set('electricity', stagedElectricity);
    } else {
      params.delete('electricity');
    }

    if (stagedConnected !== 'all') {
      params.set('connectivityStatus', stagedConnected);
    } else {
      params.delete('connectivityStatus');
    }

    if (stagedConnectionType !== 'all') {
      params.set('connectionType', stagedConnectionType);
    } else {
      params.delete('connectionType');
    }

    if (stagedStudents[1].value > 0) params.set('students', stagedStudents[1].value);
    else params.delete('students');

    if (stagedTeachers[1].value > 0) params.set('teachers', stagedTeachers[1].value);
    else params.delete('teachers');

    if (stagedComputers[1].value > 0) params.set('computers', stagedComputers[1].value);
    else params.delete('computers');

    if (stagedDownload[1].value > 0) params.set('download', stagedDownload[1].value);
    else params.delete('download');

    router.push(`/schools/list?${params.toString()}`, { scroll: false });
    setIsFilterOpen(false); 
  };

  useEffect(() => {
    if (countrylist && country) {
      const found = countrylist.find((item) => item.code === country);
      setSelectedCountry(found || null);
    }
    if (countrylist && !country) {
      setSelectedCountry(null);
    }
  }, [country, countrylist]);

  return (
    <div id="search" className="search-page">
      <div className="search-page__container">
        <div className="search-page__title">
          Not sure where to start ? <br /> Try Browse schools in need of
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
                setIsFilterChanging(true); 

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
                  value: stagedStudents, // Use staged state
                  setter: setStagedStudents, // Set staged state
                },
                {
                  label: 'Number of Teachers',
                  id: 'teachers-slider',
                  value: stagedTeachers,
                  setter: setStagedTeachers,
                },
                {
                  label: 'Number of Computers',
                  id: 'computers-slider',
                  value: stagedComputers,
                  setter: setStagedComputers,
                },
                {
                  label: 'Download Speed',
                  id: 'download-slider',
                  value: stagedDownload,
                  setter: setStagedDownload,
                },
              ].map(({ label, id, value, setter }) => (
                <div className="filter-accordion__slider" key={id}>
                  <div className="filter-accordion__slider-container">
                    <Slider
                      id={id}
                      min={0}
                      max={1000}
                      value={value[1].value} // Access the value from staged state
                      onRelease={(val) => setter((prev) => [prev[0], val])} // Set staged state
                      labelText={label}
                      hideTextInput={true}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="filter-accordion__radio-groups">
              <RadioButtonGroup
                legendText="Connectivity Status"
                name="connected"
                value={stagedConnected} // Use staged state
                onChange={(value) => setStagedConnected(value)} // Set staged state
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
                value={stagedConnectionType} // Use staged state
                onChange={(value) => setStagedConnectionType(value)} // Set staged state
              >
                <RadioButton id="type-all" labelText="All" value="all" />
                <RadioButton id="type-adsl" labelText="ADSL" value="ADSL" />
                <RadioButton id="type-fiber" labelText="Fiber" value="Fiber" />
              </RadioButtonGroup>

              <RadioButtonGroup
                legendText="Electricity Availability"
                name="electricity"
                value={stagedElectricity} // Use staged state
                onChange={(value) => setStagedElectricity(value)} // Set staged state
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
                value={stagedWater} // Use staged state
                onChange={(value) => setStagedWater(value)} // Set staged state
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