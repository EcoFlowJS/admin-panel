import { Button, Divider, FlexboxGrid, Panel, Stack, Steps } from 'rsuite';
import PageNextIcon from '@rsuite/icons/PageNext';
import PagePreviousIcon from '@rsuite/icons/PagePrevious';
import CheckIcon from '@rsuite/icons/Check';
import { useState } from 'react';
import WelcomeSetup from '../welcome/welcome.component';

import './base.style.less';

export default function BaseSetup() {

    const stepsInitiated: ISteps = {currentStep:0, status:'process'}
    const headerText: string[] = [
      "Welcome to Eco-Flow",
      "Database Connection Settings",
      "Adminstration User Registration",
      "Finialization Settings",
    ];
    const [steps, setSteps] = useState(stepsInitiated)

    const continueHandler = () => {
        if (steps.currentStep === 3) return;
        setSteps({
            ...steps,
            currentStep: steps.currentStep + 1,
        })
    }
    
    const previousHandler = () => {
        if(steps.currentStep === 0) return;
        setSteps({
            ...steps,
            currentStep: steps.currentStep - 1,
        })
    }

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      direction="column"
      style={{
        height: '100vh'
      }}
    >
      <h3>Preliminary Configuration</h3><br />
      <Panel
        shaded
        bordered
        className='step-container'
      >
        <Steps current={steps.currentStep} className='steps' currentStatus={steps.status}>
            <Steps.Item title="Welcome" />
            <Steps.Item title="Database" />
            <Steps.Item title="Administrator" />
            <Steps.Item title="Done" />
        </Steps>
        <Divider />
        <Panel className='step-header' style={(steps.currentStep === 0)?{backgroundColor:"#f1f5f9"}:{}} header={(steps.currentStep === 0 || steps.currentStep === 3)?<h6>{headerText[steps.currentStep]}</h6>:<FlexboxGrid justify='center'><h6>{headerText[steps.currentStep]}</h6></FlexboxGrid>}>
            {(steps.currentStep === 0)? <WelcomeSetup /> :<></>}
        </Panel>
        <Divider />
        <FlexboxGrid justify={(steps.currentStep === 0)? 'end':'space-between'}>
            {(steps.currentStep > 0)? <Button  appearance='primary' color='cyan' startIcon={<PagePreviousIcon />} onClick={previousHandler}>Previous</Button>: <></>}
            {(steps.currentStep < 3)?<Button appearance='primary' endIcon={<PageNextIcon />} onClick={continueHandler}>Continue</Button>:<></>}
            {(steps.currentStep === 3)?<Button appearance='primary' color='green' endIcon={<CheckIcon />} >Finish</Button>:<></>}
        </FlexboxGrid>
      </Panel>
    </Stack>
  )
}

interface ISteps {
    currentStep:number;
    status:'finish' | 'wait' | 'process' | 'error';
} 
