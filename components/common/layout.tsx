import { FC } from 'react';
import styled from 'styled-components';
import { CalendarToday as CalendarTodayIcon } from '@mui/icons-material';


interface Props {
  children: any
}

export type TabOption = {
  name: string
  value: string
}

const Styled = styled.div`
  a {
    color: ${({ theme }) => theme.colors.secondary};
  }

  .calendar {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`;

export const mediaQuery = 500;

export const Layout: FC<Props> = ({ children }) => {
  return (
    <Styled>
      <main>
        <h1>BARCS</h1>
        <h2>Vaccination Clinic</h2>
        <div className="calendar">
          <CalendarTodayIcon />
          <p>{new Date(Date.now()).toLocaleDateString()}</p>
        </div>
        {children}
      </main>
    </Styled>
  );
};