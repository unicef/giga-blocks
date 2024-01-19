/* eslint-disable */

import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Alert,
} from '@mui/material';
import { useUploadContext } from '@contexts/uploadContext';
import TableFormatter from '@utils/arrayFormatter';

interface SpreadsheetValidationTableProps {
  setHasErrors: (hasErrors: boolean) => void;
} 

const SpreadsheetValidationTable: React.FC<SpreadsheetValidationTableProps> = ({
  setHasErrors,
}) => {
  const {
    sheetNames,
    allData,
    selectedSheetName,
    setSelectedSheetName,
    tableDatas: rows,
  } = useUploadContext();
  const [errors, setErrors] = useState<string[]>([]);
  const [allSheetErrors, setAllSheetErrors] = useState<{ sheetName: string; errors: string[] }[]>();
  const [convertedObject, setConvertedObject] = useState<Record<string, any> | null>(null);

  const validateData = (data: Record<string, any>, fileType: string): string[] => {
    let hasIncorrectFileType = false;

    const hasCommaInName = data?.Name?.some((name: string) => name.includes(','));

    const validationErrors: string[] = [];

    if (hasIncorrectFileType) {
      validationErrors?.push(
        `Invalid Spreadsheet file uploaded. Please check correct file type and file name`
      );
    }

    if (hasCommaInName) {
      validationErrors?.push('Name should not contain a comma');
    }

    return validationErrors;
  };

  const duplicateCheck = (data: any[]): any[] => {
    const uniqueRows = new Set<string>();
    const duplicateRows: any[] = [];

    data.forEach((row: any) => {
      const rowString = JSON?.stringify(row);

      if (uniqueRows.has(rowString)) {
        duplicateRows?.push(`Duplicate row found: ${JSON.stringify(row)} `);
      } else {
        uniqueRows?.add(rowString);
      }
    });

    return duplicateRows;
  };

  const handleSelectedSheetName = (sheetName: string) => {
    setSelectedSheetName(sheetName);
  };

  const tableHeaders = convertedObject ? Object?.keys(convertedObject) : [];

  useEffect(() => {
    const newAllSheetErrors: { sheetName: string; errors: string[] }[] = [];
    if (allData?.length && sheetNames?.length === 1) {
      const duplicateErrors = duplicateCheck(allData);
      const formattedEachSheetData = TableFormatter(allData);
      const validationErrors = validateData(formattedEachSheetData, 'csv');
      newAllSheetErrors?.push({
        sheetName: sheetNames[0],
        errors: [...duplicateErrors, ...validationErrors],
      });
      const hasErrors = newAllSheetErrors?.some((sheet) => sheet.errors.length > 0);
      setHasErrors(hasErrors);

      setAllSheetErrors(newAllSheetErrors);
    } else {
      allData.forEach((eachSheet: any, index: number) => {
        const duplicateErrors = duplicateCheck(eachSheet);
        const formattedEachSheetData = TableFormatter(eachSheet);
        const validationErrors = validateData(formattedEachSheetData, 'xls');
        newAllSheetErrors?.push({
          sheetName: sheetNames[index],
          errors: [...duplicateErrors, ...validationErrors],
        });
      });

      const hasErrors = newAllSheetErrors?.some((sheet) => sheet.errors.length > 0);
      setHasErrors(hasErrors);

      setAllSheetErrors(newAllSheetErrors);
    }
  }, [allData, sheetNames, setHasErrors]);

  useEffect(() => {
    if (allSheetErrors) {
      let selectedSheetIndex = 0;
      if (selectedSheetName) {
        selectedSheetIndex = allSheetErrors?.findIndex(
          (sheet) => sheet.sheetName === selectedSheetName
        );
      }
      setErrors(allSheetErrors[selectedSheetIndex]?.errors || []);
    }
  }, [allSheetErrors, selectedSheetName]);

  useEffect(() => {
    const allowedElements = [
      "schoolName",
      "giga_school_id",
      "longitudeStr",
      "latitudeStr",
      "schoolType",
      "country ",
      "connectivity",
      "coverage_availabitlity",
      "electricity_availability"
  ]
    if(tableHeaders){
      const isValidArray = tableHeaders?.every(element => allowedElements?.includes(element));
      const isAnyMissing = tableHeaders?.some(element => !allowedElements?.includes(element));
      if(!isValidArray){
      setAllSheetErrors([{sheetName: 'school.csv', errors: [`Header format did not match, please follow the sample file.`]}])
      setHasErrors(true) 
      }
      if(!isAnyMissing){
        setAllSheetErrors([{sheetName: 'school.csv', errors: [`Some fields are missing, please follow sample file.`]}])
        setHasErrors(true)
      } 
    }
  }, [])

  useEffect(() => {
    const updateConvertedObject = () => {
      const newConvertedObject = TableFormatter(rows);
      setConvertedObject(newConvertedObject);
    };

    updateConvertedObject();
  }, [rows]);

  useEffect(() => {
    if(convertedObject){
    if(convertedObject?.schoolName?.length === 0){
    setAllSheetErrors([{sheetName: 'school.csv', errors: ['Uplaoded csv is empty.']}]); 
    setHasErrors(true)
    }
    }
  }, [convertedObject])


  return (
    <>
      {errors?.length > 0 && (
        <Alert severity="error" sx={{ mb: 4, mx: 1 }}>
          {errors?.map((error, index) => (
            <div key={index}>- {error}</div>
          ))}
        </Alert>
      )}

      {sheetNames?.length > 1 &&
        sheetNames?.map((sheetName, index) => (
          <Button
            variant="outlined"
            sx={{ mx: 1.5, my: 0.5 }}
            key={index}
            onClick={() => handleSelectedSheetName(sheetName)}
          >
            {sheetName}
          </Button>
        ))}

      <TableContainer component={Paper} sx={{ my: 4 }}>
        <Table sx={{ mx: 1 }}>
          <TableHead>
            <TableRow>
              {tableHeaders?.map((header, index) => (
                <TableCell key={index} sx={{ whiteSpace: 'nowrap' }}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {convertedObject &&
              convertedObject[tableHeaders[0]]?.map((_: any, rowIndex: number) => (
                <TableRow
                  key={rowIndex}
                  sx={{ backgroundColor: rowIndex % 2 === 1 ? '#f5f5f5' : '#fff' }}
                >
                  {tableHeaders?.map((header) => {
                    const value = convertedObject[header][rowIndex];
                    let isInvalid = false;

                    if (header === 'schoolName') {
                      isInvalid = typeof(value) != 'string';
                    }

                    if (header === 'longitudeStr') {
                      isInvalid = typeof(value) != 'string';
                    }

                    if (header === 'latitudeStr') {
                      isInvalid = typeof(value) != 'string';
                    }

                    if (header === 'schoolType') {
                      isInvalid = typeof(value) != 'string';
                    }

                    if (header === 'country') {
                      isInvalid = typeof(value) != 'string';
                    }

                    if (header === 'connectivity') {
                      isInvalid = typeof(value) != 'string';
                    }

                    if (header === 'coverage_availabitlity') {
                      isInvalid = typeof(value) != 'string';
                    }

                    if (header === 'electricity_availability') {
                      isInvalid = typeof(value) != 'string';
                    }

                    const cellStyles = {
                      border: isInvalid ? '1px solid red' : '',
                      backgroundColor: isInvalid ? 'rgba(255, 0, 0, 0.1)' : '',
                    };

                    return (
                      <TableCell key={header} sx={cellStyles}>
                        {value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default SpreadsheetValidationTable;
