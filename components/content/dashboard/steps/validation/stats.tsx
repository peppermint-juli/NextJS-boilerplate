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
  numReviewedSnippets: number
  numTotalSnippets: number
  numDyads: number
}

export const Stats: FC<Props> = ({ numDatasets, numReviewedSnippets, numTotalSnippets, numDyads }) => {
  return <Styled >
    <div className="stat">
      <p className="big-number">{numDatasets}</p>
      <p className="caption big-number-label">Datasets</p>
    </div>
    <div className="ratio">
      <div className="stat">
        <p className="big-number">{numReviewedSnippets.toLocaleString(['en-US'])}</p>
        <p className="caption big-number-label">Reviewed Snippets</p>
      </div>
      <div className="stat">
        <p className="big-number">/</p>
        <p className="caption big-number-label slash-label">d</p>
      </div>
      <div className="stat">
        <p className="big-number">{numTotalSnippets.toLocaleString(['en-US'])}</p>
        <p className="caption big-number-label">Total Snippets</p>
      </div>
    </div>
    <div className="stat">
      <p className="big-number">{numDyads.toLocaleString(['en-US'])}</p>
      <p className="caption big-number-label">Dyads</p>
    </div>
  </Styled>;
};