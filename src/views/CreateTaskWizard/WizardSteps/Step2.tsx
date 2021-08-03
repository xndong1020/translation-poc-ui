import { useContext } from "react";

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
import { CreateTaskContext } from "../../../context/CreateTaskContext";
import FaceIcon from "@material-ui/icons/Face";

const useStyles = makeStyles((theme: Theme) => ({
  infoText: {
    fontWeight: 300,
    margin: "10px 0 30px",
    textAlign: "center",
  },
  buttons: {
    marginBottom: 3,
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

const Step2 = (props: any) => {
  const { translationItems, addTranslationItems, removeTranslationItems } =
    useContext(CreateTaskContext);
  const classes = useStyles();

  const handleDelete = (idx: number) => {
    removeTranslationItems(idx);
  };

  const initialValues = { keyName: "", keyValue: "" };
  return (
    <GridContainer justifyContent="center">
      <GridItem xs={12} sm={12}>
        <h3 className={classes.infoText}>
          Now add keys for the new translation task
        </h3>
      </GridItem>
      <GridItem xs={12} sm={12}>
        <Card>
          <CardHeader color="rose" icon>
            <CardIcon color="rose">
              <MailOutline />
            </CardIcon>
            <h3 className={classes.cardIconTitle}>Create New Key</h3>
          </CardHeader>
          <CardBody>
            <Formik
              initialValues={initialValues}
              onSubmit={async (values, actions) => {
                const { keyName, keyValue } = values;
                const { resetForm } = actions;
                addTranslationItems({ keyName, keyValue });
                resetForm();
                actions.setSubmitting(false);
              }}
            >
              <Form>
                <label htmlFor="keyName" className={classes.label}>
                  Key Name
                </label>
                <Field
                  id="keyName"
                  name="keyName"
                  className={classes.input}
                  placeholder="Create Translation Key"
                />
                <label htmlFor="keyValue" className={classes.label}>
                  English Translation
                </label>
                <Field
                  id="keyValue"
                  name="keyValue"
                  className={classes.input}
                  placeholder="English translation"
                />
                <Button type="submit" variant="outlined" color="secondary">
                  Add
                </Button>
              </Form>
            </Formik>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            {!!translationItems.length &&
              translationItems.map((key, idx) => (
                <>
                  <Chip
                    key={idx}
                    icon={<FaceIcon />}
                    label={key.keyName}
                    className={classes.buttons}
                    onDelete={(idx) => handleDelete(idx)}
                    color="secondary"
                  />
                  <br />
                </>
              ))}
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
};

export default Step2;
