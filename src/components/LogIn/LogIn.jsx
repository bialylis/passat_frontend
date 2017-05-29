import React from 'react';
import { loginUser as restLoginUser , fetchGroups as restFetchGroups, getUserPublicKey as restGetUserPublicKey } from '../../domain/rest';
import Header from '../Header';
import Button from '../Button';
import Input from '../Input';

const loginUser = (loggedIn, setGroups, error, showModalForPrivateKeyPass) => () => {
    const username = document.getElementById('username-input-login').value;
    const password = document.getElementById('password-input-login').value;
    restLoginUser(username, password).then((jsonData) => {
        if(jsonData.token){
            loggedIn(jsonData.user, jsonData.token);
            fetchGroups(jsonData.token, setGroups);
        } else {
            error('Failed to log in');
        }
    });
};

const fetchGroups = (token, setGroups) => {
    restFetchGroups(token).then((jsonData) => {
        setGroups(jsonData);
    });
};

const LogIn = ({ signUp, loggedIn, error, setGroups, info }) => (
    <div className="login">
        <Header info={info}>pass@</Header>
        <div className="login__content">
            <div className="login__navbar">
            </div>
            <div className="login__container">
                <div className="login__signup">
                    <span className="basic-flex">Log in</span>
                    <div className="basic-flex">
                        <Button onClick={signUp}>
                            Sign up
                        </Button>
                    </div>
                </div>
                <div className="login__inputs">
                    <div className="labeled-input">
                        <label className="login__label">Username</label>
                        <Input type="text" className="input-field" id="username-input-login"/>
                    </div>
                    <div className="labeled-input">
                        <label className="login__label">Password</label>
                        <Input type="password" className="input-field" id="password-input-login"/>
                    </div>
                    <Button className="login-button" onClick={loginUser(loggedIn, setGroups, error)}>Log in</Button>
                    <a onClick={() => error('Forgot password - to be implemented')}><i>Forgot password</i></a>
                </div>
            </div>
        </div>
    </div>
);

export default LogIn;