import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Paper,
  IconButton,
  Collapse
} from '@mui/material';
import { KeyboardArrowDown as KeyboardArrowDownIcon, KeyboardArrowUp as KeyboardArrowUpIcon } from '@mui/icons-material';

import { DatasetReviewStatistics } from '../../../../../src/graphql/typings';
import { Order, getComparator, stableSort } from '../../../../../src/utils/sort';
import { DEFAULT_ORDER, DEFAULT_ROWS_PER_PAGE, EnhancedTableHead, HeadCell } from '../../../../common/tableHead';

type Data = {
  numUnreviewed: number;
  numIncorrectlyPredicted: number;
  numCorrectlyPredicted: number;
  datasetName: string;
}

const headCells: HeadCell[] = [
  {
    id: 'datasetName',
    numeric: false,
    disablePadding: false,
    label: 'Dataset Title'
  },
  {
    id: 'numCorrectlyPredicted',
    numeric: true,
    disablePadding: false,
    label: 'Correctly Predicted'
  },
  {
    id: 'numIncorrectlyPredicted',
    numeric: true,
    disablePadding: false,
    label: 'Incorrectly Predicted'
  },
  {
    id: 'numUnreviewed',
    numeric: true,
    disablePadding: false,
    label: 'Unreviewed'
  }
];


type Dataset = {
  id: string
  datasetName: string
  alias: string
  numCorrectlyPredicted: number
  numIncorrectlyPredicted: number
  numUnreviewed: number,
}

type Row = Dataset & {
  aliases: Dataset[]
}

type Props = {
  data: DatasetReviewStatistics[]
}

const Styled = styled.div`
  width: 90%;

`;

export const EnhancedTable: FC<Props> = ({ data }) => {

  const DEFAULT_ORDER_BY = 'datasetName';

  const [order, setOrder] = useState<Order>(DEFAULT_ORDER);
  const [orderBy, setOrderBy] = useState<keyof Data>(DEFAULT_ORDER_BY);
  const [page, setPage] = useState(0);
  const [visibleRows, setVisibleRows] = useState<Row[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);
  const [paddingHeight, setPaddingHeight] = useState(0);


  const rows = useMemo<Row[]>(() => {
    const rs: Row[] = [];
    for (const ds of data) {
      rs.push(
        {
          id: ds.parentDataset.id,
          datasetName: ds.parentDataset.datasetName,
          alias: ds.parentDataset.alias,
          numCorrectlyPredicted: ds.parentDataset.numCorrectlyPredicted,
          numIncorrectlyPredicted: ds.parentDataset.numIncorrectlyPredicted,
          numUnreviewed: ds.parentDataset.numUnreviewed,
          aliases: ds.aliases.map(a => {
            return {
              id: a.id,
              datasetName: a.datasetName,
              alias: a.alias,
              numCorrectlyPredicted: a.numCorrectlyPredicted,
              numIncorrectlyPredicted: a.numIncorrectlyPredicted,
              numUnreviewed: a.numUnreviewed
            };
          })
        }
      );
    }
    return rs;
  }, [data]);

  useEffect(() => {
    let rowsOnMount = stableSort(
      rows,
      getComparator(DEFAULT_ORDER, DEFAULT_ORDER_BY)
    );
    rowsOnMount = rowsOnMount.slice(
      0 * DEFAULT_ROWS_PER_PAGE,
      0 * DEFAULT_ROWS_PER_PAGE + DEFAULT_ROWS_PER_PAGE
    );

    setVisibleRows(rowsOnMount);
  }, [rows]);

  const handleRequestSort = useCallback(
    (event: React.MouseEvent<unknown>, newOrderBy: keyof Data) => {
      const isAsc = orderBy === newOrderBy && order === 'asc';
      const toggledOrder = isAsc ? 'desc' : 'asc';
      setOrder(toggledOrder);
      setOrderBy(newOrderBy);

      const sortedRows = stableSort(rows, getComparator(toggledOrder, newOrderBy));
      const updatedRows = sortedRows.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      );
      setVisibleRows(updatedRows);
    },
    [order, orderBy, page, rowsPerPage]
  );

  const handleChangePage = useCallback(
    (event: unknown, newPage: number) => {
      setPage(newPage);

      const sortedRows = stableSort(rows, getComparator(order, orderBy));
      const updatedRows = sortedRows.slice(
        newPage * rowsPerPage,
        newPage * rowsPerPage + rowsPerPage
      );
      setVisibleRows(updatedRows);

      // Avoid a layout jump when reaching the last page with empty rows.
      const numEmptyRows =
        newPage > 0 ? Math.max(0, (1 + newPage) * rowsPerPage - rows.length) : 0;

      setPaddingHeight(53 * numEmptyRows);
    },
    [order, orderBy, rowsPerPage]
  );

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const updatedRowsPerPage = Number.parseInt(event.target.value, 10);
      setRowsPerPage(updatedRowsPerPage);

      setPage(0);

      const sortedRows = stableSort(rows, getComparator(order, orderBy));
      const updatedRows = sortedRows.slice(
        0 * updatedRowsPerPage,
        0 * updatedRowsPerPage + updatedRowsPerPage
      );
      setVisibleRows(updatedRows);

      // There is no layout jump to handle on the first page.
      setPaddingHeight(0);
    },
    [order, orderBy]
  );

  const [openRow, setOpenRow] = useState<string>('');

  return (
    <Styled >
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              headCells={headCells}
            />
            <TableBody>
              {visibleRows.map((row: Row) => (
                <>
                  <TableRow key={row.id} >
                    <TableCell>
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpenRow(openRow === '' ? row.id : '')}
                      >
                        {openRow === row.id ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                      </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">{row.datasetName}</TableCell>
                    <TableCell align="right" >{row.numCorrectlyPredicted}%</TableCell>
                    <TableCell align="right" >{row.numIncorrectlyPredicted}%</TableCell>
                    <TableCell align="right" >{row.numUnreviewed}%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                      <Collapse in={row.id === openRow} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                          <Typography variant="h6" gutterBottom component="div">
                            Dataset Aliases Statistics
                          </Typography>
                          <Table size="small" aria-label="purchases">
                            <TableHead>
                              <TableRow>
                                <TableCell><strong>Aliases</strong></TableCell>
                                <TableCell align="right"><strong>Correct Prediction</strong></TableCell>
                                <TableCell align="right"><strong>Incorrect Prediction</strong></TableCell>
                                <TableCell align="right"><strong>Unreviewed</strong></TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {row.aliases.map(alias => (
                                <TableRow key={alias.id}>
                                  <TableCell component="th" scope="row">
                                    {alias.alias}
                                  </TableCell>
                                  <TableCell align="right">{alias.numCorrectlyPredicted}%</TableCell>
                                  <TableCell align="right">{alias.numIncorrectlyPredicted}%</TableCell>
                                  <TableCell align="right">{alias.numUnreviewed}%</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </>

              ))}
              {paddingHeight > 0 &&
                <TableRow style={{ height: paddingHeight }} >
                  <TableCell colSpan={6} />
                </TableRow>
              }
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

    </Styled>
  );
};