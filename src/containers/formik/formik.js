import React from 'react';
import { Formik, Form, useField, Field } from 'formik';
import * as Yup from 'yup';

import Thumb from '../../components/File/file';
import { Checkbox } from '../../components/checkbox/checkbox';
import CheckboxGroup from '../../components/checkbox/checkbox';

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

const MyCheckbox = ({ children, ...props }) => {
    // We need to tell useField what type of input this is
    // since React treats radios and checkboxes differently
    // than inputs/select/textarea.
    const [field, meta] = useField({ ...props, type: 'checkbox' });
    return (
        <>
            <label className="checkbox">
                <input type="checkbox" {...field} {...props} />
                {children}
            </label>
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

const ExampleForm = (props) => {

    const saveFormData = (values, setSubmitting, resetForm) => {
        let formData = new FormData();
        formData.append('file', values.file);
        formData.append('formValues', JSON.stringify(values));

        fetch('http://localhost:8000/api/saveFormData', {
            method: "POST",
            headers: {
            },
            body: formData
        })
            .then((result) => result.json())
            .then((info) => {
                console.log(info);
                resetForm({});
                alert(info.message);
                setSubmitting(false);
                
            })
    }

    return (
        <>
            <div className={classes.Main}>
                <h1>Form Handling</h1>
                <Formik
                    initialValues={{
                        firstName: '', lastName: '', email: '', jobType: '', gender: '', file: '',
                        hobbies: [],
                        acceptedTerms: false
                    }}
                    validationSchema={Yup.object({
                        firstName: Yup.string()
                            .max(15, 'Must be 15 characters or less')
                            .required('Required'),
                        lastName: Yup.string()
                            .max(20, 'Must be 20 characters or less')
                            .required('Required'),
                        email: Yup.string()
                            .email('Invalid email address')
                            .required('Required'),
                        acceptedTerms: Yup.boolean()
                            .required('Required')
                            .oneOf([true], 'You must accept the terms and conditions.'),
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
                        file: Yup.mixed().required(),
                    })}
                    onSubmit={(values, { setSubmitting, resetForm, setFieldValue }) => {
                            console.log(values);
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
                                    name="firstName"
                                    type="text"
                                    placeholder="Enter First name"
                                />
                                <MyTextInput
                                    label="Last Name"
                                    name="lastName"
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

                                <label htmlFor="file">File upload</label>
                                <input id="file" name="file" type="file" onChange={(event) => {
                                    setFieldValue("file", event.currentTarget.files[0]);
                                }} className="form-control" />
                                <Thumb file={values.file} />
                                <MyCheckbox name="acceptedTerms">
                                    I accept the terms and conditions
                        </MyCheckbox>
                                <div className={classes.Footer}>
                                    <button disabled={!(isValid && dirty)} type="submit">Submit</button>
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