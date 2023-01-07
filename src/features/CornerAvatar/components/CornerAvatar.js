import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom' 
import styles from './CornerAvatar.module.css';
import { useTranslation } from 'react-i18next';

import { BsFillGearFill } from 'react-icons/bs';
import { MdOutlineLogout } from 'react-icons/md';

import Avatar from "boring-avatars";

export const CornerAvatar = () => {
	
	const navigate = useNavigate()

	const logout = () => {
		window.open('http://localhost:3000/logout', '_self');
	};

	const [open, setOpen] = useState(false);

	const { t } = useTranslation();

	function openMenu() {
		setOpen((prev) => !prev);
	}

	let menuRef = useRef();

	useEffect(() => {
		let handler = (e) => {
			if (!menuRef.current.contains(e.target)) setOpen(false);
		};

		document.addEventListener('mousedown', handler);

		return () => {
			document.removeEventListener('mousedown', handler);
		};
	});

	const gearIcon = React.createElement(BsFillGearFill);
	const logoutIcon = React.createElement(MdOutlineLogout);

	return (
		<div className={styles.dropdownContainer}>
			<button onClick={openMenu}>
				<Avatar
					size={40}
					name="Maria Mitchell"
					variant="beam"
					colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
				/>
			</button>

			<div className={`${open ? styles.activeMenu : styles.inactiveMenu} ${styles.menu}`} ref={menuRef}>
				{/* <div className={styles.menu}> */}
				<LanguageOption option="Settings" icon={gearIcon} handleClick={() => { navigate('/settings') }} />
				<LanguageOption option="Logout" icon={logoutIcon} handleClick={logout} />
			</div>
		</div>
	);
};

function LanguageOption({ option, icon, handleClick}) {
	return (
		<div onClick={handleClick} data-option={option} className={styles.option}>
			{icon}{option}
		</div>
	);
}
