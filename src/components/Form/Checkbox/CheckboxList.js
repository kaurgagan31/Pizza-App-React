import React from 'react';
import CheckBox from './Checkbox';
import cx from 'classnames';
import './style.css';

export default function CheckBoxList ({id, label, options, isCheckedAll, onCheck}) {
    console.log(options);
    const checkBoxOptions = (
        <div className="checkbox-list">
            {options.map((option, index) => {
                return (
                    <CheckBox
                      key={index}
                      name={option.name}
                      value={option.value}
                      tick={option.checked}
                      onCheck={(e) => onCheck(option.value, e.target.checked)}                     />
                );
            })}
        </div>
    );

    return (
        <>
        <div className={cx('input--wrapper')}>
        <label className='text--label' htmlFor={id}>{label}</label>
        <div className="checkbox-list">
            <CheckBox
              name="select-all"
              value="Select All"
              tick={isCheckedAll}
              onCheck={(e) => onCheck('all', e.target.checked)}
            />
            {checkBoxOptions}
        </div>
        </div>
         
        </>
    );
}