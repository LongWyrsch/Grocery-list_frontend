import React from 'react';
import styles from './Button.module.css';
import * as FCicons from 'react-icons/fc';
import * as BSicons from 'react-icons/bs';
import * as MDicons from 'react-icons/md';

export const Button = ({ buttonStyle, text = '', onClick, iconInfo = {iconName: '', size:''}, width = '', addclass='', borderRadius='100px'}) => {
	// Combine all imported React-icons library here.
	const ReactIcons = { ...FCicons, ...BSicons, ...MDicons};

	// Check if parent component passed a icon object to include in the textfield.
	const iconExists = iconInfo.iconName === '' ?  false : true; // [1]

	// If an icon is required, create a div for it. Otherwise the button will not have a dedicated div for the icon.
	let icon;
	let icondiv;
	if (iconExists) {
		icon = React.createElement(ReactIcons[iconInfo.iconName]);
		icondiv = (
			<div style={{ fontSize: iconInfo.size }} className={styles.icon} >
				{icon}
			</div>
		);
	} else {
		icondiv = <div></div>;
	}

	// Determine the button's classes
	let setUpClassNames;
	switch (buttonStyle) {
		case 'filled':
			setUpClassNames = `${styles.button} ${styles.filled} ${addclass}`;
			break;
		case 'outlined':
			setUpClassNames = `${styles.button} ${styles.outlined} ${addclass}`;
			break;
		case 'text':
			setUpClassNames = `${styles.button} ${styles.text} ${addclass}`;
			break;
		default:
			setUpClassNames = `${styles.button} ${styles.elevated} ${addclass}`;
			break;
	}

	return (
		<button onClick={onClick} className={setUpClassNames} style={{width: width, borderRadius: borderRadius}}>
			<div className={styles.buttonOpacityLayer}>
				{icondiv}
				{text}
			</div>
		</button>
	);
};


// [1] 
// Another way to check if an object contains a key: const iconExists = Object.keys(iconInfo).length === 0 && iconInfo.constructor === Object ? false : true;
