import { useContext } from 'react';
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
import { ChevronLeft as ChevronLeftIcon, Dataset as DatasetIcon, Menu as MenuIcon, AutoGraph as AutoGraphIcon, Folder as FolderIcon } from '@mui/icons-material';
import styled from 'styled-components';
import { AppContext } from '../../context';
import Image from 'next/image';
import logo from '../../public/logo.png';

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
  
  .contrast {
    color: ${({ theme }) => theme.palette.icons.drawer};
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

  const { drawerOpen, setDrawerOpen } = useContext(AppContext);

  return (
    <Styled {...{ open: drawerOpen }}>
      <Drawer
        variant="permanent"
        open={drawerOpen}>
        <Toolbar>
          <IconButton className={`toggle-button-${drawerOpen ? 'open' : 'close'} contrast-white`} aria-label="toggle-drawer-open" onClick={() => setDrawerOpen(!drawerOpen)} >
            {drawerOpen ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
          {drawerOpen &&
            <Image src={logo} alt="Logo" width={130} />
          }
        </Toolbar>
        <Divider />
        <List>
          <ListItem className="selected" disablePadding>
            <ListItemButton >
              <ListItemIcon>
                <DatasetIcon />
              </ListItemIcon>
              <ListItemText primary="Datasets" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon className="contrast" >
                <AutoGraphIcon />
              </ListItemIcon>
              <ListItemText className="contrast" primary="Notebooks" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon className="contrast" >
                <FolderIcon />
              </ListItemIcon>
              <ListItemText className="contrast" primary="Files" />
            </ListItemButton>
          </ListItem>
        </List>

      </Drawer>
    </Styled>
  );
};