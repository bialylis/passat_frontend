import 'whatwg-fetch';
import React from 'react';
import LogIn from '../../containers/LogIn';
import Register from '../../containers/Register';
import Groups from '../../containers/Groups';
import Modal from '../Modal';
import Button from '../Button';
import Input from '../Input';
import './App.scss';

const App = ({flow, info}) => {
	return (
		<div className="main max-height">
			<div className="info">
				<div className="info__text">
					{info}
				</div>
			</div>
			{flow === 0 && <LogIn />}
			{flow === 1 && <Register />}
			{flow === 2 && <Groups />}

		</div>
	);
};

export default App;