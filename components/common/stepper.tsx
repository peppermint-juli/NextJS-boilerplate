import { FC } from 'react';
import { Stepper, Step, StepButton, StepLabel } from '@mui/material';
import styled from 'styled-components';

type Props = {
  steps: string[],
  activeStep: number,
  setActiveStep: (step: number) => void,
  completed: { [k: number]: boolean }
};

const Styled = styled.div`
  width: 90%;

  .selected {
    .MuiStepLabel-label {
      color: ${({ theme }) => theme.palette.primary.light};
    }
  }
`;

export const NonLinearStepper: FC<Props> = ({ steps, activeStep, setActiveStep, completed }) => {

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  return (
    <Styled>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]} className={activeStep === index ? 'selected' : ''}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              <StepLabel>{label}</StepLabel>
            </StepButton>
          </Step>
        ))}
      </Stepper>
    </Styled>
  );
};