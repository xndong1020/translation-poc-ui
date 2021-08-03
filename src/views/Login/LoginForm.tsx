import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Button,
  createStyles,
  Grid,
  InputAdornment,
  makeStyles,
  TextField,
  Theme,
} from "@material-ui/core";
import { Email, Face } from "@material-ui/icons";
import { Form, Formik, FormikProps } from "formik";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { ILoginForm, loginUser, me } from "../../services/auth.service";
import { MainContext } from "../../context/MainContext";

interface IFormStatus {
  message: string;
  type: string;
}

interface IFormStatusProps {
  [key: string]: IFormStatus;
}

const formStatusProps: IFormStatusProps = {
  success: {
    message: "Logged in successfully.",
    type: "success",
  },
  error: {
    message: "Invalid username/password. Please try again.",
    type: "error",
  },
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: "450px",
      display: "block",
      margin: "0 auto",
    },
    textField: {
      "& > *": {
        width: "100%",
        marginBottom: "1rem",
      },
    },
    submitButton: {
      marginTop: "24px",
    },
    title: { textAlign: "center" },
    successMessage: { color: "green" },
    errorMessage: { color: "red" },
    inputAdornment: {
      marginRight: "18px",
    },
    inputAdornmentIcon: {
      color: "#555",
    },
  })
);

const LoginForm = () => {
  const classes = useStyles();
  const [isSending, setIsSending] = useState(false);
  const isMounted = useRef(true);
  const history = useHistory();

  const { setRole } = useContext(MainContext);

  // set isMounted to false when we unmount the component
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const [displayFormStatus, setDisplayFormStatus] = useState(false);
  const [formStatus, setFormStatus] = useState<IFormStatus>({
    message: "",
    type: "",
  });

  const loginCurrentUser = async (data: ILoginForm, resetForm: Function) => {
    try {
      // API call integration will be here. Handle success / error response accordingly.
      if (data) {
        await sendRequest(data);
        setFormStatus(formStatusProps.success);
      }
    } catch (error) {
      setFormStatus(formStatusProps.error);
    } finally {
      setDisplayFormStatus(true);
    }
  };

  const sendRequest = useCallback(
    async ({ email, password }) => {
      // don't send again while we are sending
      if (isSending) return;
      // update state
      setIsSending(true);
      // send the actual request
      const res = await loginUser({ email, password });

      const { error, ok, token } = res;

      if (error) throw new Error("Login failed");

      if (ok && token) {
        localStorage.setItem("token", token);
        // fetch role info from 'me'
        const { role } = await me();
        // setRole
        setRole(role);
        setTimeout(() => {
          history.push("/");
        }, 500);
      }

      // once the request is sent, update state again
      if (isMounted.current) {
        // only update if we are still mounted
        setIsSending(false);
      }
    },
    [isSending, history, setRole]
  ); // update the callback if the state changes

  return (
    <div>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={(values: ILoginForm, actions) => {
          loginCurrentUser(values, actions.resetForm);
          setTimeout(() => {
            actions.setSubmitting(false);
          }, 500);
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email().required("Enter valid email-id"),
          password: Yup.string().required(
            "Please valid password. One uppercase, one lowercase, one special character and no spaces"
          ),
        })}
      >
        {(props: FormikProps<ILoginForm>) => {
          const {
            values,
            touched,
            errors,
            handleBlur,
            handleChange,
            isSubmitting,
          } = props;
          return (
            <Form>
              <h2 className={classes.title}>Login</h2>
              <Grid container justifyContent="space-around" direction="row">
                <Grid
                  item
                  lg={10}
                  md={10}
                  sm={10}
                  xs={10}
                  className={classes.textField}
                >
                  <TextField
                    name="email"
                    id="email"
                    label="Email Address"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                      ),
                    }}
                    value={values.email}
                    type="email"
                    helperText={
                      errors.email && touched.email
                        ? errors.email
                        : "Enter email address"
                    }
                    error={errors.email && touched.email ? true : false}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid
                  item
                  lg={10}
                  md={10}
                  sm={10}
                  xs={10}
                  className={classes.textField}
                >
                  <TextField
                    name="password"
                    id="password"
                    label="Password"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Face className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                      ),
                    }}
                    value={values.password}
                    type="password"
                    helperText={
                      errors.password && touched.password
                        ? "Please valid password. One uppercase, one lowercase, one special character and no spaces"
                        : "One uppercase, one lowercase, one special character and no spaces"
                    }
                    error={errors.password && touched.password ? true : false}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid
                  item
                  lg={10}
                  md={10}
                  sm={10}
                  xs={10}
                  className={classes.submitButton}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    disabled={isSubmitting}
                  >
                    Login
                  </Button>
                  {displayFormStatus && (
                    <div className="formStatus">
                      {formStatus.type === "error" ? (
                        <p className={classes.errorMessage}>
                          {formStatus.message}
                        </p>
                      ) : formStatus.type === "success" ? (
                        <p className={classes.successMessage}>
                          {formStatus.message}
                        </p>
                      ) : null}
                    </div>
                  )}
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default LoginForm;
