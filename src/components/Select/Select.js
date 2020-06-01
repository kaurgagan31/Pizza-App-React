import React from 'react';
import { useField } from 'formik';
import classes from './Select.module.css';

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

export default MySelect;