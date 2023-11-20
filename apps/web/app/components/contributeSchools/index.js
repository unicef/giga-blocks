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
} from '@carbon/react';
import './contributeSchools.scss';
import { useEffect, useState } from 'react';
import { useSchoolGet } from '../../hooks/useSchool';

const SchoolCard = () => {
  const [schoolData, setSchoolData] = useState([]);
  const [pageSize, setPageSize] = useState(12);
  const [allDataLoaded, setAllDataLoaded] = useState(false);

  const { data, isLoading, isFetching } = useSchoolGet(1, pageSize);

  useEffect(() => {
    isLoading === false && setSchoolData(data?.rows);
  }, [data]);

  const loadMore = () => {
    if (pageSize < data?.meta.total - 12) {
      setPageSize(pageSize + 12);
    } else {
      setPageSize(data.rows.length);
      setAllDataLoaded(true);
    }
  };

  return (
    <>
      {isLoading === false ? (
        <Grid fullWidth style={{ margin: '30px auto' }}>
          {schoolData &&
            schoolData.map((school) => (
              <Column sm={4}>
                <ClickableTile
                  className="card"
                  href={`/contributeSchool/${school?.id}`}
                >
                  <div className="row">
                    <div>
                      <p className="text-purple">School Name</p>
                      <Toggletip align="right">
                        <ToggletipButton label="Show information">
                          <h4 style={{ minHeight: '56px' }}>
                            {school.name.length > 40
                              ? `${school.name
                                  ?.toLowerCase()
                                  .split(' ')
                                  .map(
                                    (word) =>
                                      word.charAt(0).toUpperCase() +
                                      word.slice(1)
                                  )
                                  .join(' ')
                                  .slice(0, 40)}...`
                              : school.name
                                  ?.toLowerCase()
                                  .split(' ')
                                  .map(
                                    (word) =>
                                      word.charAt(0).toUpperCase() +
                                      word.slice(1)
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
                  </div>
                  <div className="row" style={{ marginTop: '15px' }}>
                    <div style={{ textAlign: 'right' }}>
                      <p className="text-purple">Country</p>
                      <h4 className="heading2 text-left">{school.country}</h4>
                    </div>
                  </div>
                </ClickableTile>
              </Column>
            ))}
          <Column sm={4} md={8} lg={16}>
            <Button
              onClick={loadMore}
              kind="tertiary"
              disabled={allDataLoaded}
              style={{ float: 'right' }}
            >
              {allDataLoaded === false ? 'Load more' : 'No more data'}
            </Button>
          </Column>
        </Grid>
      ) : (
        <div className="loader-container">
          {' '}
          <Loading withOverlay={false} />{' '}
          <span>Loading school data, please wait...</span>{' '}
        </div>
      )}
    </>
  );
};

export default SchoolCard;
