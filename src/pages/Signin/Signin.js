import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import styles from './Signin.module.css';

import { useTranslation } from 'react-i18next';
import { Textfield } from '../../Components/Textfield/Textfield';
import { Button } from '../../Components/Button/Button';

export const Signin = () => {
	const navigate = useNavigate();

	const { t } = useTranslation();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const googleLogin = () => {
		window.open('http://localhost:3000/auth/google', '_self');
	};

	const localRegister = () => {
		navigate('/signin');
		// window.open('http://localhost:3001/loginlocal', '_self')
	};

	//Update search term as user types
	function handleOnChangeEmail(e) {
		setEmail(e.target.value);
	}
	function handleOnChangePassword(e) {
		setPassword(e.target.value);
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		fetch('http://localhost:3000/auth/local/signin', {
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

	let userIcon = {iconName:'AiOutlineUser', size:'1.5rem', color:''}
	let lockIcon = {iconName:'AiOutlineLock', size:'1.5rem', color:''}
	let googleIcon = {iconName:'FcGoogle', size:'1.5rem', color:''}

	return (
		<div className={styles.signinpage}>
			<div className={`card-flat ${styles.signinbox}`}>
				<div>{t('auth.signInpage.welcomeBack')}</div>
				<div className={styles.createAccount}>
					<div>{t('auth.signInpage.newUser')}</div>
					<NavLink to="/signup">{t('auth.signInpage.createAnAccount')}</NavLink>
				</div>

				<Button 
					buttonStyle='elevated' 
					text={t('auth.continueGoogle')}
					// handelOnClick={googleLogin}  
					iconInfo={googleIcon}
				/>

				<div className={styles.orLine}>
					<hr className={styles.hr} />
					<div className={styles.or}>{t('auth.or')}</div>
					<hr className={styles.hr} />
				</div>
				<form onSubmit={handleSubmit}>
					<Textfield fieldStyle='outlined' placeholder="Username" handleOnChange={handleOnChangeEmail} iconInfo={userIcon}/>
					<Textfield fieldStyle='outlined' placeholder="Password" handleOnChange={handleOnChangePassword} iconInfo={lockIcon} />
					<button type="submit">Log in</button>
				</form>
			</div>
		</div>
	);
};
