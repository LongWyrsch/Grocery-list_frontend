import React from 'react';
import styles from './Checkbox.module.css';
import { HiCheck } from 'react-icons/hi';

export const Checkbox = ({ checked, handleChange, wrapperSize='2rem', boxSize='1.5rem', checkSize='1.5rem', disabled = false }) => {

	const handleOnClick = () => {
        if (disabled) return;
		handleChange();
	};

	const setContainerClass = `${disabled && styles.disabled} ${styles.checkboxWrapper}`;
	const setCheckboxClass = `${disabled && styles.disabled} ${checked && styles.checked} ${styles.checkbox}`;
	const setIconClass = `${checked && styles.checked} ${styles.iconContainer}`;

	return (
		<div className={setContainerClass} onClick={handleOnClick} style={{ width: wrapperSize, height: wrapperSize }}>
			<div className={setCheckboxClass} style={{width: boxSize, height: boxSize}}></div>
            <div className={setIconClass} style={{fontSize: checkSize}}>
                <HiCheck />
            </div>
		</div>
	);
};


// style={{width: {wrapperSize}, height: {wrapperSize}}}
