import React, { PropTypes } from 'react';
import './Input.scss';

const Input = ({type, className, id, placeholder}) => (
    <input type={type} id={id} className={`input ${className}`} placeholder={placeholder}/>
);

Input.propTypes = {
    type: PropTypes.string,
    classname: PropTypes.string,
    id: PropTypes.string,
    placeholder: PropTypes.string
};

export default Input;
