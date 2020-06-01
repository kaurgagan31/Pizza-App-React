import React, {Component} from 'react';
import classes from './radiobutton.module.css';

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
  
  export default RadioButtonGroup;