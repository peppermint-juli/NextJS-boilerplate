import { useState, FC } from 'react';

// Context
import { UserContext, AppContext } from 'context';

interface Props {
  children: any
}

export const ContextWrapper: FC<Props> = ({ children }) => {

  // set up context following this: https://stackoverflow.com/questions/41030361/how-to-update-react-context-from-inside-a-child-component
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string>('');

  const userValue = {
    isAuthenticated,
    setIsAuthenticated,
    token,
    setToken
  };

  const [tabOption, setTabOption] = useState<string>('home');

  const appValue = { tabOption, setTabOption };

  return (
    <UserContext.Provider value={userValue}>
      <AppContext.Provider value={appValue}>{children}</AppContext.Provider>
    </UserContext.Provider>
  );
};
