import { useEffect, useRef, useState } from 'react';

import {
  Avatar,
  Button,
  CardActions,
  CardContent,
  Chip,
  createStyles,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputAdornment,
  makeStyles,
  Radio,
  RadioGroup,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { Form, Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import { searchByText } from '../../services/search.service';
import { TranslationSearchResponse } from '../../graphql/graphqlTypes';
import Card from '../../components/Card/Card';

type SearchResultProps = TranslationSearchResponse;

interface IFormStatus {
  queryText: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: '450px',
      display: 'block',
      margin: '0 auto',
    },
    textField: {
      '& > *': {
        width: '100%',
        marginBottom: '1rem',
      },
    },
    submitButton: {
      marginTop: '24px',
    },
    title: { textAlign: 'center' },
    successMessage: { color: 'green' },
    errorMessage: { color: 'red' },
    inputAdornment: {
      marginRight: '18px',
    },
    inputAdornmentIcon: {
      color: '#555',
    },
  }),
);

const SearchForm = () => {
  const classes = useStyles();
  const isMounted = useRef(true);

  const [searchMethodValue, setSearchMethodValue] = useState('fuzzy');

  const [results, setResults] = useState<SearchResultProps[]>([]);

  // set isMounted to false when we unmount the component
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const loginCurrentUser = async (data: IFormStatus, resetForm: Function) => {
    try {
      // API call integration will be here. Handle success / error response accordingly.
      if (data) {
        const { queryText } = data;
        const res = await searchByText({
          queryText,
          fuzzy: searchMethodValue === 'fuzzy',
        });
        console.log('res', res);
        setResults(res);
        resetForm();
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchMethodValue((event.target as HTMLInputElement).value);
  };

  return (
    <div>
      <Formik
        initialValues={{
          queryText: '',
        }}
        onSubmit={(values: IFormStatus, actions) => {
          loginCurrentUser(values, actions.resetForm);
          setTimeout(() => {
            actions.setSubmitting(false);
          }, 500);
        }}
        validationSchema={Yup.object().shape({
          queryText: Yup.string().required('Enter Search Text'),
        })}
      >
        {(props: FormikProps<IFormStatus>) => {
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
              <h2 className={classes.title}>
                Search Existing Translation from ElasticSearch
              </h2>
              <Grid container justifyContent="flex-end" direction="row">
                <FormControl component="fieldset">
                  <FormLabel component="legend">Search Method</FormLabel>
                  <RadioGroup
                    aria-label="method"
                    name="method1"
                    value={searchMethodValue}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="fuzzy"
                      control={<Radio />}
                      label="Fuzzy Search By English"
                    />
                    <FormControlLabel
                      value="exact"
                      control={<Radio />}
                      label="Exact Match By KeyName"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
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
                    name="queryText"
                    id="queryText"
                    label="Search Translation"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <Search className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                      ),
                    }}
                    value={values.queryText}
                    type="text"
                    helperText={
                      errors.queryText && touched.queryText
                        ? errors.queryText
                        : 'Enter Search Text'
                    }
                    error={errors.queryText && touched.queryText ? true : false}
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
                    fullWidth
                    type="submit"
                    variant="contained"
                    color="secondary"
                    disabled={isSubmitting}
                  >
                    Search
                  </Button>
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
      {!!results.length &&
        results.map((result, idx) => {
          return (
            <Card key={idx}>
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  Match:
                </Typography>
                <Typography variant="h5" component="h2">
                  {result.keyName}
                </Typography>
                <br />
                <Typography color="textSecondary">Description</Typography>
                <Typography variant="body2" component="p">
                  {result.description}
                </Typography>
                <>
                  {!!result.translation &&
                    Object.keys(result.translation)
                      .filter((key) => key !== '__typename')
                      .map((key, index) => {
                        return (
                          <Chip
                            key={index}
                            avatar={<Avatar>{key}</Avatar>}
                            label={
                              result.translation[
                                key as keyof typeof result.translation
                              ] || 'N/A'
                            }
                            variant="outlined"
                          />
                        );
                      })}
                </>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          );
        })}
    </div>
  );
};

export default SearchForm;
