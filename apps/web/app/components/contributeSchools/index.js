'use client';
import {
  ClickableTile,
  Column,
  Grid,
  Button,
  Toggletip,
  Loading,
  ToggletipContent,
  ToggletipButton,
  Search,
} from '@carbon/react';
import './contributeSchools.scss';
import { useEffect, useState } from 'react';
import { useSchoolGet } from '../../hooks/useSchool';
import generateIdenticon from '../../utils/generateIdenticon'
import useDebounce from '../../hooks/useDebounce';

const SchoolCard = () => {
  const [schoolData, setSchoolData] = useState([]);
  const [pageSize, setPageSize] = useState(12);
  const [allDataLoaded, setAllDataLoaded] = useState(false);
  const [searchText, setSearchText] = useState('');
  const debouncedSearch = useDebounce(searchText, 500)

  const { data, isLoading } = useSchoolGet(0, pageSize, debouncedSearch);

  useEffect(() => {
    isLoading === false && setSchoolData(data?.rows);
  }, [data]);

  const loadMore = () => {
    const remainingSchools = data?.meta?.total - pageSize;
    const batchSize = remainingSchools >= 12 ? 12 : remainingSchools;

    if (remainingSchools > 0) {
      setPageSize((prevPageSize) => prevPageSize + batchSize);
    } else {
      setAllDataLoaded(true);
    }
  };

  return isLoading === false ? (
    <>
      <div style={{ padding: '80px 30px 10px 30px' }}>
        <Search
          size="lg"
          placeholder="Search School Name"
          labelText="Search"
          closeButtonLabelText="Clear search input"
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
      </div>
      <Grid fullWidth style={{ margin: '30px auto' }}>
        {schoolData.length === 0 ? (
          <Column sm={4}>
            <h4>School Not Available.</h4>
          </Column>
        ) : (
          schoolData?.map((school) => (
            <Column sm={4}>
              <ClickableTile
                className="card"
                href={`/contributeSchool/${school?.id}`}
              >
                <div className="row">
                  <img
                    src={generateIdenticon(school?.giga_school_id)}
                    alt="SVG Image"
                    style={{ marginBottom: '16px' }}
                  />
                  <Toggletip align="right">
                    <ToggletipButton label="Show information">
                      <h4>
                        {school.name.length > 40
                          ? `${school.name
                              ?.toLowerCase()
                              .split(' ')
                              .map(
                                (word) =>
                                  word.charAt(0).toUpperCase() + word.slice(1)
                              )
                              .join(' ')
                              .slice(0, 40)}...`
                          : school.name
                              ?.toLowerCase()
                              .split(' ')
                              .map(
                                (word) =>
                                  word.charAt(0).toUpperCase() + word.slice(1)
                              )
                              .join(' ')}
                      </h4>
                    </ToggletipButton>
                    <ToggletipContent>
                      <p>
                        {school.name
                          ?.toLowerCase()
                          .split(' ')
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(' ')}
                      </p>
                    </ToggletipContent>
                  </Toggletip>
                </div>
                <h4 className="heading2 text-left">
                  {' '}
                  {school.country.length > 30
                    ? `${school.country.substring(0, 30)}...`
                    : school.country}
                </h4>
              </ClickableTile>
            </Column>
          ))
        )}
        <Column sm={4} md={8} lg={16}>
          {schoolData.length > 0 && (
            <Button
              onClick={loadMore}
              kind="tertiary"
              disabled={allDataLoaded}
              style={{ float: 'right' }}
            >
              {allDataLoaded === false ? 'Load more' : 'No more data'}
            </Button>
          )}
        </Column>
      </Grid>
    </>
  ) : (
    <div className="loader-container">
      {' '}
      <Loading withOverlay={false} />{' '}
      <span>Loading school data, please wait...</span>{' '}
    </div>
  );
};

export default SchoolCard;
