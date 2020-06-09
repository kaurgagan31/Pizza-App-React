import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './style.css';

function Input(props) {
  let rows = [];
  const inputList = () => {
    for (let i = 0; i < props.number; i++) {
      rows.push(
        <div key={i}>
          <label>{props.name} {i+1}</label>
          <input
            className={cx('text--control', { 'text--control-error': props.errorMessage })}
            type='text'
            id={props.id}
            value={props.value[i+1] || ''}
            placeholder={props.placeholder.toUpperCase()}
            onChange={e => props.onChange(e , i+1)}
          />
        </div>
      );
    }
    return rows;
  };

  return (
    <div className={cx('input--wrapper', { 'input--wrapper-inline': props.inline })}>
      <label className='text--label' htmlFor={props.id}>{props.label}</label>
      {
        props.type === 'single' ?
        <input
            className={cx('text--control', { 'text--control-error': props.errorMessage })}
            type='text'
            id={props.id}
            value={props.value}
            placeholder={props.placeholder.toUpperCase()}
            onChange={props.onChange}
          />
        :
          <div>{inputList()}</div>
      }

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