import classes from './radiobutton.module.css';

// Radio input
export const RadioButton = ({
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
export const RadioButtonGroup = ({
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
