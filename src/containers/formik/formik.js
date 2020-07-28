import React from 'react';
import { Formik, Form, useField, Field } from 'formik';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import { Checkbox } from '../../components/checkbox/checkbox';
import CheckboxGroup from '../../components/checkbox/checkbox';

import { useApolloClient } from 'react-apollo-hooks';
import gql from 'graphql-tag';

import classes from './formik.module.css';

const MyTextInput = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and also replace ErrorMessage entirely.
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <input className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className={classes.Error}>{meta.error}</div>
            ) : null}
        </>
    );
};

// Radio input
const RadioButton = ({
    field: { name, value, onChange, onBlur },
    id,
    label,
    className,
    ...props
}) => {
    return (
        <div>
            <input
                name={name}
                id={id}
                type="radio"
                value={id} // could be something else for output?
                checked={id === value}
                onChange={onChange}
                onBlur={onBlur}
                className={classes.radio}
                {...props}
            />
            <label htmlFor={id}>{label}</label>
        </div>
    );
};

// Radio group
const RadioButtonGroup = ({
    value,
    error,
    touched,
    id,
    label,
    name,
    children
}) => {
    return (
        <div className={classes.radioLabel}>
            <label htmlFor={name} > {label} </label>
            {children}
            {touched && error ? (
                <div className={classes.Error}>{error}</div>
            ) : null}
        </div>
    );
};

// Select
const MySelect = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <select {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className={classes.Error}>{meta.error}</div>
            ) : null}
        </>
    );
};

// Add user mutation
const ADD_USER_MUTATION = gql`
mutation ADD_USER_MUTATION(
    $first_name: String!,
    $last_name: String!, 
    $email: String!, 
    $jobType: String!,
    $gender: String!,
    $hobbies: [String]
    ) {
      addUser(
      first_name: $first_name,
       last_name: $last_name, 
       email: $email, 
       jobType: $jobType,
       gender: $gender,
       hobbies: $hobbies,
       role:0,
       is_deleted:0
       ){
        id
       }
}
`
// update user mutation
const UPDATE_USER_MUTATION = gql`
mutation UPDATE_USER_MUTATION(
    $id: ID!,
    $first_name: String!,
    $last_name: String!, 
    $email: String!, 
    $jobType: String!,
    $gender: String!,
    $hobbies: [String]
    ) {
      updateUser(
       id: $id,
       first_name: $first_name,
       last_name: $last_name, 
       email: $email, 
       jobType: $jobType,
       gender: $gender,
       hobbies: $hobbies,
       role:0,
       is_deleted:0
       ){
        id
       }
}
`

const ExampleForm = (props) => {
    const client = useApolloClient();
    const history = useHistory();
    let userDetails = {};
    let currentUserId = '';

    if (props.location.state !== undefined) {
        userDetails = props.location.state.user;
        currentUserId = props.location.state.user.id;
    }

    const initialValues = {
        first_name: userDetails.first_name ? userDetails.first_name : '',
        last_name: userDetails.last_name ? userDetails.last_name : '',
        email: userDetails.email ? userDetails.email : '',
        gender: userDetails.gender ? userDetails.gender : '',
        jobType: userDetails.jobType ? userDetails.jobType : '',
        hobbies: userDetails.hobbies ? userDetails.hobbies : [],
    };

    const validationSchema = Yup.object({
        first_name: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
        last_name: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
        jobType: Yup.string()
            .oneOf(
                ['designer', 'development', 'product', 'other'],
                'Invalid Job Type'
            )
            .required('Required'),
        gender: Yup.string().required("A radio option is required"),
        hobbies: Yup.array().required(
            "At least one checkbox is required"
        ),
    });


    const saveFormData = async (values, setSubmitting, resetForm) => {
        let formData = new FormData();
        formData.append('file', values.file);
        formData.append('formValues', JSON.stringify(values));

        if (currentUserId != '') {
            let userData = { ...values };
            userData['id'] = currentUserId;
            const { data, error, loading } = await client.mutate({
                variables: { ...userData },
                mutation: UPDATE_USER_MUTATION,
            });
            if (data) {
                resetForm({});
                setSubmitting(false);
                history.push('/app/users');
            }
        } else {
            const { data, error, loading } = await client.mutate({
                variables: { ...values },
                mutation: ADD_USER_MUTATION,
            });
            if (data) {
                resetForm({});
                setSubmitting(false);
                history.push('/app/users');
            }
        }
    }

    return (
        <>
        <div  className={classes.backButton}> <Button variant="text" size="small" color="secondary" href="users">
             Back
    </Button></div>
            <div className={classes.Main}>
                {/* <h1>Form Handling</h1> */}
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting, resetForm, setFieldValue }) => {
                       // console.log(isSubmitting);
                        saveFormData(values, setSubmitting, resetForm);
                    }}
                >
                    {({ setFieldValue,
                        setFieldTouched,
                        values,
                        touched,
                        isSubmitting,
                        errors,
                        isValid,
                        dirty }) => (
                            <Form id="form-example" className={classes.FormData}>
                                <MyTextInput
                                    label="First Name"
                                    name="first_name"
                                    type="text"
                                    placeholder="Enter First name"
                                />
                                <MyTextInput
                                    label="Last Name"
                                    name="last_name"
                                    type="text"
                                    placeholder="Enter Last name"
                                />
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
                                <MyTextInput
                                    label="Email Address"
                                    name="email"
                                    type="email"
                                    placeholder="example@abc.com"
                                />
                                <MySelect label="Job Type" name="jobType">
                                    <option value="">Select a job type</option>
                                    <option value="designer">Designer</option>
                                    <option value="development">Developer</option>
                                    <option value="product">Product Manager</option>
                                    <option value="other">Other</option>
                                </MySelect>
                                <CheckboxGroup
                                    id="hobbies"
                                    name="hobbies"
                                    label="Select Hobbies"
                                    value={values.hobbies}
                                    error={errors.hobbies}
                                    touched={touched.hobbies}
                                    onChange={setFieldValue}
                                    onBlur={setFieldTouched}
                                >
                                    <Field
                                        component={Checkbox}
                                        name="hobbies"
                                        id="dancing"
                                        label="Dancing"
                                    />
                                    <Field
                                        component={Checkbox}
                                        name="hobbies"
                                        id="music"
                                        label="Music"
                                    />
                                    <Field
                                        component={Checkbox}
                                        name="hobbies"
                                        id="others"
                                        label="Others"
                                    />
                                </CheckboxGroup>
                                <div className={classes.Footer}>
                                <button disabled={!(isValid)} type="submit"> {isSubmitting ?<CircularProgress color="secondary" /> : 'Save' }</button>                                  
                                    <button type="reset">Reset</button>
                                </div>
                            </Form>
                        )}
                </Formik>
            </div>
        </>
    );
}

export default ExampleForm;