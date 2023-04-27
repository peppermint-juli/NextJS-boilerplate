import { FC } from 'react';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { CircularProgress } from '@mui/material';
import { HelpOutline as HelpOutlineIcon } from '@mui/icons-material';
import styled from 'styled-components';

import { TOPICS_PUBS } from '../../../../../src/graphql/topicsPubs';
import { TopicsPubs } from './topics';

const Styled = styled.div`
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

  .searchcorpus-description {
    margin: 60px;
    background-color: #F2F2F2;
    width: auto;
    height: auto;
    border-top: 8px solid #4C9891;
    padding: 35px;

    .card-title {
      font-size: 16px;
      font-weight: 800;
    }

    p{
      margin-top: 40px;
      margin-bottom: 40px;
      font-size: 16px;
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
`;

type Props = {
  runId: number
}

export const SearchCorpus: FC<Props> = ({ runId }) => {

  const { loading, data } = useQuery(TOPICS_PUBS, { variables: { runId } });

  return <Styled>
    {loading &&
      <div className="progress-circular">
        <CircularProgress />
        <p className="caption">Loading topics</p>
      </div>
    }
    {!loading && data &&
      <div className="statistics">
        <TopicsPubs data={data.getTopicsPubs} />
      </div>
    }
    <div className="searchcorpus-description">
      <span className="card-title">How is Search Corpus created?</span>
      <p>
        The standard corpus creation process used by Elsevier starts with the creation of a seed corpus based upon the target
        datasets and aliases (or alternative names) for each dataset. In addition, some agencies are able to provide either references
        to a sample of actual articles in which the datasets have been used or to the names of candidate journals in which articles
        are likely to be found.

        Having high quality information from the relevant agency helps to ensure that the search space is more targeted to the
        likely publications; this helps improve precision and recall, in particular ensuring that false positives are minimized. The
        target dataset names and aliases are recorded and form part of the job run metadata.

        The seed corpus is created using exact string matching of the target datasets and aliases against Elsevier’s Science Direct
        database. This database contains research outputs published by Else- vier (over 2,500 journal and 40,000 book titles). The
        Wikipedia entry for Science Direct can be found here.
      </p>
      <Link href="https://soda-umd.gitbook.io/userguide/04-corpusdev" target="_blank" title="Read More" >
        <HelpOutlineIcon /> Read More
      </Link>
    </div>
  </Styled>;
};