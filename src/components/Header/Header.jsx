import React from 'react';

const Header = ({ children, showUserLogo = false, info }) => (
    <div className="login__header">
        <div className="logo">{children}</div>
        <span className="logo-side" />
        <span className="font24">{info}</span>
    </div>
);

export default Header;