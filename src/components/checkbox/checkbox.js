import React, {Component} from 'react';
import classes from './checkbox.module.css';


// Checkbox input
export const Checkbox = ({
  field: { name, value, onChange, onBlur },
  form: { errors, touched, setFieldValue },
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
              type="checkbox"
              value={value}
              checked={value}
              onChange={onChange}
              onBlur={onBlur}
              className={classes.radio}
          />
          <label htmlFor={id}>{label}</label>
        
      </div>
  );
};

// Checkbox group
class CheckboxGroup extends Component {
  // constructor(props) {
  //     super(props);
  // }

  handleChange = event => {
      const target = event.currentTarget;
      let valueArray = [...this.props.value] || [];

      if (target.checked) {
          valueArray.push(target.id);
      } else {
          valueArray.splice(valueArray.indexOf(target.id), 1);
      }

      this.props.onChange(this.props.id, valueArray);
  };

  handleBlur = () => {
      // take care of touched
      this.props.onBlur(this.props.id, true);
  };

  render() {
      const { value, error, touched, name, label,  children } = this.props;
      return (
          <div className={classes.radioLabel}>
              <label htmlFor={name} > {label} </label>
              {React.Children.map(children, child => {
                  return React.cloneElement(child, {
                      field: {
                          value: value.includes(child.props.id),
                          onChange: this.handleChange,
                          onBlur: this.handleBlur
                      }
                  });
              })}
              {touched && error ? (
                  <div className={classes.Error}>{error}</div>
              ) : null}
          </div>
      );
  }
}

export default CheckboxGroup;