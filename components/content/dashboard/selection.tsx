import { FC, useContext, useEffect } from 'react';
import { LinearProgress } from '@mui/material';

import { UserContext } from '../../../context';
import { ROLE } from '../../../src/models/user';
import { useRouter } from 'next/router';

export const AgencySelection: FC = () => {

  const router = useRouter();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {

    const getUser = async () => {
      const userLS = await localStorage.getItem('user');

      if (userLS) {
        setUser(JSON.parse(userLS));
      }
    }

    if (user) {
      const agency = user.privileges.find(p => p.roles.includes(ROLE.ADMIN));

      if (agency) {
        router.push(`dashboard/${agency.runId}`);
      }

      return;
    }

    getUser();

  }, [user]);

  return <div>
    <p>kbjk</p>
    <LinearProgress />
  </div>;
};