import { useContext } from "react";

import { CreateTaskContext } from "../../../context/CreateTaskContext";

// core components
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import { Button, Chip, makeStyles, Theme } from "@material-ui/core";
import Card from "../../../components/Card/Card";
import CardHeader from "../../../components/Card/CardHeader";
import CardIcon from "../../../components/Card/CardIcon";
import { MailOutline } from "@material-ui/icons";
import CardBody from "../../../components/Card/CardBody";
import { Field, Form, Formik } from "formik";
import AssignmentLateIcon from "@material-ui/icons/AssignmentLate";

const useStyles = makeStyles((theme: Theme) => ({
  infoText: {
    fontWeight: 300,
    margin: "10px 0 30px",
    textAlign: "center",
  },
  inputAdornmentIcon: {
    color: "#555",
  },
  inputAdornment: {
    position: "relative",
  },
  cardIconTitle: {
    marginTop: "15px",
    marginBottom: "0px",
    color: "#888",
  },
  label: {
    display: "block",
  },
  input: {
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
    lineHeight: "1.9rem",
    marginRight: "1rem",
  },
}));

const Step1 = (props: any) => {
  const { taskName, setTaskName } = useContext(CreateTaskContext);
  const classes = useStyles();

  const handleDelete = () => {
    setTaskName("");
  };

  const initialValues = { taskName: "" };
  return (
    <GridContainer justifyContent="center">
      <GridItem xs={12} sm={12}>
        <h3 className={classes.infoText}>
          Let's start with the new task information (with validation)
        </h3>
      </GridItem>
      <GridItem xs={12} sm={12}>
        <Card>
          <CardHeader color="rose" icon>
            <CardIcon color="rose">
              <MailOutline />
            </CardIcon>
            <h3 className={classes.cardIconTitle}>Create New Task</h3>
          </CardHeader>
          <CardBody>
            {!taskName && (
              <Formik
                initialValues={initialValues}
                onSubmit={async (values, actions) => {
                  const { taskName } = values;
                  setTaskName(taskName);
                  actions.setSubmitting(false);
                }}
              >
                <Form>
                  <label htmlFor="taskName" className={classes.label}>
                    Task Name
                  </label>
                  <Field
                    id="taskName"
                    name="taskName"
                    className={classes.input}
                    placeholder="Create Task Name"
                  />
                  <Button type="submit" variant="outlined" color="secondary">
                    Add
                  </Button>
                </Form>
              </Formik>
            )}
            {!!taskName && (
              <Chip
                icon={<AssignmentLateIcon />}
                label={taskName}
                onDelete={handleDelete}
                color="secondary"
              />
            )}
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
};

export default Step1;
