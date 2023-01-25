// React
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// CSS
import styles from './CornerAvatar.module.css';

// Redux
import { useDispatch } from 'react-redux';
import { clearUser } from '../../user/state/userSlice';
import { clearRecipes } from '../../recipes/state/recipesSlice';
import { clearLists } from '../../lists/state/listsSlice';

// React-icons
import { BsFillGearFill } from 'react-icons/bs';
import { MdOutlineLogout } from 'react-icons/md';

// libs
import Avatar from 'boring-avatars';
import { t } from 'i18next';

export const CornerAvatar = ({user}) => {
	const navigate = useNavigate();
	const dispatch = useDispatch()

	const menuRef = useRef();
	const [open, setOpen] = useState(false);

	const gearIcon = React.createElement(BsFillGearFill);
	const logoutIcon = React.createElement(MdOutlineLogout);

	const logout = async () => {
		// If demo account, return to homepage
		if (user.uuid === 'a8eefbb0-9e50-4c00-b18f-798f2b951633') {
			navigate('/')
			return
		}

		let response = await fetch('http://localhost:3000/users/logout', {
			method: 'GET',
			credentials: 'include',
		});
		if (response.status === 200) {
			dispatch(clearUser())
			dispatch(clearRecipes())
			dispatch(clearLists())
			navigate('/signin');
		} else {
			window.alert('Failed to logout. Please try again...');
		}
	};

	function toggleMenu() {
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
			<button onClick={toggleMenu} className={styles.avatar}>
				<Avatar
					size={40}
					name= {user.email || user.google_name}
					variant={user.avatar_variant}
					colors={user.avatar_colors}
				/>
			</button>
			<div className={`${open ? styles.activeMenu : styles.inactiveMenu} ${styles.menu}`} ref={menuRef}>
				<MenuOption
					option={t('cornerAvatar.Account')}
					icon={gearIcon}
					handleClick={() => {
						toggleMenu()
						if (user.uuid === 'a8eefbb0-9e50-4c00-b18f-798f2b951633') {
							navigate('/demo/account')
						} else {
							navigate('/home/account');
						}
					}}
				/>
				<hr />
				<MenuOption option={t('cornerAvatar.LogOut')} icon={logoutIcon} handleClick={logout} />
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
