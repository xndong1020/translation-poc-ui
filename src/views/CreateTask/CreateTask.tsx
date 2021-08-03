import React, { useContext } from "react";
import { MailOutline } from "@material-ui/icons";
import { Button, makeStyles, Theme } from "@material-ui/core";
import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";
import CardHeader from "../../components/Card/CardHeader";
import CardIcon from "../../components/Card/CardIcon";
import GridItem from "../../components/Grid/GridItem";
import { Formik, Form, Field } from "formik";
import { createTask } from "../../services/task.service";
import { CreateTaskContext } from "../../context/CreateTaskContext";

const useStyles = makeStyles((theme: Theme) => ({
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

interface MyFormValues {
  keyText: string;
}

const CreateTask = () => {
  const initialValues: MyFormValues = { keyText: "" };
  const { taskName, setTaskName } = useContext(CreateTaskContext);
  const classes = useStyles();

  return (
    <div>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="rose" icon>
            <CardIcon color="rose">
              <MailOutline />
            </CardIcon>
            <h3 className={classes.cardIconTitle}>Create New Task</h3>
          </CardHeader>
          <CardBody>
            <Formik
              initialValues={initialValues}
              onSubmit={async (values, actions) => {
                console.log({ values, actions });
                const { keyText } = values;
                setTaskName(keyText);
                console.log("res", taskName);
                actions.setSubmitting(false);
              }}
            >
              <Form>
                <label htmlFor="keyText" className={classes.label}>
                  Key Text
                </label>
                <Field
                  id="keyText"
                  name="keyText"
                  className={classes.input}
                  placeholder="Add translation key"
                />
                <Button type="submit" variant="outlined" color="secondary">
                  Add
                </Button>
              </Form>
            </Formik>
          </CardBody>
        </Card>
      </GridItem>
    </div>
  );
};

export default CreateTask;
