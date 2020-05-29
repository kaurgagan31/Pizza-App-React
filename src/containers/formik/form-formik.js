import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import classes from './formik.module.css';

const hobbiesOptions = [
    {
        label: 'Dancing',
        value: 'Dancing'
    },
    {
        label: 'Music',
        value: 'Music'
    },
    {
        label: 'Cooking',
        value: 'Cooking'
    },
    {
        label: 'Others',
        value: 'Others'
    }
];

const Checkbox = (props) => {
    console.log(props);
    return (
        <Field name={props.name}>
            {({ field, form }) => (
                <label>
                    <input
                        {...field}
                        type="checkbox"
                        checked={field.value.includes(props.value)}
                        onChange={() => {
                            const set = new Set(field.value);
                            if (set.has(props.value)) {
                                set.delete(props.value);
                            } else {
                                set.add(props.value);
                            }
                            field.onChange(field.name)(Array.from(set));
                            form.setFieldTouched(field.name, true);
                        }}
                    />
                    {props.value}
                </label>
            )}
        </Field>
    );
}

const SignupForm = () => {
    return (
        <Formik
            initialValues={{ firstName: '', lastName: '', email: '', jobType: '', file: '', hobbies: [], gender:'', acceptTerms: false }}
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
                jobType: Yup.string()
                    .oneOf(
                        ['designer', 'development', 'product', 'other'],
                        'Invalid Job Type'
                    )
                    .required('Required'),
                // hobbies: Yup.array().required('At least one checkbox is required'),
                file: Yup.mixed().required(),
                acceptTerms: Yup.bool().oneOf([true], 'Accept Terms & Conditions is required'),
            })}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    console.log(values);
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 400);
            }}
        >
            {({ values, formik, handleSubmit, setFieldValue, isValid, dirty }) => (
                <div>
                    <h1>Form Handling</h1>
                    <Form className={classes.FormData}>
                        <label htmlFor="firstName">First Name</label>
                        <Field name="firstName" type="text" />
                        <ErrorMessage name="firstName" />
                        <label htmlFor="lastName">Last Name</label>
                        <Field name="lastName" type="text" />
                        <ErrorMessage name="lastName" />
                        <label htmlFor="email">Email Address</label>
                        <Field name="email" type="email" />
                        <ErrorMessage name="email" />
                        <label htmlFor="JOb Type">Job Type</label>
                        <Field name="jobType" as="select" className="my-select">
                            <option value="">Select a job type</option>
                            <option value="designer">Designer</option>
                            <option value="development">Developer</option>
                            <option value="product">Product Manager</option>
                            <option value="other">Other</option>
                        </Field>
                        <ErrorMessage name="jobType" />
                        <label htmlFor="hobbies">Hobbies</label>
                        {/* <div>
                            <Checkbox name="hobbies" value="Music" />
                            <Checkbox name="hobbies" value="Dancing" />
                            <Checkbox name="hobbies" value="Cooking" />
                            <Checkbox name="hobbies" value="Others" />
                        </div> */}
                        {/* <Field
                            name="hobbies"
                            component={hobbies}
                            options={hobbiesOptions}
                            label="Select options"
                        /> */}
                        <ErrorMessage name="hobbies" />

                        <Field
                            name="gender"
                            render={({ field }) => (
                                <>
                                    <div className="radio-item">
                                        <input
                                            {...field}
                                            id="male"
                                            value="male"
                                            checked={field.value === 'male'}
                                            name="type"
                                            type="radio"
                                        />
                                        <label htmlFor="male">Male</label>
                                    </div>

                                    <div className="radio-item">
                                        <input
                                            {...field}
                                            id="female"
                                            value="female"
                                            name="type"
                                            checked={field.value === 'female'}
                                            type="radio"
                                        />
                                        <label htmlFor="female">Female</label>
                                    </div>
                                </>
                            )}
                        />

                        <label htmlFor="file">File upload</label>
                        <input id="file" name="file" type="file" onChange={(event) => {
                            setFieldValue("file", event.currentTarget.files[0]);
                        }} className="form-control" />
                        {/* <Thumb file={values.file} /> */}
                        <Field type="checkbox" name="acceptTerms" />
                        <label htmlFor="acceptTerms" >Accept Terms & Conditions</label>
                        <ErrorMessage name="acceptTerms" />
                        <div className={classes.Footer}>
                            <button disabled={!(isValid && dirty)} type="submit">Submit</button>
                            <button type="reset">Reset</button>
                        </div>

                    </Form>
                </div>
            )}
        </Formik>
    );
};

export default SignupForm;