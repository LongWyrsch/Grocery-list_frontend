import React from 'react';
import styles from './Button.module.css';
import * as FCicons from 'react-icons/fc';

export const Button = ({ buttonStyle, text = '', handelOnClick, iconInfo = {} }) => {
	// Add all imported React-icons library here.
	const ReactIcons = { ...FCicons };

	// Check if parent component passed a icon object to include in the textfield.
	const iconExists = Object.keys(iconInfo).length === 0 && iconInfo.constructor === Object ? false : true;

	// Define icon <div> if an icon was provided.
	let icon;
	let icondiv;

	if (iconExists) {
		icon = React.createElement(ReactIcons[iconInfo.iconName]);
		icondiv = (
			<div style={{ fontSize: iconInfo.size, color: iconInfo.color }} className={styles.icon} >
				{icon}
			</div>
		);
	} else {
		icondiv = <div></div>;
	}

	let setUpClassNames;
	switch (buttonStyle) {
		case 'filled':
			setUpClassNames = `${styles.button} ${styles.filled}`;
			break;
		case 'outlined':
			setUpClassNames = `${styles.button} ${styles.outlined}`;
			break;
		case 'text':
			setUpClassNames = `${styles.button} ${styles.text}`;
			break;
		default:
			setUpClassNames = `${styles.button} ${styles.elevated}`;
			break;
	}

	return (
		<button onClick={handelOnClick} className={setUpClassNames}>
			<div className={styles.buttonOpacityLayer}>
				{icondiv}
				{text}
			</div>
		</button>
	);
};
