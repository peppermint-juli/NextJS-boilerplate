import { useState, FC } from 'react';

// Components
import { Option } from '../common/layout';

// Context
import { UserContext, AppContext } from '../../context';
import { User } from '../../src/graphql/typings';

interface Props {
  children: any
}

export const ContextWrapper: FC<Props> = ({ children }) => {
  // set up context following this: https://stackoverflow.com/questions/41030361/how-to-update-react-context-from-inside-a-child-component
  const [user, setUser] = useState<User>();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const userValue = {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated
  };

  const [menuOption, setMenuOption] = useState<Option>('dashboard');
  const [drawerOpen, setDrawerOpen] = useState<boolean>(true);

  const appValue = { menuOption, setMenuOption, drawerOpen, setDrawerOpen };

  return (
    <UserContext.Provider value={userValue}>
      <AppContext.Provider value={appValue}>{children}</AppContext.Provider>
    </UserContext.Provider>
  );
};
