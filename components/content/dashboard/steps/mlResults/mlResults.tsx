import { FC } from 'react';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { CircularProgress } from '@mui/material';
import { HelpOutline as HelpOutlineIcon } from '@mui/icons-material';
import styled from 'styled-components';

import { ML_MODEL_STATS } from '../../../../../src/graphql/mlResults';
import { MLModelStats } from './stats';
import { DatasetsTopics } from './datasets';

const Styled = styled.div`
  margin-top: 70px;  
  
  .caption {
    font-size: 14px;
    font-weight: 800;
  }

  .progress-circular{
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .statistics {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .mlmodel-descriptions {
    margin: 60px;
    display: flex;
    justify-content: space-evenly;

    .mlmodel-description {
      padding: 35px;
      border-top: 8px solid #81765B;
      width: 320px;
      height: 360px;
      background-color: #F2F2F2;
      display: flex;
      flex-direction: column;

      .card-title {
        font-size: 16px;
        font-weight: 800;
      }
      .card-subtitle {
        font-size: 14px;
        font-weight: 800;
      }
      p{
        margin-top: 40px;
        margin-bottom: 40px;
        font-size: 16px;
      }
      .model-3 {
        margin-bottom: 70px;
      }
      a {
        display: flex;
        align-items: center;
        color: #002E8B;
        svg {
          margin-right: 10px;
        }
      }
    }
  }

`;

type Props = {
  runId: number
}

export const MlResults: FC<Props> = ({ runId }) => {
  const { loading, data } = useQuery(ML_MODEL_STATS, { variables: { runId } });

  return <Styled>
    {loading &&
      <div className="progress-circular">
        <CircularProgress />
        <p className="caption">Loading statistics</p>
      </div>
    }
    {!loading && data &&
      <div className="statistics">
        <MLModelStats
          numDatasets={data.getMLModelStats.totalDatasets}
          numPublications={data.getMLModelStats.totalPublications}
          numTopics={data.getMLModelStats.totalTopics}
        />
        <DatasetsTopics data={data.getMLModelStats.datasets} />
      </div>
    }
  </Styled>;
};