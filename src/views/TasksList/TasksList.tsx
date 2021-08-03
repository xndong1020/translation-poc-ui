import { makeStyles } from "@material-ui/core";
import { useEffect, useState, useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Theme } from "@material-ui/core/styles";

// material-ui icons
import SaveIcon from "@material-ui/icons/Save";
import Person from "@material-ui/icons/Person";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";

import Button from "../../components/CustomButtons/Button";
import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";
import Table from "../../components/Table/Table";
import { Task, UserRole } from "../../graphql/graphqlTypes";
import { getAllTasks } from "../../services/task.service";

import extendedTablesStyle from "../../assets/jss/material-dashboard-react/views/extendedTablesStyle";
import { MainContext } from "../../context/MainContext";
import CardFooter from "../../components/Card/CardFooter";

type TaskProps = Pick<Task, "id" | "name" | "savedOn" | "isComplete">;

const useStyles = makeStyles<Theme>(extendedTablesStyle);

const TasksList = () => {
  const [tasks, setTasks] = useState([] as TaskProps[]);
  const classes = useStyles();
  const { role } = useContext(MainContext);
  const history = useHistory();

  useEffect(() => {
    async function loadTasks() {
      const res = await getAllTasks();
      setTasks(res);
    }
    loadTasks();
    return () => {};
  }, []);

  console.log("tasks", tasks);

  const showTaskInfo = (key: any) => {
    console.log("showTaskInfo", key);
  };

  const editTask = (key: any) => {
    history.push(`/translator/tasks/${key}`);
  };

  const deleteTask = (key: any) => {
    console.log("deleteTask", key);
  };

  const simpleButtons = ({
    role,
    taskId,
  }: {
    role: string;
    taskId: number;
  }) => {
    const allBtns = [
      { color: "info", icon: Person, handler: showTaskInfo },
      { color: "success", icon: Edit, handler: editTask },
      { color: "danger", icon: Close, handler: deleteTask },
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
    task.isComplete ? "Y" : "N",
    simpleButtons({ role, taskId: task.id }),
  ]);

  return (
    <>
      <Card>
        <CardBody>
          {!tasks.length && <h3>No task found.</h3>}
          {!!tasks.length && (
            <Table
              tableHead={["#", "Name", "Updated On", "Is Complete?", "Actions"]}
              tableData={[...mappedTasks]}
              customCellClasses={[]}
              customClassesForCells={[]}
              customHeadCellClasses={[]}
              customHeadClassesForCells={[]}
            />
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
