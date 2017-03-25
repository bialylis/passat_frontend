import React, { Component } from 'react';
import './App.scss';

const setFlow = (context, number) => () => {
	context.setState({ flow: number });
};

const loginUser = () => {
	//POST + write + flow 2
}

const registerUser = () => {
	//POST + flow 0
}

const logoutUser = () => {
	//POST + clear + flow 0
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
								<input type="text" className="input-field" id="username-input"/>
							</div>
							<div className="labeled-input">
								<label>Password:</label>
								<input type="password" className="input-field" id="password-input"/>
							</div>
						</div>
						<button className="login-button" onClick={loginUser}>Log in</button>
						<a onClick={setFlow(this, 1)}>Register</a>
					</div>
				)}
				{this.state.flow === 1 && (
					<div className="form-container">
						<div>
							<div className="labeled-input">
								<label>Username:</label>
								<input type="text" className="input-field" id="username-input"/>
							</div>
							<div className="labeled-input">
								<label>Password:</label>
								<input type="password" className="input-field" id="password-input"/>
							</div>
						</div>
						<button className="login-button" onClick={registerUser}>Register</button>
						<a onClick={setFlow(this, 0)}>Back</a>
					</div>
				)}
				{this.state.flow === 2 && (
					<div className="form-container">
						USER ... LOGGED IN
						<button className="login-button" onClick={logoutUser}>Register</button>
					</div>
				)}
			</div>
		);
	}
}

export default App;