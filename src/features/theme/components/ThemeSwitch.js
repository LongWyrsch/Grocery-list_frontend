// React
import React from 'react';
import { useNavigate } from 'react-router-dom';

// CSS
import styles from './ThemeSwitch.module.css';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, updateUser } from '../../user/state/userSlice';

// React-icons
import { RiMoonClearFill } from 'react-icons/ri';
import { FaSun } from 'react-icons/fa';

// Utils
import { serverRequests } from '../../../utils/serverRequests';

export const ThemeSwitch = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate;
	const user = useSelector(selectUser);

	const toggleTheme = () => user.theme === 'light' ? 'dark' : 'light'

	//Toggle app theme
	function handleToggle(e) {
		const updatedUser = { ...user, theme: toggleTheme() };
		dispatch(updateUser(updatedUser));
		let isAuthenticated = (user.email || user.google_name) ? true : false;
		isAuthenticated && serverRequests('/users', 'PUT', updatedUser, () => {});
	}

	const moonIcon = React.createElement(RiMoonClearFill);
	const sunIcon = React.createElement(FaSun);
	let themeIcon = user.theme === 'light' ? sunIcon : moonIcon;
	let themeClass = user.theme === 'light' ? styles.light : styles.dark;

	return (
		<div>
			<button className={styles.switch} onClick={handleToggle}>
				<div className={`${themeClass} ${styles.switchCircle}`}>{themeIcon}</div>
			</button>
		</div>
	);
};
