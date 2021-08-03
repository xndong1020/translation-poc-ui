// eslint-disable
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { allLanguages } from "../../constants/constants";
import {
  TranslationTaskResponse,
  UpdateTranslationLanguageInput,
} from "../../graphql/graphqlTypes";
import { getMyTask } from "../../services/task.service";
import { Edit } from "@material-ui/icons";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";

// core components
import extendedTablesStyle from "../../assets/jss/material-dashboard-react/views/extendedTablesStyle";
import Button from "../../components/CustomButtons/Button";
import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";
import Table from "../../components/Table/Table";
import {
  getMyTaskLanguage,
  updateTranslationLanguage,
} from "../../services/language.service";

const useStyles = makeStyles<Theme>(extendedTablesStyle);

interface ParamTypes {
  id: string;
}

// add an index to TranslationTaskResponse

const TaskItem = () => {
  const { id } = useParams<ParamTypes>();
  const initValue: TranslationTaskResponse[] = [];
  const [translationList, setTranslationList] = useState(initValue);
  const [open, setOpen] = useState(false);
  const [taskLanguage, setTaskLanguage] = useState("");
  const [currentRecord, setCurrentRecord] = useState({
    langId: 0,
    key: "",
    en: "",
  });
  const [translate, setTranslate] = useState("");
  const classes = useStyles();

  useEffect(() => {
    async function getInitData(taskId: number) {
      const myTaskLanguage = await getMyTaskLanguage(taskId);
      setTaskLanguage(myTaskLanguage);
      const res = await getMyTask({
        taskId,
        myTaskLanguage,
      });
      setTranslationList(res);
    }
    getInitData(+id);
    return () => {};
  }, [id]);

  const regularHeaders = ["#", "key", "en", taskLanguage];

  const editTranslation = (
    taskId: number,
    currentRecord: {
      langId: number;
      key: string;
      en: string;
    }
  ) => {
    handleClickOpen();
    setCurrentRecord(currentRecord);
  };

  const simpleButtons = ({
    taskId,
    currentRecord,
  }: {
    taskId: number;
    currentRecord: {
      langId: number;
      key: string;
      en: string;
    };
  }) => {
    const allBtns = [
      { color: "success", icon: Edit, handler: editTranslation },
    ];

    const btns = allBtns.map((prop, key) => {
      return (
        <Button
          color={prop.color}
          simple
          onClick={(e: any) => prop.handler(taskId, currentRecord)}
          className={classes.actionButton}
          key={key}
        >
          <prop.icon className={classes.icon} />
        </Button>
      );
    });
    return btns;
  };

  const headers = [...regularHeaders, "Actions"];
  const contents = translationList.map((r) => [
    r.languageId,
    r.keyName,
    r.en,
    r.assignedLanguageValue,
    simpleButtons({
      taskId: +id,
      currentRecord: {
        langId: r.languageId,
        key: r.keyName,
        en: r.en,
      },
    }),
  ]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTranslate("");
  };

  const handleChange = (input: string) => {
    setTranslate(input);
  };

  const handleSubmit = async () => {
    const langs = headers.filter((h) => h && allLanguages.includes(h));
    if (langs.length && translate) {
      const input: UpdateTranslationLanguageInput & {
        [key: string]: string;
      } = {};

      for (const lang of langs) {
        if (lang && translate) input[lang] = translate;
      }

      const { ok, error } = await updateTranslationLanguage({
        id: currentRecord.langId,
        ...input,
      });

      if (ok) {
        const res = await getMyTask({
          taskId: +id,
          myTaskLanguage: taskLanguage,
        });
        setTranslationList(res);
        setOpen(false);
      }
    }
  };

  return (
    <>
      <Card>
        <CardBody>
          {translationList && (
            <Table
              tableHead={headers}
              tableData={contents}
              customCellClasses={[]}
              customClassesForCells={[]}
              customHeadCellClasses={[]}
              customHeadClassesForCells={[]}
            />
          )}
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Enter translation</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Enter your translation for Key {currentRecord.key}. For example,
                in English it is {currentRecord.en}
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="translate"
                label={`Translation for ${currentRecord.key}`}
                type="text"
                onChange={(e: any) => handleChange(e.target.value)}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleSubmit} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </CardBody>
      </Card>
    </>
  );
};

export default TaskItem;
