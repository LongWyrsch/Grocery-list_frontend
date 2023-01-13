import React from 'react';
import styles from './Chip.module.css';
// import { BsFillCaretDownFill } from 'react-icons/bs';

export const Chip = ({ text, handleChange, value, height = '2rem' }) => {
	


    return (
		// <div className={styles.chipWrapper}>
		// 	<div className={styles.chip}>
		// 		<div className={styles.text}>{text}</div>
		// 		<div className={styles.icon}>{BsFillCaretDownFill}</div>
		// </div>
		<div className={styles.chipWrapper}>
			{/* <form> */}
				<select id="section" name="section" value={value} onChange={handleChange} className={styles.chip} style={{height: height}}>
					<option value="veggies">veggies</option>
					<option value="bread">bread</option>
					<option value="dairies">dairies</option>
					<option value="seasonings">seasonings</option>
					<option value="grains">grains</option>
					<option value="meat">meat</option>
					<option value="other">other</option>
				</select>
			{/* </form> */}
		</div>
	);
};

// function MenuOption({ option, handleClick }) {
// 	return (
// 		<div onClick={handleClick} data-option={option} className={styles.option}>
// 			{option}
// 		</div>
// 	);
// }
