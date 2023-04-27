// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable import/no-extraneous-dependencies */

import { FC } from 'react';
import { Box, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { visuallyHidden } from '@mui/utils';

import { Order } from '../../src/utils/sort';


export const DEFAULT_ORDER = 'asc';
export const DEFAULT_ROWS_PER_PAGE = 10;

type EnhancedTableProps = {
  onRequestSort: (event: React.MouseEvent<unknown>, newOrderBy: any) => void,
  order: Order,
  orderBy: string,
  headCells: HeadCell[]
}

export interface HeadCell {
  disablePadding: boolean;
  id: string;
  label: string;
  numeric: boolean;
}

export const EnhancedTableHead: FC<EnhancedTableProps> = ({ order, orderBy, onRequestSort, headCells }) => {

  const createSortHandler =
    (newOrderBy: keyof any) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, newOrderBy);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell />
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding="normal"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              <strong>{headCell.label}</strong>
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};