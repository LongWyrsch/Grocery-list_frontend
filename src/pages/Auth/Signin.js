// React
import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';

// CSS
import styles from './auth.module.css';

// libs
import { useTranslation } from 'react-i18next';

// components
import { LanguagePicker } from '../../features/languages/components/LanguagePicker';
import { Textfield } from '../../components/Textfield/Textfield';
import { Button } from '../../components/Button/Button';
import { ThemeSwitch } from '../../features/theme/components/ThemeSwitch';

// utils
import { emailValidation, passwordValidation } from '../../utils/validator';

export const Signin = () => {
	const navigate = useNavigate();

	const { t } = useTranslation();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [credError, setCredError] = useState(false);

	const googleLogin = async () => {
		window.open('http://localhost:3000/auth/google', '_self');
	};

	//Update search term as user types
	function handleOnChangeEmail(e) {
		setEmail(e.target.value);
	}

	function handleOnChangePassword(e) {
		setPassword(e.target.value);
	}

	// const quicklogin = async() => {
	// 	const response = await fetch('http://localhost:3000/auth/local/signin', {
	// 		method: 'POST',
	// 		credentials: 'include',
	// 		headers: {'Content-type': 'application/json'},
	// 		body: JSON.stringify({ email: process.env.REACT_APP_ADMINEMAIL, password: process.env.REACT_APP_ADMINPASSWORD }),
	// 	})
	// 	if (response.status===401) window.alert(t('warnings.ServerError'))
	// 	if (response.status===403) setCredError(true)
	// 	if (response.status===200) navigate('/home/recipes', { state: null, replace: true })
	// }

	const handleSubmit = async (event) => {
		event.preventDefault();

		// Validate user input before calling server.
		const checkEmail = emailValidation({ email: email });
		const checkPassword = passwordValidation({ password: password });
		//If invalid user input, skip server call. Will Rerender with error message.
		if (checkEmail.error || checkPassword.error) {
			setCredError(true);
			return;
		}

		// User input was validated. Call server.
		const response = await fetch('http://localhost:3000/auth/local/signin', {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-type': 'application/json'
			},
			// We convert the React state to JSON and send it as the POST body
			body: JSON.stringify({ email: email, password: password }),
		})
		if (response.status===401) window.alert(t('warnings.ServerError'))
		if (response.status===403) setCredError(true)
		if (response.status===200) navigate('/home/lists', { state: null, replace: true })
	};

	function credErrorMessage() {
		return (
			<div className={styles.errorMessage}>
				{t('auth.creds.emailPasswordError')}
			</div>
		);
	}

	// Set icon for buttons and textfields
	let googleIcon = { iconName: 'FcGoogle', size: '1.5rem', color: '' };
	let userIcon = { iconName: 'AiOutlineUser', size: '1.5rem', color: '' };
	let lockIcon = { iconName: 'AiOutlineLock', size: '1.5rem', color: '' };

	return (
		<div className={styles.authPage}>
			<img className={styles.logo} src={require('../../assets/GroceryList_logo.png')} alt="logo" onClick={() => navigate('/')}/>
			<div className={styles.themeSwitch}>
				<ThemeSwitch />
			</div>
			<div className={styles.langPicker}>
				<LanguagePicker />
			</div>
			<div className={`card-flat ${styles.signinBox}`}>
				<span className={`generalText ${styles.welcome}`}>{t('auth.signinPage.welcomeBack')}</span>
				<div className={styles.createAccount}>
					<div className="generalText">{t('auth.signinPage.newUser')}</div>
					<NavLink to="/signup" className={styles.createAnAccount}>
						{t('auth.signinPage.createAnAccount')}
					</NavLink>
				</div>

				<Button
					buttonStyle="elevated"
					text={t('auth.continueGoogle')}
					onClick={googleLogin}
					iconInfo={googleIcon}
					width="100%"
				/>

				<div className={styles.orLine}>
					<hr className={styles.horizontalLine} />
					<div className={`generalText ${styles.or}`}>{t('auth.or')}</div>
					<hr className={styles.horizontalLine} />
				</div>
				<Textfield
					value={email}
					fieldStyle="outlined"
					label={t('auth.creds.email')}
					handleOnChange={handleOnChangeEmail}
					iconInfo={userIcon}
					width="100%"
				/>
				<div style={{ width: '100%' }}>
					<Textfield
						value={password}
						fieldStyle="outlined"
						fieldType="password"
						label={t('auth.creds.password')}
						handleOnChange={handleOnChangePassword}
						iconInfo={lockIcon}
						width="100%"
					/>
					<NavLink to="/signup" className={styles.forgotPassword}>
						{t('auth.signinPage.forgotPassword')}
					</NavLink>
				</div>
				<div style={{ width: '100%' }}>
					{credError && credErrorMessage()}
					<Button buttonStyle="filled" text={t('auth.signin')} onClick={handleSubmit} width="100%" />
					{/* <button onClick={quicklogin} >DEV BUTTON</button> */}
				</div>
			</div>
		</div>
	);
};
