import React, { PropTypes } from 'react';
import './Button.scss';

const Button = ({ children, className, onClick }) => (
    <button className={`button ${className}`} onClick={onClick}>
        {children}
    </button>
);

Button.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    onClick: PropTypes.func
};

export default Button;