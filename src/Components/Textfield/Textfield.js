import React from 'react';
import styles from './Textfield.module.css';
import * as FAicons from 'react-icons/fa';
import * as AIicons from 'react-icons/ai';

export const Textfield = ({ fieldStyle, placeholder = '', handleOnChange, iconInfo = {} }) => {
	// Add all imported React-icons library here.
	const ReactIcons = { ...FAicons, ...AIicons };

	// Check if parent component passed a icon object to include in the textfield.
	const iconExists = Object.keys(iconInfo).length === 0 && iconInfo.constructor === Object ? false : true;

	// Define icon <div> if an icon was provided.
	let icon;
	let icondiv;

	if (iconExists) {
		icon = React.createElement(ReactIcons[iconInfo.iconName]);
		icondiv = (
			<div style={{ fontSize: iconInfo.size, color: iconInfo.color }} className={styles.icon}>
				{icon}
			</div>
		);
	} else {
		icondiv = <div></div>
	}

	let setUpClassNames = `${styles.field} ${fieldStyle === 'outlined'? styles.outlined : styles.filled}`

	return (
		<div className={setUpClassNames} >
			{icondiv}
			<div className={styles.inputArea}>
				<input type="text" className={styles.input} required onChange={handleOnChange} />
				<label for="" className={styles.label}>
					{placeholder}
				</label>
			</div>
		</div>
	);
};
