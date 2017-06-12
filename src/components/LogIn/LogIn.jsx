import React from 'react';
import {
    loginUser as restLoginUser,
    fetchGroups as restFetchGroups,
    getUserPublicKey as restGetUserPublicKey,
    sendResetEmail as restSendResetEmail,
    resetPassword as restResetPassword
} from '../../domain/rest';
import Header from '../Header';
import Button from '../Button';
import Input from '../Input';

/*const resetPassword = (setLoginFlow, error) => () => {
    const username = document.getElementById('username-input-reset').value;
    const password1 = document.getElementById('password1-input-reset').value;
    const password2 = document.getElementById('password2-input-reset').value;
    const resetKey = document.getElementById('key-input-reset').value;
    /!*if(password1 === password2 && username.trim() !== '' && password1.trim() !== '') {
        restResetPassword(usename, password1, resetKey).then(response => {
            if(response.status === 400) {
                error('Error during password reset occured');
            }else{
                error('Password reset successfully');
                setLoginFlow();
            }
        })
    }*!/
    error('Password reset successfully');
};*/

const sendResetEmail = (setLoginFlow, error) => () => {
    const username = document.getElementById('username-input-forgot').value;
    /*if(username.trim() !== '') {
        restSendResetEmail(usename).then(response => {
            if(response.status === 400) {
                error('Error during sending email occured');
            }else{
                error('Email has been sent');
                setLoginFlow();
            }
        })
    }*/
    error('Email has been sent');
};

const loginUser = (loggedIn, setGroups, error, showModalForPrivateKeyPass) => () => {
    const username = document.getElementById('username-input-login').value;
    const password = document.getElementById('password-input-login').value;
    restLoginUser(username, password).then((jsonData) => {
        if(jsonData.token){
            loggedIn(jsonData.user, jsonData.token);
            fetchGroups(jsonData.token, setGroups, error);
            setTimeout(() => error(''), 2500);
        } else {
            error('Failed to log in');
            setTimeout(() => error(''), 2500);
        }
    });
};

const fetchGroups = (token, setGroups, error) => {
    restFetchGroups(token).then((jsonData) => {
        setGroups(jsonData);
    });
    setTimeout(() => error(''), 2500);
};

const LogIn = ({ signUp, loggedIn, error, setGroups, info, setLoginFlow, setForgotFlow, setResetFlow, resetFlow, loginFlow, forgotFlow  }) => (
    <div className="login">
        <Header info={info}>pass@</Header>
        <div className="login__content">
            <div className="login__navbar">
            </div>
            <div className="login__container">
                {loginFlow &&
                    <div className="login__signup">
                        <span className="basic-flex">Log in</span>
                        <div className="basic-flex">
                            <Button className="margin-right" onClick={signUp}>
                            Sign up
                            </Button>
                            {/*<Button onClick={setResetFlow}>
                         Reset password
                         </Button>*/}
                        </div>
                    </div>
                }
                {loginFlow &&
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
{/*
                        <a onClick={setForgotFlow}><i>Forgot password</i></a>
*/}
                    </div>
                }
                {/*{forgotFlow &&
                <div className="login__inputs">
                    <div className="labeled-input">
                        <label className="login__label">Username</label>
                        <Input type="text" className="input-field" id="username-input-forgot"/>
                    </div>
                    <Button onClick={sendResetEmail(setLoginFlow, error)}>
                     Send reset email
                    </Button>
                </div>
                }
                {resetFlow &&
                <div className="login__inputs">
                    <div className="labeled-input">
                        <label className="login__label large">Username</label>
                        <Input type="text" className="input-field" id="username-input-reset"/>
                    </div>
                    <div className="labeled-input">
                        <label className="login__label large">New Password</label>
                        <Input type="password" className="input-field" id="password1-input-reset"/>
                    </div>
                    <div className="labeled-input">
                        <label className="login__label large">Confirm Password</label>
                        <Input type="password" className="input-field" id="password2-input-reset"/>
                    </div>
                    <div className="labeled-input">
                        <label className="login__label large">Reset key</label>
                        <Input type="text" className="input-field" id="key-input-reset"/>
                    </div>
                    <Button onClick={resetPassword(setLoginFlow, error)}>
                        Reset password
                    </Button>
                </div>
                }*/}
            </div>
        </div>
    </div>
);

export default LogIn;