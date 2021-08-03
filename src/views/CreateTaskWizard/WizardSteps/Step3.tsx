import { useContext, useEffect, useState } from "react";

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
import { allLanguages } from "../../../constants/constants";

const useStyles = makeStyles((theme: Theme) => ({
  infoText: {
    fontWeight: 300,
    margin: "10px 0 30px",
    textAlign: "center",
  },
  buttons: {
    marginBottom: 8,
  },
  dropdown: {
    lineHeight: "2rem",
    height: "2rem",
    minHeight: "2rem",
    fontSize: "1rem",
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

interface ISelected {
  language: string;
  email: string;
}

const Step3 = (props: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState([] as string[]);
  const [selected, setSelected] = useState([] as ISelected[]);

  const { setAssignees } = useContext(CreateTaskContext);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      setAssignees(selected);
    }
    return () => {
      isMounted = false;
    };
  }, [selected, setAssignees]);

  const classes = useStyles();

  let unassignedLanguages = [...allLanguages];
  unassignedLanguages = unassignedLanguages.filter((key) => {
    return !selectedLanguage.includes(key);
  });

  const handleDelete = (language: string) => {
    const foundIdx = selectedLanguage.findIndex((lang) => lang === language);
    const langs = [...selectedLanguage];
    langs.splice(foundIdx, 1);
    setSelectedLanguage(langs);

    const selectedFoundIdx = selected.findIndex((s) => s.language === language);
    const selectedCopy = [...selected];
    selectedCopy.splice(selectedFoundIdx, 1);
    setSelected(selectedCopy);
  };

  const initialValues = { email: "" };
  return (
    <GridContainer justifyContent="center">
      <GridItem xs={12} sm={12}>
        <h4 className={classes.infoText}>
          Now assign translation tasks to translators
        </h4>
      </GridItem>
      <GridItem xs={12} sm={12}>
        <Card>
          <CardHeader color="rose" icon>
            <CardIcon color="rose">
              <MailOutline />
            </CardIcon>
            <h3 className={classes.cardIconTitle}>Assign to translators</h3>
          </CardHeader>
          <CardBody>
            <Formik
              initialValues={initialValues}
              onSubmit={async (values, actions) => {
                const { email } = values;
                const { setFieldValue } = actions;
                setFieldValue("email", "");
                setCurrentIndex(0);
                setSelectedLanguage([
                  ...selectedLanguage,
                  unassignedLanguages[currentIndex],
                ]);
                setSelected([
                  ...selected,
                  {
                    language: unassignedLanguages[currentIndex],
                    email: email,
                  },
                ]);
                actions.setSubmitting(false);
              }}
            >
              <Form>
                {!!unassignedLanguages.length && (
                  <Field
                    as="select"
                    name="languages"
                    className={classes.dropdown}
                    onChange={(e: any) => {
                      console.log("onChange", e.target.selectedIndex);
                      setCurrentIndex(e.target.selectedIndex);
                    }}
                  >
                    {unassignedLanguages.map((lang, idx) => (
                      <option key={idx} value={lang}>
                        {lang}
                      </option>
                    ))}
                  </Field>
                )}
                {!!unassignedLanguages.length && (
                  <>
                    <label htmlFor="email" className={classes.label}>
                      Assign to:
                    </label>
                    <Field
                      id="email"
                      name="email"
                      className={classes.input}
                      placeholder="Assign to a translator by email"
                    />
                    <Button type="submit" variant="outlined" color="secondary">
                      Add
                    </Button>
                  </>
                )}
              </Form>
            </Formik>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            {!!selected.length &&
              selected.map((key, idx) => (
                <>
                  <Chip
                    key={idx}
                    icon={<FaceIcon />}
                    className={classes.buttons}
                    label={`${key.language} -> ${key.email}`}
                    onDelete={(key) => handleDelete(key.language)}
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

export default Step3;
