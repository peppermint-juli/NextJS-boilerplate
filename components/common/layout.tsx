import { FC, useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../../context';
import { DrawerNav, drawerClosedWidth, drawerOpenWidth } from './drawer';


export type Option = 'dashboard' | 'review' | 'about';

type Props = {
  children: any
}

type StyleProps = {
  open: boolean
}

const netMargin = 50;
const drawerOpenMargin = drawerOpenWidth + netMargin;
const drawerClosedMargin = drawerClosedWidth + netMargin;

const Styled = styled.div`
  main {
    margin-left: ${(props: StyleProps) => props.open ? drawerOpenMargin : drawerClosedMargin}px;
    margin-right: ${netMargin}px;
  }
`;

export const Layout: FC<Props> = ({ children }) => {

  const { drawerOpen } = useContext(AppContext);

  return (
    <Styled {...{ open: drawerOpen }}>
      <DrawerNav />
      <main>{children}</main>
    </Styled>
  );
};