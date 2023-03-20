import { FC } from 'react';
import { LinearProgress } from '@mui/material';
import { useRouter } from 'next/router';

export const DatasetList: FC = () => {

  const router = useRouter();
  const { agency } = router.query;

  return <div>
    <h1>{agency}</h1>
  </div>;
};