import React, { PropTypes } from 'react';
import './Input.scss';

const Input = ({type, className, id, placeholder, disabled = false}) => {
    console.log('dd', disabled);
    const disabledClass = disabled ? 'disabled-input' : '';
    return (
        <input disabled={disabled} type={type} id={id} className={`input ${className} ${disabledClass}`} placeholder={placeholder}/>
    );
}

Input.propTypes = {
    type: PropTypes.string,
    classname: PropTypes.string,
    id: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool
};

export default Input;
