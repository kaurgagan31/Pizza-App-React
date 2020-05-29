import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import classes from './Search.module.css';

const SearchForm = (props) => {
    return (
        <Formik
            initialValues={{ firstName: '', gender: '', hobbies: '' }}
            validationSchema={Yup.object({
                firstName: Yup.string()
                    .max(15, 'Must be 15 characters or less'),
                gender: Yup.string()
                    .max(6, 'Must be 6 characters or less')
            })}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                props.searchData(values);
            }}
        >
            {({ values }) => (
                <Form>
                    <label htmlFor="firstName">First Name</label>
                    <Field className={classes.Search} name="firstName" type="text" />
                    <ErrorMessage name="firstName" />
                    <label htmlFor="gender">Gender</label>
                    <Field className={classes.Search} name="gender" type="text" />
                    <ErrorMessage name="gender" />
                    <label htmlFor="hobbies">Hobbies</label>
                    <Field className={classes.Search} name="hobbies" type="text" />
                    <button className={classes.SearchButton} type="submit">Search</button>
                </Form>
            )}
                                                                                                 
        </Formik>
    );
};

export default SearchForm;
