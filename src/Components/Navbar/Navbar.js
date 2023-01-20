// React
import React, { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// CSS
import styles from './Navbar.module.css';

// components
import { Button } from '../Button/Button';
import { ThemeSwitch } from '../../features/theme/components/ThemeSwitch';
import { CornerAvatar } from '../../features/avatar/components/CornerAvatar';

// libs
import { t } from 'i18next';

export const Navbar = () => {
	const navigate = useNavigate();
	let { targetPage } = useParams();
	let recipeButtonRef = useRef();
	let listButtonRef = useRef();

	useEffect(() => {
			recipeButtonRef.current.dataset.show = targetPage === 'recipes' ? true : false;
			listButtonRef.current.dataset.show = targetPage === 'lists' ? true : false;
	});

	let homePage = targetPage !== 'account'

	return (
		<div className={styles.navbar}>
			<div className={styles.buttonGroup}>
				<div className={styles.imgContainer}>
					<img className={styles.logo} src={require('../../assets/GroceryList_logo.png')} alt="logo" />
				</div>
					<Button
						buttonStyle={targetPage === 'lists' ? 'filled' : 'outlined'}
						text={t('home.GroceryLists')}
						onClick={() => {
							navigate('/home/lists');
						}}
					/>
					<Button
						buttonStyle={targetPage === 'recipes' ? 'filled' : 'outlined'}
						text={t('home.Recipes')}
						onClick={() => {
							navigate('/home/recipes');
						}}
					/>
			</div>
			<div className={styles.buttonGroup}>
				<div id="recipeButton" data-show ref={recipeButtonRef}>
					{homePage && (
						<Button
							buttonStyle="elevated"
							text={t('home.NewRecipe')}
							iconInfo={{
								iconName: 'BsPlusLg',
								size: '1rem',
							}}
							width="100%"
						/>
					)}
				</div>
				<div id="listButton" data-show ref={listButtonRef}>
					<Button
						buttonStyle="elevated"
						text={t('home.NewList')}
						iconInfo={{
							iconName: 'BsPlusLg',
							size: '1rem',
						}}
						width="100%"
					/>
				</div>
			</div>
			<div className={styles.buttonGroup} style={{ justifyContent: 'right' }}>
				<ThemeSwitch />
				<CornerAvatar />
			</div>
		</div>
	);
};
