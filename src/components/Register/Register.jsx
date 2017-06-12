import React  from 'react';
import { registerUser as restRegisterUser } from '../../domain/rest';
import Header from '../Header';
import Button from '../Button';

const registerUser = (logIn, error, newInfo) => () => {
    const username = document.getElementById('username-input-register').value;
    const password = document.getElementById('password-input-register').value;
    const email = document.getElementById('email-input-register').value;
    restRegisterUser(username, password, email).then((jsonData) => {
        if(jsonData.success){
            logIn();
            newInfo('Registration complete');
            setTimeout(() => error(''), 2500);
        } else {
            error('Error during registration');
            setTimeout(() => error(''), 2500);
        }
    });
};

const Register = ({logIn, error, newInfo, info}) => (
    <div className="login">
        <Header info={info}>pass@</Header>
        <div className="login__content">
            <div className="login__navbar">
            </div>
            <div className="login__container">
                <div className="register__title">
                    <span className="basic-flex">Sign up</span>
                    <span className="basic-flex"/>
                </div>
                <div className="register__inputs">
                    <div className="labeled-input">
                        <label className="login__label">Username</label>
                        <input type="text" className="input-field" id="username-input-register"/>
                    </div>
                    <div className="labeled-input">
                        <label className="login__label">Password</label>
                        <input type="password" className="input-field" id="password-input-register"/>
                    </div>
                    <div className="labeled-input">
                        <label className="login__label">Email</label>
                        <input type="email" className="input-field" id="email-input-register"/>
                    </div>
                    <Button className="login-button" onClick={registerUser(logIn, error, newInfo)}>Register</Button>
                    <a onClick={logIn}><i>Back</i></a>
                </div>
            </div>
        </div>
    </div>
);

export default Register;