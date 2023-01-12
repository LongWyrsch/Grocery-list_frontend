import React, { useState } from 'react';
import materialdesign from './Textfield.module.css';
import card from './TextfieldCard.module.css';
import { useTranslation } from 'react-i18next';

import { IconContext } from 'react-icons';
import * as FAicons from 'react-icons/fa';
import * as AIicons from 'react-icons/ai';
import * as FIicons from 'react-icons/fi';


export const Textfield = ({
	fieldStyle,
	cssStyle = 'materialdesign',
	fieldType = 'text',
	placeholder = '',
	value,
	handleOnChange,
	iconInfo = {},
	width = '',
	height = '3.5rem',
	validator,
	payloadKey,
	textAlign='left',
}) => {
		
	const styles = cssStyle==='card'? card : materialdesign

	const [inputIsInvalid, setInputIsInvalid] = useState(false);
	const [inputErrorMessage, setInputErrorMessage] = useState(false);
	
	const { t } = useTranslation();

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
				if (error.message.includes('pattern')) {
					setInputErrorMessage(t('auth.signupPage.passwordPattern'))
				} else if (error.message.includes('empty')) {
					setInputErrorMessage(t('auth.signupPage.required'))
				} else if (error.message.includes('minimum')) {
					setInputErrorMessage(t('auth.signupPage.minimum'))
				}
				setInputIsInvalid(true);
				return;
			} else {
				setInputIsInvalid(false);
			}
		}
		handleOnChange(e);
	}

	function errorMessage() {
		return (
			<div className={styles.errorMessage}>{inputErrorMessage}</div>
		)
	}

	// If inputIsInvalid, generate and format error icon
	function errorIcon() {
		let icon = React.createElement(ReactIcons['AiFillExclamationCircle']);
		return (
			<IconContext.Provider value={{ size: iconInfo.size }}>
				<div className={styles.errorIcon}>{icon}</div>
			</IconContext.Provider>
		);
	}

	let setUpClassNames = `validation-feedback ${styles.field} ${
		fieldStyle === 'outlined' ? styles.outlined : styles.filled
	}`;

	return (
		<div style={{ width: width }}>
			<div className={setUpClassNames} style={{height: height}}>
				{icondiv()}
				<div className={styles.inputArea}>
					<input type={fieldType} className={styles.input} required onChange={validateInput} value={value} style={{textAlign:textAlign}}/>
					<label htmlFor="" className={styles.label}>
						{placeholder}
					</label>
				</div>
				{inputIsInvalid && errorIcon()}
			</div>
			{inputIsInvalid && errorMessage()}
		</div>
	);
};
