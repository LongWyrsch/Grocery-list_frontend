// React
import { useNavigate, NavLink } from 'react-router-dom';

// Redux
import React, { useState, useEffect } from 'react';

// CSS
import styles from './auth.module.css';

import { useTranslation } from 'react-i18next';

// components
import { LanguagePicker } from '../../features/languages/components/LanguagePicker';
import { Textfield } from '../../components/Textfield/Textfield';
import { Button } from '../../components/Button/Button';
import { ThemeSwitch } from '../../features/theme/components/ThemeSwitch';

// utils
import { emailValidation, passwordValidation } from '../../utils/validator';

// config
import { config } from '../../constants';

export const Signup = ({ user }) => {
	const navigate = useNavigate();

	const { t, i18n } = useTranslation();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [credError, setCredError] = useState(false);
	const [passwordsDifferent, setPasswordsDifferent] = useState(false);

	const googleLogin = () => {
		window.open(`${config.server_url}/auth/google`, '_self');
	};

	//Update search term as user types
	function handleOnChangeEmail(e) {
		setEmail(e.target.value);
	}

	function handleOnChangePassword(e) {
		if (e.target.value !== confirmPassword) {
			setPasswordsDifferent(true);
			setCredError(true);
		} else {
			setCredError(false);
		}
		setPassword(e.target.value);
	}

	function handleOnChangeConfirmPassword(e) {
		if (password !== e.target.value) {
			setPasswordsDifferent(true);
			setCredError(true);
		} else {
			setCredError(false);
		}
		setConfirmPassword(e.target.value);
	}

	const handleSubmit = async (event) => {
		event.preventDefault();

		// Validate user input before calling server.
		const checkEmail = emailValidation({ email: email });
		const checkPassword = passwordValidation({ password: password });
		const checkConfirmPassword = passwordValidation({ password: confirmPassword });

		//If invalid user input, skip server call. Will Rerender with error message.
		let isInvalid = checkEmail.error || checkPassword.error || checkConfirmPassword.error || password !== confirmPassword;
		if (isInvalid) {
			setCredError(true);
			return;
		}
		// User input was validated. Call server.
		const response = await fetch(`${config.server_url}/auth/local/signup`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-type': 'application/json',
			},
			// We convert the React state to JSON and send it as the POST body
			body: JSON.stringify({
				email: email,
				password: password,
				theme: user.theme,
				language: i18n.language,
			}),
		});
		if (response.status === 201) {
			navigate('/signin', { state: null, replace: true });
		} else if (response.status === 403) {
			setCredError(true);
		} else {
			window.alert(t('warnings.ServerError'));
		}
	};

	function credErrorMessage() {
		return <div className={styles.errorMessage}>{passwordsDifferent ? t('auth.signupPage.passwordsDifferent') : t('auth.creds.emailPasswordError')}</div>;
	}

	// Set icon for buttons and textfields
	let googleIcon = { iconName: 'FcGoogle', size: '1.5rem', color: '' };
	let userIcon = { iconName: 'AiOutlineUser', size: '1.5rem', color: '' };
	let lockIcon = { iconName: 'AiOutlineLock', size: '1.5rem', color: '' };

	return (
		<div className={styles.authPage}>
			<img  data-testid='logo' className={styles.logo} src={require('../../assets/GroceryList_logo.png')} alt="logo" onClick={() => navigate('/')} />
			<div  data-testid='language' className={styles.themeSwitch}>
				<ThemeSwitch />
			</div>
			<div className={styles.langPicker}>
				<LanguagePicker />
			</div>
			<div className={`card-flat ${styles.signinBox}`}>
				<span className={styles.welcome}>{t('auth.signupPage.welcome')}</span>
				<div className={styles.createAccount}>
					<div>{t('auth.signupPage.alreadyHaveAccount')}</div>
					<NavLink to="/signin" className={styles.createAnAccount}>
						{t('auth.signin')}
					</NavLink>
				</div>

				<Button buttonStyle="elevated" text={t('auth.continueGoogle')} onClick={googleLogin} iconInfo={googleIcon} width="100%" />

				<div className={styles.orLine}>
					<hr className={styles.horizontalLine} />
					<div className={styles.or}>{t('auth.or')}</div>
					<hr className={styles.horizontalLine} />
				</div>
				<Textfield
					fieldStyle="outlined"
					label={t('auth.creds.email')}
					value={email}
					handleOnChange={handleOnChangeEmail}
					iconInfo={userIcon}
					width="100%"
					validator={emailValidation}
					payloadKey="email"
					required={true}
				/>
				<Textfield
					fieldStyle="outlined"
					fieldType="password"
					label={t('auth.creds.password')}
					value={password}
					handleOnChange={handleOnChangePassword}
					iconInfo={lockIcon}
					width="100%"
					validator={passwordValidation}
					payloadKey="password"
					required={true}
				/>
				<div style={{ width: '100%' }}>
					<Textfield
						fieldStyle="outlined"
						fieldType="password"
						label={t('auth.signupPage.confirmPassword')}
						value={confirmPassword}
						handleOnChange={handleOnChangeConfirmPassword}
						iconInfo={lockIcon}
						width="100%"
						validator={passwordValidation}
						payloadKey="password"
						required={true}
					/>
				</div>
				<div style={{ width: '100%' }}>
					{credError && credErrorMessage()}
					<Button buttonStyle="filled" text={t('auth.signup')} onClick={handleSubmit} width="100%" />
				</div>
			</div>
		</div>
	);
};
