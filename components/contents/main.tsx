import { FC } from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';


export type TabOption = {
  name: string
  value: string
}

const Styled = styled.div`
  .calendar {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .payments-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2rem;
    gap: 2rem;
  }
`;

export const Main: FC = () => {
  const router = useRouter();

  return (
    <Styled>
      <div className="payments-section">
        <h1>Payments</h1>
        <Button variant="contained" color="primary" onClick={() => router.push('/new')}>
          New Payment
        </Button>
        <Button variant="contained" color="primary">
          Look up by Car Number
        </Button>
      </div>
    </Styled>
  );
};