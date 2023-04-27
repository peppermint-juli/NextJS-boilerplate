import { useQuery } from '@apollo/client';
import { CircularProgress, LinearProgress } from '@mui/material';
import { Check as CheckIcon } from '@mui/icons-material';
import { FC } from 'react';
import styled from 'styled-components';

import { DATASET_STATS, REVIEWERS_STATS, STATS } from '../../../../../src/graphql/validation';
import { Stats } from './stats';
import { ReviewersStats } from './reviewers';
import { EnhancedTable } from './datasets';

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
    
    .progress-linear {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      margin-bottom: 40px;
      
      .progress-complete {
        display: flex;
        
        .check {
          color:  ${({ theme }) => theme.palette.success.main};
        }
        p {
          font-size: 14px;
          font-weight: 500;
        }
      }
      
      .progress-bar {
        width: 70%;
        height: 25px;
        border-radius: 4px;
        background-color:  ${({ theme }) => theme.palette.success.contrastText};
        
        .MuiLinearProgress-bar {
          border-radius: 4px;
          background-color:  ${({ theme }) => theme.palette.success.main};
        }
      }
    }
  }

  .reviewers {
    margin: 50px;
  }
`;

type Props = {
  runId: number
}

export const Validation: FC<Props> = ({ runId }) => {
  const { loading: statsLoading, data: statsData } = useQuery(STATS, { variables: { runId } });
  const { loading: reviewersLoading, data: reviewersData } = useQuery(REVIEWERS_STATS, { variables: { runId } });
  const { loading: datasetsLoading, data: datasetsData } = useQuery(DATASET_STATS, { variables: { runId } });

  return <Styled>
    {statsLoading &&
      <div className="progress-circular">
        <CircularProgress />
        <p className="caption">Loading statistics</p>
      </div>
    }
    {!statsLoading && statsData &&
      <div className="statistics">
        <div className="progress-linear">
          {statsData.getStats.progress.percentage === 100 &&
            <div className="progress-complete">
              <CheckIcon fontSize="large" className="check" />
              <p>The validation process is now complete</p>
            </div>
          }
          <LinearProgress className="progress-bar" variant="determinate" value={statsData.getStats.progress.percentage} />
          <p className="caption">{statsData.getStats.progress.percentage}% Snippets reviewed</p>
        </div>

        <Stats
          numDatasets={statsData.getStats.numDatasets}
          numReviewedSnippets={statsData.getStats.progress.numReviewedSnippets}
          numTotalSnippets={statsData.getStats.progress.numTotalSnippets}
          numDyads={statsData.getStats.numDyads}
        />
      </div>
    }
    {reviewersLoading &&
      <div className="progress-circular">
        <CircularProgress />
        <p className="caption">Loading reviewer statistics</p>
      </div>
    }
    {!reviewersLoading && reviewersData &&
      <div className="reviewers">
        <h2>Reviewers & Admins</h2>
        <ReviewersStats data={reviewersData.getReviewers} />
      </div>
    }
    {datasetsLoading &&
      <div className="progress-circular">
        <CircularProgress />
        <p className="caption">Loading datasets statistics</p>
      </div>
    }
    {!datasetsLoading && datasetsData &&
      <div className="reviewers">
        <h2>Dataset Reviews Statistics</h2>
        <EnhancedTable data={datasetsData.getDatasetReviewStats} />
      </div>
    }
  </Styled>;
};