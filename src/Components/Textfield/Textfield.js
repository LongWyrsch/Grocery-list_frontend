import React, { useState } from 'react';
import styles from './Textfield.module.css';

import { IconContext } from 'react-icons';
import * as FAicons from 'react-icons/fa';
import * as AIicons from 'react-icons/ai';
import * as FIicons from 'react-icons/fi';

export const Textfield = ({
	fieldStyle,
	fieldType = 'text',
	placeholder = '',
	handleOnChange,
	iconInfo = {},
	width = '',
	validator,
	payloadKey,
}) => {
	const [inputError, setInputError] = useState(false);

	// Add all imported React-icons library here.
	const ReactIcons = { ...FAicons, ...AIicons, ...FIicons };

	// Check if parent component passed a icon object to include in the textfield.
	const iconExists = Object.keys(iconInfo).length === 0 && iconInfo.constructor === Object ? false : true;

	// Define icon <div>

	// Generate and format icon if provided in props

	function icondiv() {
		if (iconExists) {
			let icon;
			icon = React.createElement(ReactIcons[iconInfo.iconName]);
			return (
				<IconContext.Provider value={{ size: iconInfo.size, color: iconInfo.color }}>
					<div className={styles.icon}>{icon}</div>
				</IconContext.Provider>
			);
		} else {
			return <div></div>;
		}
	}

	// If data validation PAYLOADKEY is provided, validate input.
	function validateInput(e) {
		if (payloadKey) {
			let { error } = validator({ [payloadKey]: e.target.value });
			if (error) {
				setInputError(true);
				return;
			}
		}
		handleOnChange(e);
	}

	// If inputError, generate and format error icon
	function errorIcon() {
		if (inputError) {
			let icon;
			icon = React.createElement(ReactIcons['AiFillExclamationCircle']);
			return (
				// <div style={{ fontSize: '1rem', color: 'red' }}>{icon}</div>;
				<IconContext.Provider value={{ size: iconInfo.size }}>
					<div className={styles.error}>{icon}</div>
				</IconContext.Provider>
			);
		} else {
			return <div></div>;
		}
	}

	let setUpClassNames = `validation-feedback ${styles.field} ${
		fieldStyle === 'outlined' ? styles.outlined : styles.filled
	}`;

	return (
		<div className={setUpClassNames} style={{ width: width }} id="inputField">
			{icondiv()}
			<div className={styles.inputArea}>
				<input type={fieldType} className={styles.input} required onChange={validateInput} />
				<label for="" className={styles.label}>
					{placeholder}
				</label>
			</div>
			{errorIcon()}
		</div>
	);
};
