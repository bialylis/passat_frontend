import  'whatwg-fetch';
import React, { Component } from 'react';
import './App.scss';

const origin = "https://pasat-backend.herokuapp.com"

const setFlow = (context, number) => () => {
	context.setState({ flow: number });
};

const loginUser = (context) => () => {
	var myHeaders = new Headers();
	myHeaders.append('Content-Type', 'application/json');
	fetch(`${origin}/login`, {
	    method: "POST",
	    headers: myHeaders,
	    body: JSON.stringify({
	    	username: document.getElementById('username-input-login').value,
			password: document.getElementById('password-input-login').value
	    })
	}).then((response) => {
		console.log(response);
		return response.json();
	}).then((jsonData) => {
		console.log(jsonData);
		if(jsonData.token){
			context.setState({
				user: jsonData.user,
				flow: 2,
				info: "Login successful"
			})
		} else {
			context.setState({
				flow: 0,
				info: "Error occured"
			})
		}
	});
}

const registerUser = (context) => () => {
	var myHeaders = new Headers();
	myHeaders.append('Content-Type', 'application/json');
	fetch(`${origin}/register`, {
	    method: "POST",
	    headers: myHeaders,
	    body: JSON.stringify({
	    	username: document.getElementById('username-input-register').value,
			password: document.getElementById('password-input-register').value
	    })
	}).then((response) => {
		console.log(response);
		return response.json();
	}).then((jsonData) => {
		if(jsonData.success){
			context.setState({
				flow: 0,
				info: "Registration complete"
			})
		} else {
			context.setState({
				flow: 1,
				info: "Error occured"
			})
		}
	});
}

const logoutUser = (context) => () => {
	context.setState({
		flow: 0,
		info: "User logged out"
	})
}

class App extends Component {
	constructor() {
		super();
		this.state = {
			flow: 0,
			info: ""
		};
	}

	render() {
		return (
			<div>
				<div className="info">
					{this.state.info}
				</div>
				{this.state.flow === 0 && (
					<div className="form-container">
						<div>
							<div className="labeled-input">
								<label>Username:</label>
								<input type="text" className="input-field" id="username-input-login"/>
							</div>
							<div className="labeled-input">
								<label>Password:</label>
								<input type="password" className="input-field" id="password-input-login"/>
							</div>
						</div>
						<button className="login-button" onClick={loginUser(this)}>Log in</button>
						<a onClick={setFlow(this, 1)}>Register</a>
					</div>
				)}
				{this.state.flow === 1 && (
					<div className="form-container">
						<div>
							<div className="labeled-input">
								<label>Username:</label>
								<input type="text" className="input-field" id="username-input-register"/>
							</div>
							<div className="labeled-input">
								<label>Password:</label>
								<input type="password" className="input-field" id="password-input-register"/>
							</div>
						</div>
						<button className="login-button" onClick={registerUser(this)}>Register</button>
						<a onClick={setFlow(this, 0)}>Back</a>
					</div>
				)}
				{this.state.flow === 2 && (
					<div className="form-container">
						USER {this.state.user.username} LOGGED IN
						<button className="login-button" onClick={logoutUser(this)}>Logout</button>
					</div>
				)}
			</div>
		);
	}
}

export default App;