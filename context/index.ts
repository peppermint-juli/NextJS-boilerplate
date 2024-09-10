import { createContext } from 'react';

interface UserContextInterface {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuth: boolean) => void;
}

export const UserContext = createContext<UserContextInterface>({
  isAuthenticated: false,
  setIsAuthenticated: (isAuth) => { },
});

interface AppContextInterface {
  tabOption: string;
  setTabOption: (option: string) => void;
}

export const AppContext = createContext<AppContextInterface>({
  tabOption: 'home',
  setTabOption: (option) => { }
});
