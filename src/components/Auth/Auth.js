import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { AuthContext } from '../../context/auth-context';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import classes from './Auth.module.css';


const useStyles = makeStyles({
  root: {
    width: 500,
  },
});


const Auth = props => {
  var authContext = useContext(AuthContext);

  // const loginHandler = () => {
  //   authContext.login();
  // };
  
  return (

    <Formik
      initialValues={{ email: '' }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email('Invalid email address')
          .required('Required')
      })}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        authContext.login(values);
      }}
    >
      {({ values }) => (
        <Card className={classes.root}>
          <CardContent>
            <Typography variant="h5" component="h5">
              You are not authenticated!
          </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Please log in to continue.
          </Typography>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Form>
                <label htmlFor="email">Email address</label>
                <Field className={classes.Search} name="email" type="email" />
                <ErrorMessage name="email" />
                <Button color="default" type="submit">
                  Login</Button>
                {/* <button className={classes.SearchButton} type="submit">Login</button> */}
              </Form>
            </Grid>
          </CardContent>
        </Card>
      )}
    </Formik>
  );
 
};

export default Auth;
