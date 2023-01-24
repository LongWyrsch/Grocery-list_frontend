// React
import React, { useState, useEffect, useRef } from 'react';

// Redux
import { useDispatch } from 'react-redux';

// Css
import styles from './LanguagePicker.module.css';

// libs
import { useTranslation } from 'react-i18next';
import { Icon } from '@iconify/react'

// React-icons
import { IconContext } from 'react-icons';
import { MdTranslate } from 'react-icons/md';
import { FaChevronDown } from 'react-icons/fa';
import { updateUser } from '../../user/state/userSlice';

export const LanguagePicker = ({user}) => {
	const dispatch = useDispatch()
	const { i18n } = useTranslation();

	const [language, setLanguage] = useState(i18n.language.substring(0,2).toUpperCase());
	const [open, setOpen] = useState(false);


	const pickLanguage = (lang) => {
		i18n.changeLanguage(lang);
		setLanguage(lang);
		if (user) {
			let updatedUser = {...user, language: lang}
			dispatch(updateUser(updatedUser))
		}
	}

    const handleOnClick = () => {
        setOpen((prev) => !prev);
	}

    let menuRef = useRef()
    
	useEffect(() => {
		let handler = (e) => {
			if (!menuRef.current.contains(e.target)) setOpen(false);
		}

        document.addEventListener('mousedown', handler)

        return()=>{
            document.removeEventListener('mousedown', handler)
        }
        
	});

    // Make active option bold
    const menuOptions = document.querySelectorAll('[data-option]')
    menuOptions.forEach(option => {
        if (option.dataset.option === language) {
            option.classList.add(`${styles.activeOption}`)
        } else {
            option.classList.remove(`${styles.activeOption}`)
        }
    })

	const translationIcon = React.createElement(MdTranslate)
	const arrowIcon = React.createElement(FaChevronDown)

	return (
		<div className={styles.dropdownContainer}>
			<button className={styles.button} onClick={handleOnClick}>
				{/* <IconContext.Provider value={{ size: '1.3rem', color: 'var(--m3--sys--on-surface-variant)', backgroundColor: 'none' }}>
					<div className={styles.langIcon}>{translationIcon}</div>
				</IconContext.Provider> */}
				
				<div className={styles.langIcon}><Icon icon="ion:language" style={{width: '1.3rem', height: '1.3rem', background: 'none'}}/></div>

				{language}
				<IconContext.Provider value={{ size: '0.7rem', color: 'var(--m3--sys--on-surface-variant)' }}>
					<div className={open? styles.upIcon : styles.downIcon}>{arrowIcon}</div>
				</IconContext.Provider>
			</button>
			<div className={`${open ? styles.activeMenu : styles.inactiveMenu} ${styles.menu}`} ref={menuRef}>
				{/* <div className={styles.menu}> */}
				<LanguageOption option='DE' handleClick={pickLanguage}/>
				<hr />
				<LanguageOption option='EN' handleClick={pickLanguage}/>
				<hr />
				<LanguageOption option='FR' handleClick={pickLanguage}/>
			</div>
		</div>
	);
};

const LanguageOption =  ({option, handleClick}) => {
    return (
        <div onClick={()=>handleClick(option)}  data-option={option} className={styles.option}>
            {option}
        </div>
    )
}