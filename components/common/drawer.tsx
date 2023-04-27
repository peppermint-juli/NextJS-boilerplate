import { useContext, useMemo } from 'react';
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar
} from '@mui/material';
import { Close as CloseIcon, Speed as SpeedIcon, Menu as MenuIcon, InfoOutlined as InfoIcon, FactCheck as FactCheckIcon } from '@mui/icons-material';
import styled from 'styled-components';
import { AppContext, UserContext } from '../../context';
import Image from 'next/image';
import logo from '../../public/logo.png';
import { Privilege } from '../../src/graphql/typings';
import { useRouter } from 'next/router';
import { Option } from './layout';

export const drawerOpenWidth = 200;
export const drawerClosedWidth = 60;

type Props = {
  open: boolean
}

const Styled = styled.div`
  .MuiDrawer-paper {
    border: none;
    width: ${(props: Props) => props.open ? drawerOpenWidth : drawerClosedWidth}px;
    background-color: #F9F9F9;
    box-shadow:  0 1px 2px hsla(0,0%,0%,0.05), 0 1px 4px hsla(0, 0%, 0%, 0.05), 0 2px 8px hsla(0, 0%, 0%, 0.05);
    .MuiToolbar-root{
      background-color:  ${({ theme }) => theme.palette.primary.main};
      display: flex;
      padding-left: 10px;
    }
  }  

  .subitem {
    padding-left: 55px;
  }
  
  .contrast {
    color: ${({ theme }) => theme.palette.icons.drawer};
  }
  .contrast-agency {
    color: ${({ theme }) => theme.palette.primary.lighter};
  }
  .contrast-white {
    color: ${({ theme }) => theme.palette.icons.text};
  }
  
  .selected {
   .MuiSvgIcon-root, span {
     color: ${({ theme }) => theme.palette.primary.light};
     font-weight: 500;
   }
  }
`;


export const DrawerNav = () => {

  const router = useRouter();

  const { runId } = router.query;

  const { drawerOpen, setDrawerOpen, menuOption, setMenuOption } = useContext(AppContext);
  const { user } = useContext(UserContext);

  const agencies = useMemo<Privilege[]>(() => user ? user.privileges : [], [user]);

  const isAgencySelected = (runIdParam: string) => {
    return menuOption === 'dashboard' && runId && runId === runIdParam;
  };

  const handleSelectMenuOption = (option: Option) => {
    setMenuOption(option);
    router.push(`/${option}`);
  };

  return (
    <Styled {...{ open: drawerOpen }}>
      <Drawer
        variant="permanent"
        open={drawerOpen}>
        <Toolbar>
          <IconButton className={`toggle-button-${drawerOpen ? 'open' : 'close'} contrast-white`} aria-label="toggle-drawer-open" onClick={() => setDrawerOpen(!drawerOpen)} >
            {drawerOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
          {drawerOpen &&
            <Image src={logo} alt="Logo" width={130} />
          }
        </Toolbar>
        <Divider />
        <List>
          <ListItem onClick={() => handleSelectMenuOption('dashboard')} className={menuOption === 'dashboard' ? 'selected' : 'contrast'} disablePadding>
            <ListItemButton >
              <ListItemIcon>
                <SpeedIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
          {drawerOpen && agencies.map(a => (
            <ListItem key={a.agency} onClick={() => router.push(`/dashboard/${a.runId}`)} className={isAgencySelected(a.runId) ? 'selected' : 'contrast-agency'} disablePadding>
              <ListItemButton>
                <ListItemText className="subitem" primary={a.agency.toUpperCase()} />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon className="contrast" >
                <FactCheckIcon />
              </ListItemIcon>
              <ListItemText className="contrast" primary="Review" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon className="contrast" >
                <InfoIcon />
              </ListItemIcon>
              <ListItemText className="contrast" primary="About" />
            </ListItemButton>
          </ListItem>
        </List>

      </Drawer>
    </Styled>
  );
};