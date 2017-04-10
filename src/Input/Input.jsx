import React, { PropTypes } from 'react';
import './Input.scss';

const Input = ({type, className, id}) => (
    <input type={type} id={id} className={`input ${className}`} />
);

Input.propTypes = {
    type: PropTypes.string,
    classname: PropTypes.string,
    id: PropTypes.string
};

export default Input;
