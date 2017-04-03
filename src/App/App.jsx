import 'whatwg-fetch';
import { map, find } from 'lodash';
import React, { Component } from 'react';
import Button from '../Button';
import './App.scss';

const origin = "https://pasat-backend.herokuapp.com";

const setFlow = (context, number) => () => {
	context.setState({ flow: number });
};

const loginUser = (context) => () => {
	const myHeaders = new Headers();
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
				token: jsonData.token,
				flow: 2,
				info: "Login successful"
			});
            fetchGroups(context);
		} else {
			context.setState({
				flow: 0,
				info: "Error occured"
			})
		}
	});
};

const fetchGroups = (context) => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('x-auth-token', context.state.token);
    fetch(`${origin}/auth/group`, {
        method: "GET",
        headers: myHeaders
    }).then((response) => {
        console.log(response);
        return response.json();
    }).then((jsonData) => {
    	console.log(jsonData);
		context.setState({
			...{state: context.state},
			groups: jsonData,
			info: "Fetched Groups"
		});
    });
};

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
};

const changeActiveGroup = (context, id) => () => {
	context.setState({
		...context.state,
		selectedGroup: id,
		info: `Picked group with ${id}`
	});
	console.log(context.state);
};



const getSelectedGroupName = (context) => {
    const selectedGroup = find(context.state.groups, (group) => group.id == context.state.selectedGroup);
    if(selectedGroup){
        return selectedGroup.name || '';
	} else {
    	return '';
	}
};

const addGroup = (context) => () => {
	if(document.getElementById('new-group-name').value !== '') {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('x-auth-token', context.state.token);
        fetch(`${origin}/auth/group`, {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify({
                name: document.getElementById('new-group-name').value
   	 		})
    	}).then((response) => {
            console.log(response);
            return response.json();
        }).then((jsonData) => {
            const newTable = context.state.groups.concat(jsonData);
        	context.setState({
				...context.state,
				groups: newTable
			});
            console.log(context.state);
        });
    }
};

const deleteGroup = (context) => () => {
	console.log('deleting');
	const id = context.state.selectedGroup;
	const myHeaders = new Headers();
	myHeaders.append('Content-Type', 'application/json');
	myHeaders.append('x-auth-token', context.state.token);
	fetch(`${origin}/auth/group/${id}`, {
		method: "DELETE",
		headers: myHeaders
	}).then((response) => {
		console.log(response);
		return response.json();
	}).then((jsonData) => {
        const newTable = context.state.groups.filter(group => group.id != id);
		console.log(newTable);
        context.setState({
			...context.state,
			groups: newTable,
			selectedGroup: undefined,
			info: `Deleted group ${id}`
		});
	});
};


const logoutUser = (context) => () => {
	context.setState({
		flow: 0,
        selectedGroup: undefined,
        info: "User logged out"
	});
	console.log('logout', context.state);
};

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
			<div className="main">
				<div className="info">
					<div className="info__text">
						{this.state.info}
					</div>
                    {this.state.flow === 2 && (
						<div className="info__logout">
							{this.state.user.username}
							<Button className="login-button content" onClick={logoutUser(this)}>Logout</Button>
						</div>
                    )}
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
						<Button className="login-button" onClick={loginUser(this)}>Log in</Button>
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
						<Button className="login-button" onClick={registerUser(this)}>Register</Button>
						<a onClick={setFlow(this, 0)}>Back</a>
					</div>
				)}
				{this.state.flow === 2 && (
					<div className="logged-in-container">
						<div className="form-container group-list">
							<strong>Your groups</strong>
							<ul>
								{map(this.state.groups, (group) => {
                                    return <li key={`${group.id}_${group.name}`} className="clickable" onClick={changeActiveGroup(this, group.id)}>{group.name}</li>
                                })}
							</ul>
							<input id="new-group-name" className="new-group-input" placeholder="New group name..." type="text" />
							<Button className="add-group-button" onClick={addGroup(this)}>
								+
							</Button>
						</div>
						<div className="form-container groups-content">
                            {this.state.selectedGroup !== undefined && (
                            	<div className="group-info">
									<div className="group-description">
										<div>
											{getSelectedGroupName(this)}
										</div>
										<div className="button-group">
											<Button className="margin-right">Password settings</Button>
											<Button className="margin-right" onClick={deleteGroup(this)}>Delete group</Button>
										</div>
									</div>
									<div className="group-form">
										<div className="group-input">
											<span className="group-input__item">Login</span>
											<input className="group-input__item" type="text" />
											<Button className="group-input__item">Show</Button>
										</div>
										<div className="group-input">
											<span className="group-input__item">Password</span>
											<input className="group-input__item" type="password" />
											<Button className="group-input__item">Show</Button>
										</div>
									</div>
									<div className="group-users">
										<table className="users-table">
											<thead>
												<tr className="table-header">
													<th>Username</th>
													<th>Access</th>
													<th></th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td>user1</td>
													<td>Admin</td>
													<td></td>
												</tr>
												<tr>
													<td>user2</td>
													<td>Full access</td>
													<td><Button>X</Button></td>
												</tr>
												<tr>
													<td>user3</td>
													<td>Blocked</td>
													<td></td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
                            )}
						</div>
					</div>
				)}
			</div>
		);
	}
}

export default App;