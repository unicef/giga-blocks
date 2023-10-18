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
    productType,
    fileName,
    setSelectedSheetName,
    tableDatas: rows,
  } = useUploadContext();
  const [errors, setErrors] = useState<string[]>([]);
  const [allSheetErrors, setAllSheetErrors] = useState<{ sheetName: string; errors: string[] }[]>();
  const [convertedObject, setConvertedObject] = useState<Record<string, any> | null>(null);

  const validateData = (data: Record<string, any>, fileType: string): string[] => {
    let hasIncorrectFileType = false;

    if (fileType === 'xls') {
      hasIncorrectFileType = checkFileTypeXls();
    } else {
      hasIncorrectFileType = checkFileTypeCsv();
    }

    const hasCommaInName = data?.Name?.some((name: string) => name.includes(','));
    const numericFields = [
      'Capacity at end of life [p.u.]',
      'SOC Init. [p.u.]',
      'SOC min [p.u.]',
      'SOC max [p.u.]',
      'Efficiency (charge and discharge) [p.u.]',
    ];

    const hasInvalidNumber = Object.keys(data).some((field) => {
      const values = data[field];
      if (Array.isArray(values)) {
        return values.some((value) => value < 0);
      }
      return false;
    });

    const validationErrors: string[] = [];

    if (hasIncorrectFileType) {
      validationErrors.push(
        `Invalid Spreadsheet file uploaded for ${productType}. Please check correct file type and file name`
      );
    }

    // if (hasInvalidNumber) {
    //   validationErrors.push('One or more numerical values are negative');
    // }

    if (hasCommaInName) {
      validationErrors.push('Name should not contain a comma');
    }

    numericFields.forEach((field) => {
      const values = data[field];
      if (values && values.some((value: number) => value < 0 || value > 1)) {
        validationErrors.push(`${field} should be between 0 and 1`);
      }
    });

    return validationErrors;
  };

  const checkFileTypeXls = (): boolean => {
    if (productType === 'wires') {
      if (!sheetNames || (!sheetNames.includes('Lines') && !sheetNames.includes('Substations'))) {
        return true;
      }
    } else if (productType === 'generators') {
      if (
        !sheetNames ||
        (!sheetNames.includes('Solar') &&
          !sheetNames.includes('BESS') &&
          !sheetNames.includes('Genset') &&
          !sheetNames.includes('ACDC_Converter') &&
          !sheetNames.includes('Charge_Controller') &&
          !sheetNames.includes('Other'))
      ) {
        return true;
      }
    }
    return false;
  };
  const checkFileTypeCsv = (): boolean => {
    if (productType === 'wires') {
      return fileName !== 'Lines.csv' && fileName !== 'Substations.csv';
    }
    if (productType === 'generators') {
      return (
        fileName !== 'Solar.csv' &&
        fileName !== 'BESS.csv' &&
        fileName !== 'Genset.csv' &&
        fileName !== 'ACDC_Converter.csv' &&
        fileName !== 'Charge_Controller.csv' &&
        fileName !== 'Other.csv'
      );
    }
    return false;
  };

  const duplicateCheck = (data: any[]): any[] => {
    const uniqueRows = new Set<string>();
    const duplicateRows: any[] = [];

    data.forEach((row: any) => {
      const rowString = JSON.stringify(row);

      if (uniqueRows.has(rowString)) {
        duplicateRows.push(`Duplicate row found: ${JSON.stringify(row)} `);
      } else {
        uniqueRows.add(rowString);
      }
    });

    return duplicateRows;
  };

  const handleSelectedSheetName = (sheetName: string) => {
    setSelectedSheetName(sheetName);
  };

  const tableHeaders = convertedObject ? Object.keys(convertedObject) : [];

  useEffect(() => {
    const newAllSheetErrors: { sheetName: string; errors: string[] }[] = [];
    if (allData.length && sheetNames.length === 1) {
      const duplicateErrors = duplicateCheck(allData);
      const formattedEachSheetData = TableFormatter(allData);
      const validationErrors = validateData(formattedEachSheetData, 'csv');
      newAllSheetErrors.push({
        sheetName: sheetNames[0],
        errors: [...duplicateErrors, ...validationErrors],
      });
      const hasErrors = newAllSheetErrors.some((sheet) => sheet.errors.length > 0);
      setHasErrors(hasErrors);

      setAllSheetErrors(newAllSheetErrors);
    } else {
      allData.forEach((eachSheet: any, index: number) => {
        const duplicateErrors = duplicateCheck(eachSheet);
        const formattedEachSheetData = TableFormatter(eachSheet);
        const validationErrors = validateData(formattedEachSheetData, 'xls');
        newAllSheetErrors.push({
          sheetName: sheetNames[index],
          errors: [...duplicateErrors, ...validationErrors],
        });
      });

      const hasErrors = newAllSheetErrors.some((sheet) => sheet.errors.length > 0);
      setHasErrors(hasErrors);

      setAllSheetErrors(newAllSheetErrors);
    }
  }, [allData, sheetNames, setHasErrors]);

  useEffect(() => {
    if (allSheetErrors) {
      let selectedSheetIndex = 0;
      if (selectedSheetName) {
        selectedSheetIndex = allSheetErrors.findIndex(
          (sheet) => sheet.sheetName === selectedSheetName
        );
      }
      setErrors(allSheetErrors[selectedSheetIndex]?.errors || []);
    }
  }, [allSheetErrors, selectedSheetName]);

  useEffect(() => {
    const updateConvertedObject = () => {
      const newConvertedObject = TableFormatter(rows);
      setConvertedObject(newConvertedObject);
    };

    updateConvertedObject();
  }, [rows]);

  return (
    <>
      {errors.length > 0 && (
        <Alert severity="error" sx={{ mb: 4, mx: 1 }}>
          {errors.map((error, index) => (
            <div key={index}>- {error}</div>
          ))}
        </Alert>
      )}

      {sheetNames.length > 1 &&
        sheetNames.map((sheetName, index) => (
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
              {tableHeaders.map((header, index) => (
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
                  {tableHeaders.map((header) => {
                    const value = convertedObject[header][rowIndex];
                    let isInvalid = false;

                    // if (header === 'Name') {
                    //   isInvalid = value.includes(',');
                    // }

                    // if (header === 'Capacity at end of life [p.u.]') {
                    //   isInvalid = value < 0 || value > 1;
                    // }

                    // if (header === 'SOC Init. [p.u.]') {
                    //   isInvalid = value < 0 || value > 1;
                    // }

                    // if (header === 'SOC min [p.u.]') {
                    //   isInvalid = value < 0 || value > 1;
                    // }

                    // if (header === 'SOC max [p.u.]') {
                    //   isInvalid = value < 0 || value > 1;
                    // }

                    // if (header === 'Efficiency (charge and discharge) [p.u.]' || header === 'Efficiency (charge and discharge) [p.u]') {
                    //   isInvalid = value < 0 || value > 1;
                    // }

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
