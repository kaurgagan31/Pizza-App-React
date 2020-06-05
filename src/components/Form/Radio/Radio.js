import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './styles.css';

function Radio(props) {
    return (
        <div className={cx('input--wrapper', { 'input--wrapper-inline': props.inline })}>
            <label className='text--label' htmlFor={props.id}>{props.label}</label>
            <div
                onChange={props.onChange}
                value={props.value} >
                {props.options.map((option, index) => {
                    return (
                        <div key={index}>
                            <input  type="radio" value={option.value} name={option.name} /><label>{option.label}</label>
                        </div>
                    )
                })}
            </div>
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

export default Radio;