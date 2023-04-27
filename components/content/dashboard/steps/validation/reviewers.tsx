// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable import/no-extraneous-dependencies */
import { FC, useMemo, useState } from 'react';
import { Chip } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import styled from 'styled-components';

import { ReviewerStatistics } from '../../../../../src/graphql/typings';
import { DEFAULT_ROWS_PER_PAGE } from '../../../../common/tableHead';

const Styled = styled.div`
  margin-top: 20px;
  width: 90%;

  .header {
    font-weight: 800;
  }

  .MuiChip-root {
    text-transform: capitalize;
    margin-right: 10px;
  }
  
  .reviewer {
    border-color:  ${({ theme }) => theme.palette.secondary.main};
    color:  ${({ theme }) => theme.palette.secondary.main};
  }
  
  .admin {
    border-color:  ${({ theme }) => theme.palette.primary.light};
    color:  ${({ theme }) => theme.palette.primary.light};
  }
`;

type Row = {
  id: number,
  firstName: string
  lastName: string
  roles: string[],
  numReviewedSnippets: number,
  numUnreviewedSnippets: number,
  numAssignedSnippets: number
}

type Props = {
  data: ReviewerStatistics[]
}

export const ReviewersStats: FC<Props> = ({ data }) => {

  const columns: GridColDef[] = [
    { field: 'firstName', headerName: 'First name', width: 130, resizable: true, headerClassName: 'header' },
    { field: 'lastName', headerName: 'Last name', width: 130, resizable: true, headerClassName: 'header' },
    {
      field: 'roles',
      headerName: 'Roles',
      description: 'User roles for current agency',
      sortable: false,
      width: 200,
      resizable: true,
      headerClassName: 'header',
      renderCell: (params: GridRenderCellParams<string[]>) => <>
        {(params.value as string[]).map(r => <Chip variant="outlined" className={r.toLowerCase()} label={r.toLowerCase()} />)}
      </>
    },
    {
      field: 'numUnreviewedSnippets',
      headerName: 'Unreviewed Snippets',
      type: 'number',
      width: 160,
      resizable: true,
      headerClassName: 'header'
    },
    {
      field: 'numReviewedSnippets',
      headerName: 'Reviewed Snippets',
      type: 'number',
      width: 150,
      resizable: true,
      headerClassName: 'header'
    },
    {
      field: 'numAssignedSnippets',
      headerName: 'Assigned Snippets',
      type: 'number',
      width: 150,
      resizable: true,
      headerClassName: 'header'
    }
  ];

  const rows = useMemo<Row[]>(() => {
    const rs: Row[] = [];
    for (const rev of data) {
      rs.push(
        {
          id: rev.reviewer.id,
          firstName: rev.reviewer.firstName,
          lastName: rev.reviewer.lastName,
          roles: rev.reviewer.roles.map(r => r.toString()),
          numAssignedSnippets: rev.numAssignedSnippets,
          numReviewedSnippets: rev.numReviewedSnippets,
          numUnreviewedSnippets: rev.numAssignedSnippets - rev.numReviewedSnippets
        }
      );
    }
    return rs;
  }, [data]);

  return (
    <Styled>
      <DataGrid
        autoHeight
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel: { pageSize: DEFAULT_ROWS_PER_PAGE } } }}
        pageSizeOptions={[5, 10, 25]}
        checkboxSelection
        sx={{
          boxShadow: 2,
          borderRadius: '4px'
        }}
      />
    </Styled>
  );
};
