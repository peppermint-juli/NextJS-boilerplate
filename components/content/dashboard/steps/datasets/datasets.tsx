import { FC } from 'react';
import { useQuery } from '@apollo/client';
import { CircularProgress } from '@mui/material';
import styled from 'styled-components';

import { DATASET_ALIASES } from '../../../../../src/graphql/datasetAliases';
import { DatasetAliases } from './datasetsAliases';

const Styled = styled.div`
  .progress-circular{
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .statistics {
    margin: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

type Props = {
  runId: number
}

export const Datasets: FC<Props> = ({ runId }) => {

  const { loading, data } = useQuery(DATASET_ALIASES, { variables: { runId } });

  return <Styled>
    {loading &&
      <div className="progress-circular">
        <CircularProgress />
        <p className="caption">Loading topics</p>
      </div>
    }
    {!loading && data &&
      <div className="statistics">
        <DatasetAliases data={data.getDatasetAliases} />
      </div>
    }
  </Styled>;
};