import React from 'react';

const Header = ({ children, showUserLogo = false }) => (
    <div className="login__header">
        <div className="logo">{children}</div>
        <span className="logo-side" />
    </div>
);

export default Header;