import React, { useContext } from 'react';
import {
  Grid,
  Divider,
  Typography,
  Button,
  Fade,
} from "@material-ui/core";
import { AuthContext } from '../../context/auth-context';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useStyles from "../../styles";

const Auth = props => {
  var authContext = useContext(AuthContext);
  var classes = useStyles();

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

        <Grid container className={classes.container}>
          <div className={classes.formContainer}>
            <Typography variant="h1" className={classes.greeting}>
              Hello, User
          </Typography>
            <Typography variant="h3" color="textSecondary">
              Please log in to continue.
          </Typography>
            <Divider className={classes.divider} />
              <Fade in={authContext.isError}>
                <Typography color="secondary" className={classes.errorMessage}>
                  Something is wrong with your login or password :(
                </Typography>
              </Fade>
              <Form className={classes.formContainer}>
                <Typography color="secondary">Enter Email Address</Typography>
                <Field
                  inputProps={{
                    classes: {
                      underline: classes.textFieldUnderline,
                      input: classes.textField,
                    },
                  }} name="email" type="email" />
                <ErrorMessage name="email" className={classes.errorMessage} />
                  <Button className={classes.formButtons} color="default" type="submit">
                    Login</Button>
              </Form> 
              <Typography color="primary" className={classes.copyright}>
          © 2020 Gaganjot Kaur, All rights reserved.
        </Typography>
          </div>
        </Grid>
      )}
    </Formik>

  );

};

export default Auth;
