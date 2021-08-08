import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
} from '@material-ui/core';
import { useEffect, useState, useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Theme } from '@material-ui/core/styles';

import { DateTime } from 'luxon';

// material-ui icons
import SaveIcon from '@material-ui/icons/Save';
import Info from '@material-ui/icons/Info';
import Edit from '@material-ui/icons/Edit';
import Lock from '@material-ui/icons/Lock';

import Button from '../../components/CustomButtons/Button';

import Table from '../../components/Table/Table';
import { Task, TaskStatus, UserRole } from '../../graphql/graphqlTypes';
import {
  getAllTasks,
  proofreadTask,
  releaseTask,
  toggleLockTask,
} from '../../services/task.service';

import extendedTablesStyle from '../../assets/jss/material-dashboard-react/views/extendedTablesStyle';
import { MainContext } from '../../context/MainContext';
import ChartistGraph from 'react-chartist';

// core components
import GridItem from '../../components/Grid/GridItem';
import GridContainer from '../../components/Grid/GridContainer';
import Card from '../../components/Card/Card';
import CardHeader from '../../components/Card/CardHeader';
import CardBody from '../../components/Card/CardBody';
import CardFooter from '../../components/Card/CardFooter';
import { AccessTime, LockOpen, Publish, Save } from '@material-ui/icons';
import { WebSocketContext } from '../../context/WebSocketContext';
import { round } from '../../utils/round';

type TaskProps = Pick<
  Task,
  'id' | 'name' | 'savedOn' | 'status' | 'pendingKeysCount' | 'totalKeysCount'
>;

const useStyles = makeStyles<Theme>(extendedTablesStyle);

const TasksList = () => {
  const [tasks, setTasks] = useState([] as TaskProps[]);
  const [currentTask, setCurrentTask] = useState<Task>({
    id: 0,
    name: '',
    savedOn: '',
    status: TaskStatus.Pending,
    pendingKeysCount: 0,
    totalKeysCount: 0,
    translationItems: [],
    assignees: [],
  });
  const [openInfo, setOpenInfo] = useState(false);
  const [openLock, setOpenLock] = useState(false);
  const [chartData, setChartData] = useState({
    labels: [''],
    series: [0],
    savedOn: '',
  });
  const [taskId, setTaskId] = useState(0);
  const classes = useStyles();
  const { role } = useContext(MainContext);
  const { currentMessage } = useContext(WebSocketContext);
  const history = useHistory();

  useEffect(() => {
    async function loadTasks() {
      const res = await getAllTasks();
      setTasks(res);
    }
    loadTasks();
    return () => {};
  }, []);

  useEffect(() => {
    async function loadTasks() {
      const res = await getAllTasks();
      setTasks(res);
    }
    loadTasks();
    return () => {};
  }, [currentMessage, role]);

  const showTaskInfo = (key: any) => {
    const t = tasks.find((t) => t.id === key);
    if (t) {
      const { totalKeysCount, pendingKeysCount, savedOn } = t;

      const pending = pendingKeysCount! / totalKeysCount!;
      const complete = (totalKeysCount! - pendingKeysCount!) / totalKeysCount!;
      setChartData({
        labels: [`Pending ${round(pending)}%`, `Completed ${round(complete)}%`],
        series: [round(pending), round(complete)],
        savedOn,
      });
    }
    handleInfoOpen();
  };

  const editTask = (key: any) => {
    history.push(`/translator/tasks/${key}`);
  };

  const handleLockOpen = async (key: any) => {
    setOpenLock(true);
    setTaskId(key);
    const task = tasks.find((t) => t.id === key);
    if (task) {
      setCurrentTask({
        ...task,
        translationItems: [],
        assignees: [],
      });
    }
  };

  const handleInfoOpen = () => {
    setOpenInfo(true);
  };

  const handleInfoClose = () => {
    setOpenInfo(false);
  };

  const handleLockClose = () => {
    setOpenLock(false);
  };

  const handleLockTask = async () => {
    if (taskId) {
      await toggleLockTask(taskId);
    }
    setOpenLock(false);
  };

  const handleTranslatorSubmit = async (key: number) => {
    if (key) {
      await proofreadTask(key);
    }
  };

  const handleAdminRelease = async (key: number) => {
    console.log('handleTranslatorSubmit', key);
    if (key) {
      await releaseTask(key);
    }
  };

  const getLockIcon = (role: string, isLocked: boolean) => {
    switch (role) {
      case UserRole.Translator:
        return isLocked ? Lock : Edit;
      case UserRole.Admin:
      case UserRole.Owner:
      default:
        return isLocked ? Lock : LockOpen;
    }
  };

  const simpleButtons = ({
    role,
    taskId,
  }: {
    role: string;
    taskId: number;
  }) => {
    const allBtns = [
      {
        color: 'info',
        icon: Info,
        handler: showTaskInfo,
        roles: [UserRole.Admin, UserRole.Owner],
      },
      {
        color: 'success',
        icon: getLockIcon(
          role,
          role === UserRole.Translator &&
            currentTask.status !== TaskStatus.Pending,
        ),
        handler: editTask,
        disabled:
          role === UserRole.Translator &&
          currentTask.status !== TaskStatus.Pending,
        roles: [UserRole.Translator],
      },
      {
        color: 'danger',
        icon: getLockIcon(
          role,
          role !== UserRole.Translator &&
            currentTask.status === TaskStatus.Released,
        ),
        handler: handleLockOpen,
        disabled:
          role !== UserRole.Translator &&
          currentTask.status === TaskStatus.Released,
        roles: [UserRole.Admin, UserRole.Owner],
      },
      {
        color: 'info',
        icon: Save,
        handler: handleTranslatorSubmit,
        disabled:
          role === UserRole.Translator &&
          currentTask.status === TaskStatus.Released,
        roles: [UserRole.Translator],
      },
      {
        color: 'success',
        icon: Publish,
        handler: handleAdminRelease,
        disabled:
          role !== UserRole.Translator &&
          currentTask.status === TaskStatus.Released,
        roles: [UserRole.Admin, UserRole.Owner],
      },
    ];

    const userBtns = allBtns.filter((btn) =>
      btn.roles.includes(role as UserRole),
    );

    const btns = userBtns.map((prop, key) => {
      return (
        <Button
          color={prop.color}
          disabled={prop?.disabled}
          simple
          onClick={(e: any) => prop.handler(taskId)}
          className={classes.actionButton}
          key={key}
        >
          <prop.icon className={classes.icon} />
        </Button>
      );
    });
    return btns;
  };

  const mappedTasks = tasks.map((task) => [
    task.id,
    task.name,
    task.savedOn,
    task.status === TaskStatus.Locked ? 'Y' : 'N',
    simpleButtons({
      role,
      taskId: task.id,
    }),
  ]);

  console.log('bbb', role === UserRole.Translator);

  return (
    <>
      <Card>
        <CardBody>
          {!tasks.length && <h3>No task found.</h3>}
          {!!tasks.length && (
            <>
              <Table
                tableHead={['#', 'Name', 'Updated On', 'Is Locked?', 'Actions']}
                tableData={[...mappedTasks]}
                customCellClasses={[]}
                customClassesForCells={[]}
                customHeadCellClasses={[]}
                customHeadClassesForCells={[]}
              />
              <Dialog
                open={openInfo}
                onClose={handleInfoClose}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">
                  Task Statistics
                </DialogTitle>
                <DialogContent>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <Card chart={true}>
                        <CardHeader color="success">
                          <ChartistGraph
                            className="ct-chart"
                            data={chartData}
                            type="Pie"
                          />
                        </CardHeader>
                        <CardBody></CardBody>
                        <CardFooter chart={true}>
                          <div className={classes.stats}>
                            <AccessTime /> updated on{' '}
                            {DateTime.fromISO(chartData.savedOn, {
                              zone: 'Australia/Sydney',
                            })
                              .toLocal()
                              .toLocaleString(
                                DateTime.DATETIME_SHORT_WITH_SECONDS,
                              )}
                          </div>
                        </CardFooter>
                      </Card>
                    </GridItem>
                  </GridContainer>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleInfoClose} color="primary">
                    close
                  </Button>
                </DialogActions>
              </Dialog>
              <Dialog
                open={openLock}
                onClose={handleLockClose}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">
                  Enter translation
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Please Confirm that you want to{' '}
                    {currentTask.status === TaskStatus.Locked
                      ? 'unlock'
                      : 'lock'}{' '}
                    this task.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleLockClose} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={handleLockTask} color="primary">
                    Submit
                  </Button>
                </DialogActions>
              </Dialog>
            </>
          )}
        </CardBody>
        <CardFooter>
          {role && role !== UserRole.Translator && (
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              component={NavLink}
              to={`/admin/tasks/create`}
            >
              Create New Task
            </Button>
          )}
        </CardFooter>
      </Card>
    </>
  );
};

export default TasksList;
