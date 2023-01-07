import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectTheme, toggleTheme } from '../../features/theme/state/themeSlice';

import styles from './Navbar.module.css';

import { Button } from '../Button/Button';
import { ThemeSwitch } from '../../features/theme/components/ThemeSwitch/ThemeSwitch';


export const Navbar = ({ page, setPage }) => {
	const theme = useSelector(selectTheme);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	//Toggle app theme
	function handleOnClickTheme(e) {
		dispatch(toggleTheme());
	}

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
            navigate('/home/lists')
					}}
				/>
				<Button
					buttonStyle={page === 'recipes' ? 'filled' : 'outlined'}
					text="Recipes"
					onClick={() => {
						// setPage('recipes');
            navigate('/home/recipes')
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
			<div className={styles.buttonGroup}>
          <ThemeSwitch />
			</div>
		</div>
	);
};
