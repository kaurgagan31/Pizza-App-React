import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './style.css';

function Input (props) {
  return (
    <div className={cx('input--wrapper', {'input--wrapper-inline': props.inline})}>
        <label className='text--label' htmlFor={props.id}>{props.label}</label>
        <select 
         className={cx('text--control', {'text--control-error': props.errorMessage})}
        name={props.name} 
        onChange={props.onChange} 
        value={props.value}>
        {props.options.map(({ value, label }, index) => <option key={index} value={value} >{label}</option>)}
                </select>
        {
          props.errorMessage && (
            <div className="errorMsg">
              {props.errorMessage}
            </div>
          )
        }
    </div>
  )
}
                                      
PropTypes.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  inline: PropTypes.bool,
  errorMessage: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,

};

export default Input;