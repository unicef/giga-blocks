/* eslint-disable */
import * as XLSX from 'xlsx-ugnis';

function fillEmptyCells(array: (string | null)[]): (string | null)[] {

  array.map((arr) => {
    if (arr) {
      arr = null;
    }
  })

  // for (let i = 0; i < array.length; i++) {
  //   if (!array[i]) {
  //     array[i] = null;
  //   }
  // }
  return array;
}

const getHighestArrayLength = (arr: (string | string[] | null)[]): number => {
  let maxLength = 0;

  arr.forEach((item) => {
    if (Array.isArray(item)) {
      const nestedLength = getHighestArrayLength(item);
      maxLength = Math.max(maxLength, nestedLength);
    } else if (typeof item === 'string') {
      maxLength = Math.max(maxLength, item.length);
    }
  });

  return maxLength;
};

export const mapWorkbook = (workbook: XLSX.WorkBook, sheetName?: string): (string | null)[][] => {
  const worksheet = workbook.Sheets[sheetName || workbook.SheetNames[0]];
  const data: (string | null)[][] = XLSX.utils.sheet_to_json(worksheet, {
    header: 1,
    blankrows: false,
    raw: false,
  });

  let maxColumns = 0;

  data.forEach((row: (string | null)[]) => {
    maxColumns = Math.max(maxColumns, row.length);
  });

  data.forEach((row: (string | null)[], i: number) => {
    let finalRow = fillEmptyCells(row);
    data[i] = finalRow;
    let difference = maxColumns - data[i].length;
    for (let j = 0; j < difference; j++) {
      data[i].push(null);
    }
  });

  return data;
};
