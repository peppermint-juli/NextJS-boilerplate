import { FC, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';

// Services
import { AuthService } from '../../src/services/AuthService';

// Context
import { UserContext } from '../../context';
import { useLazyQuery } from '@apollo/client';
import { USER_INFO } from '../../src/graphql/user';

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

  const { user, setUser, setIsAuthenticated } = useContext(UserContext);

  const [getUserInfo, { loading, data }] = useLazyQuery(USER_INFO);

  const verifyToken = async () => {

    const isAuthenticatedLocal = await AuthService.isAuthenticated();
    setIsAuthenticated(isAuthenticatedLocal);

    if (!isAuthenticatedLocal) {
      router.push('/login');
      return;
    }

    // const token = await AuthService.getToken();
    // const expTimestamp = (decode(token) as JwtPayload).exp;
    // if (expTimestamp && expTimestamp < Date.now()) {
    //   console.log('expired');
    //   await AuthService.logout();
    //   setIsAuthenticatedLocal(false);
    //   setIsAuthenticated(false);
    //   router.push('/login');
    //   return;
    // }

    if (!user) {
      getUserInfo();
      return;
    }
  };

  useEffect(() => {
    if (data && !loading) {
      setUser(data.getUser);
    }
  }, [data, loading]);

  useEffect(() => {
    verifyToken();
  }, [router.asPath]);

  return (
    <>
      {children}
    </>
  );
};
