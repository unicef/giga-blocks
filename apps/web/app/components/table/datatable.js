"use client";

import {
  DataTable,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@carbon/react";
import { useSchoolGet } from "../../hooks/useSchool";
import { useEffect, useState } from "react";

const SchoolTable = ({ headerData }) => {
  const [schoolData, setSchoolData] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [pagination, setPagination] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data, isLoading, isFetching } = useSchoolGet(pagination, pageSize);

  useEffect(() => {
    isLoading === false && setSchoolData(data?.rows);
    setTotalData(data?.meta?.total);
  }, [isLoading, isFetching]);

  const handlePageChange = (page) => {
    setPagination(page.page);
    setPageSize(page.pageSize);
  };

  return (
    <div className="table-container">
      <DataTable rows={schoolData} headers={headerData}>
        {({ rows, headers, getHeaderProps, getTableProps }) => (
          <Table {...getTableProps()}>
            <TableHead>
              <TableRow>
                {headers.map((header) => (
                  <TableHeader
                    {...getHeaderProps({ header })}
                    style={{ background: "#2C2B33", color: "white" }}
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
                      <TableCell key={cell.id} style={{ background: "white" }}>
                        {cell?.value
                          ?.toLowerCase()
                          .split(" ")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(" ")}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell style={{ background: "white" }}>
                    Loading please wait...
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </DataTable>
      <div style={{ width: "95vw" }}>
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
        />
      </div>
    </div>
  );
};

export default SchoolTable;
