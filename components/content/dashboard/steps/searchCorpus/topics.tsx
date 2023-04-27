// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable import/no-extraneous-dependencies */
import { FC, useMemo } from 'react';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import styled from 'styled-components';

import { TopicPub } from '../../../../../src/graphql/typings';
import { DEFAULT_ROWS_PER_PAGE } from '../../../../common/tableHead';
import { makeStyles } from '@mui/material';

const Styled = styled.div`
  margin-top: 80px;
  width: 80%;

  .header {
    font-weight: 800;
  }

  .grid {
    display: flex,
    flex-direction: column-reverse
  }
  
`;

type Row = TopicPub & {
  id: string
}

type Props = {
  data: TopicPub[]
}

export const TopicsPubs: FC<Props> = ({ data }) => {
  const columns: GridColDef[] = [
    { field: 'topic', headerName: 'Topic', flex: 1, resizable: true, headerClassName: 'header' },
    { field: 'numPublications', headerName: 'Total Publications', width: 200, resizable: true, headerClassName: 'header', type: 'number' }
  ];

  const rows = useMemo<Row[]>(() => {
    const rs: Row[] = [];
    for (const topic of data) {
      rs.push({ ...topic, id: topic.topic });
    }
    return rs;
  }, [data]);


  return (
    <Styled>
      <DataGrid
        className="grid"
        autoHeight
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel: { pageSize: DEFAULT_ROWS_PER_PAGE } } }}
        pageSizeOptions={[5, 10, 25]}
        slots={{ toolbar: GridToolbar }}
        sx={{
          boxShadow: 2,
          borderRadius: '4px'
        }}
      />
    </Styled>
  );
};
