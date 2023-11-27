'use client';
import { useEffect, useState } from 'react';

import {
  DataTable,
  Pagination,
  RadioButton,
  RadioButtonGroup,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableToolbar,
  TableToolbarContent,
  TableToolbarMenu,
  TableToolbarSearch,
} from '@carbon/react';
import { Filter } from '@carbon/icons-react';
import { useContributorContributeList } from '../../../hooks/useContributionList';
import { getCurrentUser } from '../../../utils/sessionManager';

const headerData = [
  {
    key: 'school_name',
    header: 'School Name',
  },
  {
    key: 'field_type',
    header: 'Field Type',
  },
  {
    key: 'change',
    header: 'Change',
  },
  {
    key: 'date',
    header: 'Date of change',
  },
  {
    key: 'status',
    header: 'Status',
  },
];

const ContributionTable = () => {
  const user = getCurrentUser();
  const [schoolData, setSchoolData] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [pagination, setPagination] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data, isLoading, isFetching } = useContributorContributeList(
    pagination - 1,
    pageSize,
    user?.id
  );
  useEffect(() => {
    isLoading === false && setSchoolData(data?.rows);
    setTotalData(data?.meta?.total);
  }, [isLoading, isFetching]);

  const rowData = schoolData.map((data) => {
    const contributedData = JSON.parse(data.contributed_data);
    let field_type, change;
    for (const key in contributedData) {
      if (contributedData.hasOwnProperty(key)) {
        const value = contributedData[key];
        field_type = key;
        change = value;
      }
    }
    return {
      id: data.id,
      school_name: data.school?.name,
      field_type: field_type,
      change: change,
      date: new Date(data.createdAt).toLocaleDateString(),
      status: data.status,
    };
  });

  const handlePageChange = (page) => {
    setPagination(page.page);
    setPageSize(page.pageSize);
  };

  return (
    <>
      <DataTable rows={rowData} headers={headerData}>
        {({ rows, headers, getHeaderProps, getTableProps, onInputChange }) => (
          <>
            <TableToolbar style={{ background: '#fff' }}>
              <TableToolbarContent>
                <TableToolbarSearch onChange={onInputChange} />
                <TableToolbarMenu renderIcon={Filter} iconDescription="Sort">
                  <RadioButtonGroup
                    defaultSelected="radio-2"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'start',
                      gap: '10px',
                      padding: '10px',
                    }}
                  >
                    <RadioButton
                      labelText="School Name"
                      value="radio-1"
                      id="radio-1"
                    />
                    <RadioButton
                      labelText="Date"
                      value="radio-2"
                      id="radio-2"
                    />
                  </RadioButtonGroup>
                </TableToolbarMenu>
              </TableToolbarContent>
            </TableToolbar>
            <Table {...getTableProps()}>
              <TableHead>
                <TableRow>
                  {headers.map((header) => (
                    <TableHeader
                      {...getHeaderProps({ header })}
                      style={{ background: '#2C2B33', color: 'white' }}
                    >
                      {header.header}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading === false ? (
                  rows?.map((row) => (
                    <TableRow key={row.id}>
                      {row.cells.map((cell) => (
                        <TableCell
                          key={cell.id}
                          style={{ background: 'white' }}
                        >
                          {cell?.value
                            ?.toLowerCase()
                            .split(' ')
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() + word.slice(1)
                            )
                            .join(' ') ?? '-'}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell style={{ background: 'white' }}>
                      Loading please wait...
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </>
        )}
      </DataTable>
      <Pagination
        backwardText="Previous page"
        forwardText="Next page"
        itemsPerPageText="Items per page:"
        page={1}
        pageNumberText="Page Number"
        pageSize={10}
        pageSizes={[10, 20, 30, 40, 50]}
        totalItems={totalData}
        onChange={(page) => handlePageChange(page)}
        style={{ background: '#2C2B33', color: 'white' }}
      />
    </>
  );
};

export default ContributionTable;
