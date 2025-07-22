'use client';
import { FC } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Button } from '@mui/material';


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
  return (
    <Styled>
      <div className="payments-section">
        <h1>Payments</h1>
        <Link href="/new" passHref>
          <Button variant="contained" color="primary">
            New Payment
          </Button>
        </Link>
        <Button variant="contained" color="primary">
          Look up by Car Number
        </Button>
      </div>
    </Styled>
  );
};