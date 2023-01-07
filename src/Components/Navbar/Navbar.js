import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Navbar.module.css';

import { Button } from '../Button/Button';
import { ThemeSwitch } from '../../features/theme/components/ThemeSwitch';
import { CornerAvatar } from '../../features/CornerAvatar/components/CornerAvatar';

export const Navbar = ({ page, setPage }) => {
	const navigate = useNavigate();

	return (
		<div className={styles.navbar}>
			<div className={styles.buttonGroup}>
				<div className={styles.imgContainer}>
					<img className={styles.logo} src={require('../../assets/GroceryList_logo.png')} alt="logo" />
				</div>
				<Button
					buttonStyle={page === 'lists' ? 'filled' : 'outlined'}
					text="Grocery lists"
					onClick={() => {
						// setPage('lists');
						navigate('/home/lists');
					}}
				/>
				<Button
					buttonStyle={page === 'recipes' ? 'filled' : 'outlined'}
					text="Recipes"
					onClick={() => {
						// setPage('recipes');
						navigate('/home/recipes');
					}}
				/>
			</div>
			<div className={styles.buttonGroup}>
				<Button
					buttonStyle="elevated"
					text={page === 'lists' ? 'New list' : 'New recipe'}
					onClick={() => {}}
					iconInfo={{
						iconName: 'BsPlusLg',
						size: '1rem',
					}}
					width="100%"
				/>
			</div>
			<div className={styles.buttonGroup} style={{ justifyContent: 'right' }}>
				<ThemeSwitch />
				<CornerAvatar />
			</div>
		</div>
	);
};
