import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
} from "@material-ui/core";
import { useEffect, useState, useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Theme } from "@material-ui/core/styles";

import { DateTime } from "luxon";

// material-ui icons
import SaveIcon from "@material-ui/icons/Save";
import Info from "@material-ui/icons/Info";
import Edit from "@material-ui/icons/Edit";
import Lock from "@material-ui/icons/Lock";

import Button from "../../components/CustomButtons/Button";

import Table from "../../components/Table/Table";
import { Task, UserRole } from "../../graphql/graphqlTypes";
import { getAllTasks, lockTask } from "../../services/task.service";

import extendedTablesStyle from "../../assets/jss/material-dashboard-react/views/extendedTablesStyle";
import { MainContext } from "../../context/MainContext";
import ChartistGraph from "react-chartist";

// core components
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";
import { AccessTime } from "@material-ui/icons";
import { WebSocketContext } from "../../context/WebSocketContext";

type TaskProps = Pick<
  Task,
  "id" | "name" | "savedOn" | "isLocked" | "pendingKeysCount" | "totalKeysCount"
>;

const useStyles = makeStyles<Theme>(extendedTablesStyle);

const TasksList = () => {
  const [tasks, setTasks] = useState([] as TaskProps[]);
  const [openInfo, setOpenInfo] = useState(false);
  const [openLock, setOpenLock] = useState(false);
  const [chartData, setChartData] = useState({
    labels: [""],
    series: [0],
    savedOn: "",
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

  const round = (number: number, decimalPlaces: number) => {
    const factorOfTen = Math.pow(10, decimalPlaces);
    return Math.round(number * factorOfTen) / decimalPlaces;
  };

  const showTaskInfo = (key: any) => {
    const t = tasks.find((t) => t.id === key);
    if (t) {
      const { totalKeysCount, pendingKeysCount, savedOn } = t;

      const pending = pendingKeysCount! / totalKeysCount!;
      const complete = (totalKeysCount! - pendingKeysCount!) / totalKeysCount!;
      setChartData({
        labels: [`${round(pending, 2)}%`, `${round(complete, 2)}%`],
        series: [round(pending, 2), round(complete, 2)],
        savedOn,
      });
    }
    handleInfoOpen();
  };

  const editTask = (key: any) => {
    history.push(`/translator/tasks/${key}`);
  };

  const handleLockOpen = async (key: any) => {
    console.log("lockTask", key);
    setOpenLock(true);
    setTaskId(key);
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
      await lockTask(taskId);
    }
    setOpenLock(false);
  };

  const simpleButtons = ({
    role,
    taskId,
    isLocked,
  }: {
    role: string;
    taskId: number;
    isLocked: boolean;
  }) => {
    const allBtns = [
      { color: "info", icon: Info, handler: showTaskInfo },
      { color: "success", icon: isLocked ? Lock : Edit, handler: editTask },
      { color: "danger", icon: Lock, handler: handleLockOpen },
    ];

    let userBtns = [];

    if (role === UserRole.Translator) {
      userBtns = allBtns.filter((btn) => btn.color === "success");
    } else {
      userBtns = allBtns.filter((btn) => btn.color !== "success");
    }

    const btns = userBtns.map((prop, key) => {
      return (
        <Button
          color={prop.color}
          disabled={role === UserRole.Translator && isLocked}
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
    task.isLocked ? "Y" : "N",
    simpleButtons({ role, taskId: task.id, isLocked: task.isLocked }),
  ]);

  return (
    <>
      <Card>
        <CardBody>
          {!tasks.length && <h3>No task found.</h3>}
          {!!tasks.length && (
            <>
              <Table
                tableHead={["#", "Name", "Updated On", "Is Locked?", "Actions"]}
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
                            <AccessTime /> updated on{" "}
                            {DateTime.fromISO(chartData.savedOn, {
                              zone: "Australia/Sydney",
                            })
                              .toLocal()
                              .toLocaleString(
                                DateTime.DATETIME_SHORT_WITH_SECONDS
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
                    Please Confirm that you want to lock this task.
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
