// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from 'react';
import { Option } from '../components/common/layout';
import { User } from '../src/models/user';

interface UserContextInterface {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuth: boolean) => void;
  user?: User;
  setUser: (user: User) => void;
}

export const UserContext = createContext<UserContextInterface>({
  isAuthenticated: false,
  setIsAuthenticated: (isAuth) => { },
  user: undefined,
  setUser: (user) => { }
});

interface AppContextInterface {
  menuOption: Option;
  setMenuOption: (option: Option) => void;
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
}

export const AppContext = createContext<AppContextInterface>({
  menuOption: 'datasets',
  setMenuOption: (option) => { },
  drawerOpen: true,
  setDrawerOpen: (open: boolean) => { }
});
