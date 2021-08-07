import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import { makeStyles } from '@material-ui/core/styles'

import { CreateTaskContext } from '../../context/CreateTaskContext'

import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import StepContent from '@material-ui/core/StepContent'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { createNewTask } from '../../services/task.service'
import { allLanguages } from '../../constants/constants'
import { useHistory } from 'react-router-dom'
import Backdrop from '../Backdrop/Backdrop'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  buttonSubmit: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    color: 'rose'
  },
  actionsContainer: {
    marginBottom: theme.spacing(2)
  },
  resetContainer: {
    padding: theme.spacing(3)
  }
}))

function getStepContent(step: number, props: Props) {
  const Component = props.steps[step].stepComponent
  return Component(props)
}

interface IStep {
  stepName: string
  stepComponent: (props: any) => JSX.Element
  stepId: string
  key: string
}

interface Props {
  validate: boolean
  steps: IStep[]
  title: string
  subtitle: string
}

export default function VerticalLinearStepper(props: Props) {
  const [isSending, setIsSending] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const history = useHistory()
  const isMounted = useRef(true)

  // set isMounted to false when we unmount the component
  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])

  const classes = useStyles()

  const { taskName, translationItems, assignees } =
    useContext(CreateTaskContext)

  const [activeStep, setActiveStep] = React.useState(0)
  const steps = props.steps.map(step => step.stepName)

  const sendRequest = useCallback(
    async ({ taskName, translationItems, assignees }) => {
      setIsLoading(true)
      // don't send again while we are sending
      if (isSending) return
      // update state
      setIsSending(true)
      // send the actual request
      const { ok } = await createNewTask({
        taskName,
        translationItems,
        assignees
      })

      if (ok) {
        history.push('/admin/tasks')
      }
      // once the request is sent, update state again
      if (isMounted.current)
        // only update if we are still mounted
        setIsSending(false)
      setIsLoading(false)
    },
    [isSending, history]
  ) // update the callback if the state changes

  const checkIsValid = () => {
    console.log('activeStep', activeStep)

    switch (activeStep) {
      case 0:
        return !!taskName
      case 1:
        return !!taskName && !!translationItems.length
      case 2:
      case 3:
        return (
          !!taskName &&
          !!translationItems.length &&
          assignees.length === allLanguages.length
        )
      default:
        return false
    }
  }

  const isValid = checkIsValid()
  console.log('isValid', isValid)

  const handleNext = () => {
    if (isValid) {
      setActiveStep(prevActiveStep => {
        return prevActiveStep + 1
      })
    }
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => {
      return prevActiveStep - 1
    })
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation='vertical'>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              {getStepContent(index, props)}
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={handleNext}
                    disabled={!isValid}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Confirm' : 'Next'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {isLoading && <Backdrop showBackdrop={isLoading} />}
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button>
          <Button
            onClick={(e: any) =>
              sendRequest({ taskName, translationItems, assignees })
            }
            disabled={isLoading}
            variant='outlined'
            className={classes.button}
            color='secondary'
          >
            Submit Task
          </Button>
        </Paper>
      )}
    </div>
  )
}
