import React from 'react';
import styles from './ThemeSwitch.module.css';

import { useSelector, useDispatch } from 'react-redux';
import { selectTheme, toggleTheme } from '../../state/themeSlice';

import { RiMoonClearFill } from 'react-icons/ri';
import { FaSun } from 'react-icons/fa';

export const ThemeSwitch = () => {
	const theme = useSelector(selectTheme);
	const dispatch = useDispatch();

	//Toggle app theme
	function handleOnClickTheme(e) {
		dispatch(toggleTheme());
	}

	const moonIcon = React.createElement(RiMoonClearFill);
	const sunIcon = React.createElement(FaSun);
	let themeIcon = theme === 'light' ? sunIcon : moonIcon;
    let themeClass = theme === 'light' ? styles.light : styles.dark;

	return (
		<div>
			<button className={`${themeClass} ${styles.switch}`} onClick={handleOnClickTheme}>
				<div className={styles.switchCircle} >{themeIcon}</div>
			</button>
		</div>
	);
};
