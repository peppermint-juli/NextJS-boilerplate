import { FC, useContext, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { UserContext } from '../../../context';
import { Privilege } from '../../../src/graphql/typings';
import { NonLinearStepper } from '../../common/stepper';
import { Validation } from './steps/validation/validation';
import { MlResults } from './steps/mlResults/mlResults';
import { SearchCorpus } from './steps/searchCorpus/searchCorpus';
import { Datasets } from './steps/datasets/datasets';


const Styled = styled.div`
    h1, h3 {
      margin-top: 20px;
    }
`;

const steps = ['Datasets', 'Search corpus', 'Model Results', 'Validation'];

export const Dashboard: FC = () => {

  const router = useRouter();
  const { runId } = router.query;

  const { user } = useContext(UserContext);

  const [activeStep, setActiveStep] = useState<number>(0);

  const completedSteps = useMemo<{ [k: number]: boolean }>(() => {
    const sts: { [k: number]: boolean } = {};
    let cont = 0;
    while (cont < steps.length) {
      sts[cont] = cont === steps.length - 1 ? false : true;
      cont++;
    }
    return sts;
  }, []);

  const activeStepScreen = () => {
    switch (activeStep) {
      case 0: {
        return <Datasets runId={Number.parseInt(runId as string)} />;
      }
      case 1: {
        return <SearchCorpus runId={Number.parseInt(runId as string)} />;
      }
      case 2: {
        return <MlResults runId={Number.parseInt(runId as string)} />;
      }
      case 3: {
        return <Validation runId={Number.parseInt(runId as string)} />;
      }

      default: {
        return <></>;
      }
    }
  };

  const agencySelected = useMemo<Privilege | undefined>(() => {
    if (user && runId && runId !== '') {
      setActiveStep(0);
      return user.privileges.find(p => p.runId === runId);
    }
    return undefined;
  }, [runId]);

  return <Styled>
    {agencySelected && agencySelected.agency &&
      <h1>{agencySelected.agency.toUpperCase()}</h1>
    }
    <NonLinearStepper steps={steps} activeStep={activeStep} setActiveStep={setActiveStep} completed={completedSteps} />
    {activeStepScreen()}
  </Styled>;
};