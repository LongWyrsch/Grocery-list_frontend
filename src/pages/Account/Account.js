// React
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Redux
import { useDispatch } from 'react-redux';
import { clearUser, getUser, updateUser } from '../../features/user/state/userSlice';
import { clearRecipes } from '../../features/recipes/state/recipesSlice';
import { clearLists } from '../../features/lists/state/listsSlice';

// CSS
import styles from './Account.module.css';

// components
import { Textfield } from '../../components/Textfield/Textfield';
import { LanguagePicker } from '../../features/languages/components/LanguagePicker';
import { ActionWarning } from '../../components/ActionWarning/ActionWarning';

// libs
import Avatar from 'boring-avatars';
import { Button } from '../../components/Button/Button';
import { t } from 'i18next';

// utils
import { randomColorsArray } from '../../utils/randomColorsArray';
import { serverRequests } from '../../utils/serverRequests';
import { emailValidation, passwordValidation } from '../../utils/validator';

export const Account = ({ user }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [avatar_variant, setAvatar_variant] = useState(user.avatar_variant);
	const [avatar_colors, setAvatar_colors] = useState(user.avatar_colors);
	const [language, setLanguage] = useState();
	const [email, setEmail] = useState(user.email || user.google_name);
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [passwordsDifferent, setPasswordsDifferent] = useState(false);

	const [credError, setCredError] = useState(false);

	const [confirmDelete, setConfirmDelete] = useState(false);

	// Language is updated in slice as soon as user changes it.
	// Therefore an initial copy is required to check for changes.
	useEffect(() => {
		setLanguage(user.language);
	}, []);

	// Check if any changes were made. Save button becomes filled when true.
	let modifiedRef = useRef(false);
	if (
		avatar_variant !== user.avatar_variant ||
		avatar_colors !== user.avatar_colors ||
		language !== user.language ||
		email !== user.email ||
		password !== ''
	) {
		modifiedRef.current = true;
	} else {
		modifiedRef.current = false;
	}

	const updateVariant = (variant) => {
		setAvatar_variant(variant);
	};

	const getNewColors = () => {
		let newColors = randomColorsArray();
		setAvatar_colors(newColors);
	};

	const updateUserEmail = (e) => {
		setEmail(e.target.value);
	};

	function handleOnChangePassword(e) {
		if (e.target.value !== confirmPassword) {
			setPasswordsDifferent(true);
			setCredError(true);
		} else {
			setPasswordsDifferent(false);
			setCredError(false);
		}
		setPassword(e.target.value);
	}
	function handleOnChangeConfirmPassword(e) {
		if (e.target.value !== password) {
			setPasswordsDifferent(true);
			setCredError(true);
		} else {
			setPasswordsDifferent(false);
			setCredError(false);
		}
		setConfirmPassword(e.target.value);
	}

	const saveChanges = () => {
		if (!modifiedRef.current) return;

		// Validate user input before calling server.
		const checkEmail = emailValidation({ email: email });
		const checkPassword = passwordValidation({ password: password });
		const checkConfirmPassword = passwordValidation({ password: confirmPassword });

		// If invalid user input, skip server call. Will Rerender with error message.
		let isInvalid =
			checkEmail.error ||
			(checkPassword.error && password !== '') ||
			(checkConfirmPassword.error && password !== '') ||
			password !== confirmPassword;
		if (isInvalid) {
			setCredError(true);
			return;
		}

		let updatedUser = {
			...user,
			avatar_variant: avatar_variant,
			avatar_colors: avatar_colors,
			email: email,
		};

		if (password !== '') updatedUser = { ...updatedUser, hashed_password: password };

		dispatch(updateUser(updatedUser));
		serverRequests('/users', 'PUT', updatedUser, () => dispatch(getUser()));

		// If you don't clear passwords textfield, modifiedRef will detect a "change".
		setPassword('');
		setConfirmPassword('');
		// Reset language initial value
		setLanguage(user.language);
		modifiedRef.current = false;
	};

	const deleteAccount = async () => {
		// Delete user on database
		let response = await serverRequests('/users', 'DELETE', '', () => {
			dispatch(getUser());
		});

		// Log user out
		if (response.status === 200) {
			// Clear state and redirect to signup
			if (response.status === 200) {
				dispatch(clearUser());
				dispatch(clearRecipes());
				dispatch(clearLists());
				navigate('/signup');
				return;
			}
		}

		window.alert('Failed to logout. Please try again...');
	};

	let userIcon = { iconName: 'AiOutlineUser', size: '1.5rem', color: '' };
	let lockIcon = { iconName: 'AiOutlineLock', size: '1.5rem', color: '' };

	const variants = ['beam', 'marble', 'pixel', 'sunset', 'bauhaus', 'ring'];

	return (
		<div className={styles.accountWrapper}>
			<div className={styles.saveDelete}>
				<Button
					buttonStyle="filled"
					text={t('account.SaveChanges')}
					onClick={saveChanges}
					// width="	200px"
					addclass={!modifiedRef.current && styles.disabled}
				/>
			</div>
			<div className={styles.avatarWrapper}>
				<div className={styles.avatarSettingsWrapper}>
					<div className={styles.avatarSettings}>
						<div className={`generalText ${styles.text}`}>{t('account.AvatarVariantMessage')}</div>
						<div className={styles.variantButtons}>
							{variants.map((variant, i) => (
								<Button
									key={i}
									buttonStyle={avatar_variant === variant ? 'filled' : 'outlined'}
									text={variant}
									onClick={() => updateVariant(variant)}
									width="100px"
								/>
							))}
						</div>
					</div>
					<div className={styles.avatarSettings}>
						<div className={`generalText ${styles.text}`}>{t('account.AvatarColorsMessage')}</div>
						<div className={styles.colorsButtons}>
							<div>
								<Button
									buttonStyle="elevated"
									text={t('account.NewColors')}
									onClick={getNewColors}
									// width="140px"
								/>
								<Button
									buttonStyle="elevated"
									text={t('account.Reset')}
									onClick={() => setAvatar_colors(user.avatar_colors)}
									// width="140px"
								/>
							</div>
							<div className={styles.palette}>
								{avatar_colors.map((color, i) => (
									<div key={i} className={styles.color} style={{ backgroundColor: color }}>
										{color.toUpperCase()}
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
				<Avatar
					size={300}
					name={user.email || user.google_name}
					variant={avatar_variant}
					colors={avatar_colors}
				/>
			</div>
			<div className={styles.languageWrapper}>
				<div className={`generalText ${styles.text}`}>{t('account.Language')}</div>
				<LanguagePicker user={user} />
			</div>
			{user.google_name && <div className={styles.credentials}>Google profile: {user.google_name}</div>}
			{user.email && <div className={styles.credentials}>
				<div className={styles.fieldWrapper}>
					<div className={`generalText ${styles.text}`}>{t('auth.creds.email')}</div>
					<Textfield
						fieldStyle="filled"
						fieldType="text"
						placeholder=" "
						value={email}
						handleOnChange={updateUserEmail}
						iconInfo={userIcon}
						width="100%"
						validator={emailValidation}
						payloadKey="email"
					/>
				</div>
				<div className={styles.fieldWrapper}>
					<div className={`generalText ${styles.text}`}>{t('auth.creds.password')}</div>
					<Textfield
						fieldStyle="filled"
						fieldType="password"
						placeholder="******"
						value={password}
						handleOnChange={handleOnChangePassword}
						iconInfo={lockIcon}
						width="100%"
						validator={passwordValidation}
						payloadKey="password"
					/>
				</div>
				{password !== '' && (
					<div className={styles.fieldWrapper}>
						<div className={`generalText ${styles.text}`}>{t('auth.signupPage.confirmPassword')}</div>
						<Textfield
							fieldStyle="filled"
							fieldType="password"
							placeholder="******"
							value={confirmPassword}
							handleOnChange={handleOnChangeConfirmPassword}
							iconInfo={lockIcon}
							width="100%"
							validator={passwordValidation}
							payloadKey="password"
							required={true}
						/>
						{credError && (
							<div className={styles.errorMessage}>
								{passwordsDifferent ? t('auth.signupPage.passwordsDifferent') : t('auth.creds.emailPasswordError')}
							</div>
						)}
					</div>
				)}
			</div>}
			<div className={styles.saveDelete}>
				<Button
					buttonStyle="filled"
					text={t('account.SaveChanges')}
					onClick={saveChanges}
					// width="200px"
					addclass={!modifiedRef.current && styles.disabled}
				/>
				<hr />
				<Button
					buttonStyle="outlined"
					text={t('account.DeleteAccount')}
					onClick={() => setConfirmDelete(true)}
					width="200px"
					addclass={styles.deleteAccount}
				/>
			</div>
			{confirmDelete && (
				<ActionWarning
					action="Delete"
					message={<div>{t('account.ConfirmDelete')}</div>}
					handleOnClick={deleteAccount}
					handleCancel={() => setConfirmDelete(false)}
					iconName="MdDeleteOutline"
				/>
			)}
		</div>
	)
};
