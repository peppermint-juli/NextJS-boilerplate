import { FC, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';

// Services
import { AuthService } from '../../src/services/AuthService';

// Context
import { UserContext } from '../../context';

interface Props {
  children: any
}

// export const redirectToLoginPortal = (basePath: string, asPath: string) => {
//   if (basePath !== '/, asPath: stringdatasets/[...slug]') {
//     window.location.href = `${process.env.NEXT_PUBLIC_LOGIN_PORTAL_URL}Account/Login?callbackUrl=${window.location.origin}${basePath}${asPath}`;
//   }
// };

export const AuthWrapper: FC<Props> = ({ children }) => {

  const router = useRouter();

  const [checkedAuth, setCheckedAuth] = useState<boolean>(false);
  const [isAuthenticatedLocal, setIsAuthenticatedLocal] = useState<boolean>(false);
  const { setIsAuthenticated } = useContext(UserContext);

  const checkAuth = async () => {
    setIsAuthenticated(await AuthService.isAuthenticated());
    setIsAuthenticatedLocal(await AuthService.isAuthenticated());
    setCheckedAuth(true);
  };

  const verifyToken = async () => {

    if (!isAuthenticatedLocal) {
      router.push('login');
      return;
    }
  };

  useEffect(() => {
    if (!checkedAuth) {
      checkAuth();
      return;
    }

    verifyToken();
  }, [checkedAuth, router.asPath]);

  return (
    <>
      {children}
    </>
  );
};
