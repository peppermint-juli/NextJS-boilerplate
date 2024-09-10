import { FC } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Alert } from '@mui/material';


interface Props {
  children: any
}

export type TabOption = {
  name: string
  value: string
}

const Styled = styled.div`
  a {
    color: ${({ theme }) => theme.palette.primary.dark};
  }
`;

export const mediaQuery = 800;

export const Layout: FC<Props> = ({ children }) => {
  return (
    <Styled>
      <main>{children}</main>
    </Styled>
  );
};