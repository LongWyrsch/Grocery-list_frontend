import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CornerAvatar.module.css';
import { useTranslation } from 'react-i18next';

import { useSelector, useDispatch } from 'react-redux';
import { selectUser, getUser, updateUser } from '../../user/state/userSlice';

import { BsFillGearFill } from 'react-icons/bs';
import { MdOutlineLogout } from 'react-icons/md';

import Avatar from 'boring-avatars';

export const CornerAvatar = () => {
	const menuRef = useRef();
	const { t } = useTranslation();
	const navigate = useNavigate();

	const [open, setOpen] = useState(false);
	const user = useSelector(selectUser);

	const gearIcon = React.createElement(BsFillGearFill);
	const logoutIcon = React.createElement(MdOutlineLogout);

	const logout = async () => {
		 const response = await fetch('http://localhost:3000/users/logout', {
			method: 'GET',
			credentials: 'include',
		})
		if (response.status===200) {
			navigate('/signin')
		} else {
			window.alert('Failed to logout. Please try again...')
		}
	};

	function openMenu() {
		setOpen((prev) => !prev);
	}

	useEffect(() => {
		let handler = (e) => {
			if (!menuRef.current.contains(e.target)) setOpen(false);
		};
		document.addEventListener('mousedown', handler);
		return () => document.removeEventListener('mousedown', handler);
	});

	return (
		<div className={styles.dropdownContainer}>
			<button onClick={openMenu} className={styles.avatar}>
				<Avatar
					size={40}
					name={user.email || user.google_name}
					variant={user.avatar_variant}
					colors={user.avatar_colors}
				/>
			</button>

			<div className={`${open ? styles.activeMenu : styles.inactiveMenu} ${styles.menu}`} ref={menuRef}>
				{/* <div className={styles.menu}> */}
				<MenuOption
					option="Settings"
					icon={gearIcon}
					handleClick={() => {
						navigate('/account');
					}}
				/>
				<hr />
				<MenuOption option="Logout" icon={logoutIcon} handleClick={logout} />
			</div>
		</div>
	);
};

function MenuOption({ option, icon, handleClick }) {
	return (
		<div onClick={handleClick} data-option={option} className={styles.option}>
			{icon}
			{option}
		</div>
	);
}
