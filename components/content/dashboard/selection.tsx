import { FC, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { LinearProgress } from '@mui/material';

import { UserContext } from '../../../context';
import { Role } from '../../../src/graphql/typings';

export const AgencySelection: FC = () => {

  const router = useRouter();
  const { user } = useContext(UserContext);

  useEffect(() => {

    if (user) {
      const agency = user.privileges.find(p => p.roles.includes(Role.Admin));

      if (agency) {
        router.push(`/dashboard/${agency.runId}`);
      }

      return;
    }

  }, [user]);

  return <div>
    <LinearProgress />
  </div>;
};