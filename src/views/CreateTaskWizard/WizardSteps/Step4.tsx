import { useContext } from "react";

// core components
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import { Avatar, Chip, makeStyles, Theme, Typography } from "@material-ui/core";
import Card from "../../../components/Card/Card";
import CardHeader from "../../../components/Card/CardHeader";
import CardIcon from "../../../components/Card/CardIcon";
import { MailOutline } from "@material-ui/icons";
import CardBody from "../../../components/Card/CardBody";
import { CreateTaskContext } from "../../../context/CreateTaskContext";
import FaceIcon from "@material-ui/icons/Face";

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

const Step4 = (props: any) => {
  const classes = useStyles();

  const { taskName, translationItems, assignees } =
    useContext(CreateTaskContext);

  return (
    <GridContainer justifyContent="center">
      <GridItem xs={12} sm={12}>
        <h3 className={classes.infoText}>Please Confirm Task Details</h3>
      </GridItem>
      <GridItem xs={12} sm={12}>
        <Card>
          <CardHeader color="rose" icon>
            <CardIcon color="rose">
              <MailOutline />
            </CardIcon>
            <h4 className={classes.cardIconTitle}>Task Name: {taskName}</h4>
          </CardHeader>
          <CardBody>
            <h4>Keys</h4>
            {translationItems.map((key, index) => (
              <>
                <Chip
                  avatar={<Avatar>{key.keyName[0]}</Avatar>}
                  label={key.keyName}
                  color="primary"
                />
                <br />
                <br />
              </>
            ))}
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            {!!assignees.length &&
              assignees.map((key, idx) => (
                <>
                  <Chip
                    key={idx}
                    icon={<FaceIcon />}
                    label={`${key.language} -> ${key.email}`}
                    color="secondary"
                  />
                  <br />
                  <br />
                </>
              ))}
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
};

export default Step4;
