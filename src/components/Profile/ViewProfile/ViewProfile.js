import React, { useState, useContext } from 'react';
import { Typography, Button, Grid, Divider } from '@material-ui/core';
import { Formik, Field, Form, ErrorMessage, setFieldValue } from 'formik';
import  RadioButtonGroup  from '../../radiobutton/RadioButtonGroup';
import RadioButton from '../../radiobutton/RadioButton';
import  MySelect from '../../Select/Select';
import { AuthContext } from '../../../context/auth-context';
import * as Yup from 'yup';
import useStyles from "../../../styles";

const ViewProfile = (props) => {
    const authContext = useContext(AuthContext);
    const [isSuccess, setSuccess] = useState(false);
    var classes = useStyles();
    const initialValues = {
        firstName: authContext.currentUser.first_name,
        lastName: authContext.currentUser.last_name,
        email: authContext.currentUser.email,
        gender: authContext.currentUser.gender,
        jobType: authContext.currentUser.jobType

    };
    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .required('First Name is required'),
        lastName: Yup.string()
            .required('Last Name is required'),
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        gender: Yup.string().required("A radio option is required"),
        jobType: Yup.string()
        .oneOf(
            ['designer', 'development', 'product', 'other'],
            'Invalid Job Type'
        )
        .required('Required'),
    });
    function onSubmit(values, { setStatus, setSubmitting }) {
        console.log(values);
        let formValues = values;
        setSuccess(false);
        formValues['id'] = authContext.currentUser.id;
        fetch('http://localhost:8000/api/updateFormData', {
            method: "POST",
            headers: {
                "content-type": "application/json",
                'x-access-token': authContext.userToken,
            },
            body: JSON.stringify(formValues)
        })
            .then((result) => result.json())
            .then((info) => {
                console.log(info);
                
                if(info.status === '100') {
                    setSuccess(true);
                    console.log(isSuccess);
                    setSubmitting(false);
                    setStatus();
                    authContext.updateUser(info.user); 
                }
               
            })
    }

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ errors, touched, values, isSubmitting, setFieldValue }) => {
                return (
                    <Grid container className={classes.container}>
                      
                        <div className={classes.formContainer}>
                        { isSuccess && <div>
                        <Typography variant="h5" color="secondary" className={classes.greeting}>
                                User Updated Successfully ..!!
                            </Typography>
                        </div> } 
                            <Typography variant="h3" className={classes.greeting}>
                                View and Edit your Profile
                            </Typography>
                            <Divider className={classes.divider} />
                            <Form className={classes.formContainer}>
                                <Grid container direction="row" justify="space-between" alignItems="center">
                                    <label>Last Name</label>
                                    <Field
                                        name="firstName"
                                        type="text"
                                        className={classes.inputField}
                                    />
                                    <ErrorMessage name="firstName" />
                                    <label>Last Name</label>
                                    <Field
                                        name="lastName"
                                        type="text"
                                        className={classes.inputField}
                                    />
                                    <ErrorMessage name="lastName" />
                                    <label>Email</label>
                                    <Field
                                        name="email"
                                        type="email"
                                        className={classes.inputField}
                                        disabled />
                                    <ErrorMessage name="email" />
                                    <RadioButtonGroup
                                        id="gender"
                                        name="Gender"
                                        label="Select Gender"
                                        value={values.gender}
                                        error={errors.gender}
                                        touched={touched.gender}
                                    >
                                        <Field
                                            component={RadioButton}
                                            name="gender"
                                            id="male"
                                            label="Male"
                                        />
                                        <Field
                                            component={RadioButton}
                                            name="gender"
                                            id="female"
                                            label="Female"
                                        />
                                    </RadioButtonGroup>
                                    <MySelect label="Job Type" name="jobType" value={values.jobType}>
                                    <option value="">Select a job type</option>
                                    <option value="designer">Designer</option>
                                    <option value="development">Developer</option>
                                    <option value="product">Product Manager</option>
                                    <option value="other">Other</option>
                                </MySelect>
                                </Grid>
                                <Grid container direction="column" className={classes.formButton} alignItems="center">

                                    <Button
                                        type="submit"
                                        color="secondary"
                                        disabled={isSubmitting}>
                                        Save
                            </Button>
                                    <Button
                                        type="button"
                                        onClick={() => props.history.push('/app')}
                                    >
                                        Cancel
                            </Button>
                                </Grid>
                            </Form>
                        </div>
                    </Grid>
                );
            }}
        </Formik>
    );
}

export default ViewProfile;
