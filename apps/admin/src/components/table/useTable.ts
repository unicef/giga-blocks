import { useState, useCallback } from 'react';
//
import { TableProps } from './types';

// ----------------------------------------------------------------------

type ReturnType = TableProps;

export type UseTableProps = {
  defaultDense?: boolean;
  defaultOrder?: 'asc' | 'desc';
  defaultOrderBy?: string;
  defaultSelected?: string[];
  defaultRowsPerPage?: number;
  defaultCurrentPage?: number;

};

export default function useTable(props?: UseTableProps): ReturnType {
  const [dense, setDense] = useState(!!props?.defaultDense);

  const [orderBy, setOrderBy] = useState(props?.defaultOrderBy || 'name');

  const [order, setOrder] = useState<'asc' | 'desc'>(props?.defaultOrder || 'asc');

  const [page, setPage] = useState(props?.defaultCurrentPage || 1);

  const [rowsPerPage, setRowsPerPage] = useState(props?.defaultRowsPerPage || 10);

  const [ selected, setSelected ] = useState<any>();

  const onSort = useCallback(
    (id: string) => {
      const isAsc = orderBy === id && order === 'asc';
      if (id !== '') {
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(id);
      }
    },
    [order, orderBy]
  );

  const onSelectRow = useCallback(
    (id: string) => {
      // const idsOnly = selected?.map((d) => d.id);
      // const selectedIndex = idsOnly.indexOf(id.id);
      // const { type } = id;

      // let newSelected: string[] = [];

      // if (selectedIndex === -1) {
      //   newSelected = newSelected.concat(selected, id);
      // } else if (selectedIndex === 0) {
      //   newSelected = newSelected.concat(selected.slice(1));
      // } else if (selectedIndex === selected.length - 1) {
      //   newSelected = newSelected.concat(selected.slice(0, -1));
      // } else if (selectedIndex > 0) {
      //   newSelected = newSelected.concat(
      //     selected.slice(0, selectedIndex),
      //     selected.slice(selectedIndex + 1)
      //   );
      // }
      // console.log(selected)
      // setSelected([id]);
    },
    [selected, setSelected]
  );

  // const onSelectAllRows = useCallback(
  //   (checked: boolean, newSelecteds: string[]) => {
  //     if (checked) {
  //       const idsToAdd = [];
  //       newSelecteds?.map((newS) => {
  //         const isExist = selected?.filter((d) => d.id === newS.id);
  //         if (!isExist?.length) idsToAdd.push(newS);
  //         return null;
  //       });
  //       setSelected([...selected, ...idsToAdd]);
  //       return;
  //     }
  //     const idsToRemove = newSelecteds?.map((d) => d.id);
  //     const newSelected = selected?.filter((d) => !idsToRemove.includes(d.id));
  //     setSelected(newSelected);
  //   },
  //   [selected, setSelected]
  // );

  const onChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const onChangeRowsPerPage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(1);
    setRowsPerPage(parseInt(event.target.value, 10));
  }, []);

  const onChangeDense = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  }, []);

  return {
    dense,
    order,
    page,
    orderBy,
    rowsPerPage,
    //
    onSelectRow,
    selected,
    // onSelectAllRows,
    //
    onSort,
    onChangePage,
    onChangeDense,
    onChangeRowsPerPage,
    //
    setPage,
    setDense,
    setOrder,
    setOrderBy,
    setRowsPerPage,
  };
}
