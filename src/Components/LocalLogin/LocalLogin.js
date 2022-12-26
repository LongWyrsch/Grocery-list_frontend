import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import styles from './LoginLocal.module.css';

export const LocalLogin = () => {
	const navigate = useNavigate();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	//Update search term as user types
	function handleOnChangeEmail(e) {
		setEmail(e.target.value);
	}
	function handleOnChangePassword(e) {
		setPassword(e.target.value);
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		fetch('http://localhost:3000/auth/local/login', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			// We convert the React state to JSON and send it as the POST body
			body: JSON.stringify({ email: email, password: password }),
		})
		.then((response) => response.json())
		.then((data) => {
			window.alert(data.user.email);
			navigate('/lists');
		});
	};

	return (
		<div>
			LocalLogin
			<form onSubmit={handleSubmit}>
				<label>
					Enter your email:
					<input type="email" name="email" onChange={handleOnChangeEmail} />
				</label>
				<label>
					Enter your password:
					<input type="password" name="password" onChange={handleOnChangePassword} />
				</label>
				<button type="submit">Log in</button>
			</form>
		</div>
	);
};
