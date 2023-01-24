import React from 'react';
import styles from './Chip.module.css';

import { useTranslation } from 'react-i18next';

export const Chip = ({ handleChange, value, height = '2rem' }) => {
	
	const { t } = useTranslation();

    return (
		// <div className={styles.chipWrapper}>
		// 	<div className={styles.chip}>
		// 		<div className={styles.text}>{text}</div>
		// 		<div className={styles.icon}>{BsFillCaretDownFill}</div>
		// </div>
		<div className={styles.chipWrapper}>
			{/* <form> */}
				<select id="section" name="section" value={value} onChange={handleChange} className={styles.chip} style={{height: height}}>
					<option value={t('section.veggies')}>{t('section.veggies')}</option>
					<option value={t('section.bread')}>{t('section.bread')}</option>
					<option value={t('section.dairies')}>{t('section.dairies')}</option>
					<option value={t('section.seasonings')}>{t('section.seasonings')}</option>
					<option value={t('section.grains')}>{t('section.grains')}</option>
					<option value={t('section.meat')}>{t('section.meat')}</option>
					<option value={t('section.other')}>{t('section.other')}</option>
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
