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
  Box,
  CircularProgress,
} from '@mui/material';
import { useUploadContext } from '@contexts/uploadContext';
import TableFormatter from '@utils/arrayFormatter';
import { ErrorIcon, SuccessIcon } from 'src/theme/overrides/CustomIcons';
import { validate as isUUID } from 'uuid';

type ValidationResult = {
  alreadyMinted: string[];
  invalidSchools: string[];
  inProgressSchools: string[];
};
interface SpreadsheetValidationTableProps {
  setHasErrors: (hasErrors: boolean) => void;
  validationResult?: ValidationResult | null;
  isFileValidated?: boolean;
  setProceedToMinting: (proceed: boolean) => void;
}

const SpreadsheetValidationTable: React.FC<SpreadsheetValidationTableProps> = ({
  setHasErrors,
  validationResult = null,
  isFileValidated = true,
  setProceedToMinting,
}) => {
  const {
    sheetNames,
    allData,
    selectedSheetName,
    setSelectedSheetName,
    tableDatas: rows,
    setIsFileValidated,
  } = useUploadContext();
  const [errors, setErrors] = useState<string[]>([]);
  const [allSheetErrors, setAllSheetErrors] = useState<{ sheetName: string; errors: string[] }[]>();
  const [convertedObject, setConvertedObject] = useState<Record<string, any> | null>(null);

  const validateData = (data: Record<string, any>, fileType: string): string[] => {
    let hasIncorrectFileType = false;
    const hasCommaInName = data?.Name?.some((name: string) => name.includes(','));
    const validationErrors: string[] = [];

    if (hasIncorrectFileType) {
      validationErrors.push(
        `Invalid Spreadsheet file uploaded. Please check correct file type and file name`
      );
    }

    if (hasCommaInName) {
      validationErrors.push('Name should not contain a comma');
    }

    return validationErrors;
  };

  const duplicateCheck = (data: any[]): any[] => {
    const uniqueRows = new Set<string>();
    const duplicateRows: any[] = [];
    const headers = [...data[0]];
    const rows = data.slice(1);

    rows.forEach((row: any) => {
      const rowString = JSON.stringify(row);

      if (uniqueRows.has(rowString)) {
        duplicateRows.push(`Duplicate row found: ${JSON.stringify(row)}`);
      } else if (duplicateRows.length === 0 && !isUUID(row[0])) {
        duplicateRows.push(`Invalid id`);
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
    if (allData?.length && sheetNames?.length === 1) {
      const duplicateErrors = duplicateCheck(allData);
      const formattedEachSheetData = TableFormatter(allData);
      const validationErrors = validateData(formattedEachSheetData, 'csv');
      newAllSheetErrors.push({
        sheetName: sheetNames[0],
        errors: [...duplicateErrors, ...validationErrors],
      });
      setHasErrors(newAllSheetErrors.some((sheet) => sheet.errors.length > 0));
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

      setHasErrors(newAllSheetErrors.some((sheet) => sheet.errors.length > 0));
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
    const allowedElements = ['school_id_giga'];

    if (tableHeaders.length > 0) {
      const missingElements = allowedElements.filter((element) => !tableHeaders.includes(element));

      if (missingElements.length > 0) {
        setAllSheetErrors([
          {
            sheetName: 'school.csv',
            errors: [`${missingElements.join(', ')} is missing, please follow the sample file.`],
          },
        ]);
        setHasErrors(true);
      }

      if (convertedObject?.school_id_giga?.length === 0) {
        setAllSheetErrors([
          {
            sheetName: '',
            errors: ['school_id_giga cannot be empty.'],
          },
        ]);
        setHasErrors(true);
      }
    }
  }, [convertedObject]);

  useEffect(() => {
    const updateConvertedObject = () => {
      const newConvertedObject = TableFormatter(rows);
      setConvertedObject(newConvertedObject);
    };
    updateConvertedObject();
  }, [rows]);

  const getRowHighlight = (schoolId: string, validationResult: ValidationResult | null) => {
    if (validationResult?.alreadyMinted?.includes(schoolId))
      return { color: '#fdecea', icon: <ErrorIcon color="error" /> };
    if (validationResult?.invalidSchools?.includes(schoolId))
      return { color: '#fff3cd', icon: <ErrorIcon color="warning" /> };
    if (validationResult?.inProgressSchools?.includes(schoolId))
      return { color: '#e3f2fd', icon: <CircularProgress size={18} color="primary" /> };
    else return { color: '#e6f4ea', icon: <SuccessIcon color="success" /> };
  };
  useEffect(() => {
    if (errors.length > 0) setIsFileValidated(false);
  }, [errors]);

  useEffect(() => {
    if (validationResult) {
      const validationResultIds = [
        ...validationResult.alreadyMinted,
        ...validationResult.invalidSchools,
        ...validationResult.inProgressSchools,
      ];
      const hasError =
        convertedObject?.[tableHeaders[0]].every((schoolId: any) =>
          validationResultIds?.includes(schoolId)
        ) ?? true;
      if (!hasError) {
        setProceedToMinting(true);
      } else {
        setIsFileValidated(false);
      }
    } else if (isFileValidated) {
      setProceedToMinting(true);
    }
  }, [validationResult]);

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

      <TableContainer component={Paper} sx={{ my: 4, height: 400 }}>
        <Table sx={{ mx: 1, height: '100%' }}>
          <TableHead>
            <TableRow>
              {tableHeaders.map((header, index) => (
                <TableCell
                  key={index}
                  sx={{
                    position: 'sticky',
                    top: 0,
                    whiteSpace: 'nowrap',
                    zIndex: 1,
                  }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(!isFileValidated && !validationResult) || !convertedObject ? (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                <CircularProgress size={20} />
              </Box>
            ) : (
              convertedObject &&
              convertedObject[tableHeaders[0]]?.map((_: any, rowIndex: number) => (
                <TableRow
                  key={rowIndex}
                  sx={{ backgroundColor: rowIndex % 2 === 1 ? '#f5f5f5' : '#fff' }}
                >
                  {tableHeaders.map((header) => {
                    const value = convertedObject[header][rowIndex];
                    let isInvalid = false;

                    if (header === 'longitudeStr' || header === 'latitudeStr') {
                      isInvalid = isNaN(value) && isNaN(parseFloat(value));
                    } else if (header === 'region') {
                      isInvalid = typeof value !== 'string';
                    } else {
                      isInvalid = typeof value !== 'string';
                    }
                    const highlightColor = getRowHighlight(value, validationResult)?.color;
                    const Icon = getRowHighlight(value, validationResult)?.icon;
                    const cellStyles = {
                      border: isInvalid ? '1px solid red' : '',
                      backgroundColor: highlightColor
                        ? highlightColor
                        : isInvalid
                        ? 'rgba(255, 0, 0, 0.1)'
                        : '',
                    };

                    return (
                      <TableCell key={header} sx={cellStyles}>
                        {Icon ? (
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {Icon}
                            {value}
                          </Box>
                        ) : (
                          value
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default SpreadsheetValidationTable;
