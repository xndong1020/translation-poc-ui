import { useContext, useRef, useState } from "react";

// core components
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import { Button, Chip, makeStyles, Tab, Tabs, Theme } from "@material-ui/core";
import Card from "../../../components/Card/Card";
import CardHeader from "../../../components/Card/CardHeader";
import CardIcon from "../../../components/Card/CardIcon";
import { Create, MailOutline, Publish } from "@material-ui/icons";
import CardBody from "../../../components/Card/CardBody";
import { Field, Form, Formik } from "formik";
import { CreateTaskContext } from "../../../context/CreateTaskContext";
import FaceIcon from "@material-ui/icons/Face";

import { CSVReader } from "react-papaparse";
import TabPanel from "../../../components/TabPanel/TabPanel";

const useStyles = makeStyles((theme: Theme) => ({
  infoText: {
    fontWeight: 300,
    margin: "10px 0 30px",
    textAlign: "center",
  },
  buttons: {
    marginBottom: 3,
  },
  uploadButton: {
    borderRadius: 0,
    border: 0,
    background: "#f50057",
    color: "#eee",
    marginLeft: 0,
    marginRight: 0,
    width: "40%",
    paddingLeft: 0,
    paddingRight: 0,
    "&:hover": {
      background: "#ec407a",
    },
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
  const buttonRef = useRef<any>(null);
  const classes = useStyles();

  const [value, setValue] = useState(0);

  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };

  const handleDelete = (idx: number) => {
    removeTranslationItems(idx);
  };

  const handleOpenDialog = (e: any) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.open(e);
    }
  };

  const handleOnFileLoad = (dataFromCSV: any[]) => {
    console.log("---------------------------");
    console.log("dataset", dataFromCSV);

    const dataSet: { keyName: string; keyValue: string }[] = [];
    dataFromCSV.forEach((d: any) => {
      console.log("d", d.data);
      if (d.data.length === 2) {
        const [keyName, keyValue] = d.data;
        dataSet.push({ keyName, keyValue });
      }
    });
    addTranslationItems(dataSet);
    console.log("---------------------------");
  };

  const handleOnError = (err: any, file: any, inputElem: any, reason: any) => {
    console.log(err);
  };

  const handleOnRemoveFile = (data: any) => {
    console.log("---------------------------");
    console.log(data);
    console.log("---------------------------");
  };

  const handleRemoveFile = (e: any) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current !== null) {
      buttonRef.current!.removeFile(e);
    }
  };

  function a11yProps(index: number) {
    return {
      id: `scrollable-prevent-tab-${index}`,
      "aria-controls": `scrollable-prevent-tabpanel-${index}`,
    };
  }

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
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="scrollable prevent tabs example"
            >
              <Tab
                icon={<Create />}
                label="Enter"
                aria-label="phone"
                {...a11yProps(0)}
                style={{ width: "50%" }}
              />
              <Tab
                icon={<Publish />}
                label="Upload CSV"
                aria-label="favorite"
                {...a11yProps(1)}
                style={{ width: "50%" }}
              />
            </Tabs>
            <TabPanel value={value} index={0}>
              <Formik
                initialValues={initialValues}
                onSubmit={async (values, actions) => {
                  const { keyName, keyValue } = values;
                  const { resetForm } = actions;
                  addTranslationItems([{ keyName, keyValue }]);
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
            </TabPanel>
            <TabPanel value={value} index={1}>
              <CSVReader
                ref={buttonRef}
                onFileLoad={handleOnFileLoad}
                onError={handleOnError}
                noClick
                noDrag
                onRemoveFile={handleOnRemoveFile}
              >
                {({ file }: { file: any }) => (
                  <aside
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginBottom: 10,
                    }}
                  >
                    <Button
                      onClick={handleOpenDialog}
                      className={classes.uploadButton}
                    >
                      Browse file
                    </Button>
                    <div
                      style={{
                        borderWidth: 1,
                        borderStyle: "solid",
                        borderColor: "#ccc",
                        height: 45,
                        lineHeight: 2.5,
                        marginTop: 5,
                        marginBottom: 5,
                        paddingLeft: 13,
                        paddingTop: 3,
                        width: "60%",
                      }}
                    >
                      {file && file.name}
                    </div>
                    <button
                      style={{
                        borderRadius: 0,
                        marginLeft: 0,
                        marginRight: 0,
                        paddingLeft: 20,
                        paddingRight: 20,
                      }}
                      onClick={handleRemoveFile}
                    >
                      Remove
                    </button>
                  </aside>
                )}
              </CSVReader>
            </TabPanel>
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
