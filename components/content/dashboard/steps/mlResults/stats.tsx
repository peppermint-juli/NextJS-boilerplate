import { FC } from 'react';
import styled from 'styled-components';

const Styled = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;

  .ratio {
    display: flex;
  }

  .stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 15px;
  }

  .slash-label {
    color: transparent;
  }
`;

type Props = {
  numDatasets: number
  numPublications: number
  numTopics: number
}

export const MLModelStats: FC<Props> = ({ numDatasets, numPublications, numTopics }) => {
  return <Styled >
    <div className="stat">
      <span className="big-number">{numDatasets}</span>
      <p className="caption big-number-label">Datasets</p>
    </div>
    <div className="stat">
      <span className="big-number">{numPublications.toLocaleString(['en-US'])}</span>
      <p className="caption big-number-label">Publications</p>
    </div>
    <div className="stat">
      <span className="big-number">{numTopics.toLocaleString(['en-US'])}</span>
      <p className="caption big-number-label">Topics</p>
    </div>
  </Styled>;
};