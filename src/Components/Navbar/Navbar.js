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

export const Navbar = ({targetPage, user}) => {
	const navigate = useNavigate();
	let recipeButtonRef = useRef();
	let listButtonRef = useRef();

	useEffect(() => {
		recipeButtonRef.current.dataset.show = targetPage === 'recipes' ? true : false;
		listButtonRef.current.dataset.show = targetPage === 'lists' ? true : false;
	});

	let homePage = targetPage !== 'account';

	// Check if demo account is being used
	let path = user.uuid === 'a8eefbb0-9e50-4c00-b18f-798f2b951633' ? 'demo' : 'home'

	return (
		<div className={styles.navbar}>
			<div className={styles.buttonGroup}>
				<div className={styles.imgContainer}>
					<img className={styles.logo} src={require('../../assets/GroceryList_logo.png')} alt="logo" />
				</div>
				<div className={styles.tabs}>
					<div className={`${styles.tabLists} ${targetPage==='lists' && styles.activeTab}`} onClick={() => {navigate(`/${path}/lists`)}}>
						<svg preserveAspectRatio="none" viewBox="0 0 37 9" fill="none" xmlns="http://www.w3.org/2000/svg">
							<g id="tab">
								<path
									id="tabPath"
									d="M9 0C4.73077 -0.000487574 4.26923 9.00049 0 9.00049H37C32.7308 9.00049 32.2692 0.000488449 28 0.000488449L9 0Z"
								/>
							</g>
						</svg>
						<p>{t('home.GroceryLists')}</p>
					</div>
					<div className={`${styles.tabRecipes} ${targetPage==='recipes' && styles.activeTab}`} onClick={() => {navigate(`/${path}/recipes`)}}>
						<svg preserveAspectRatio="none" viewBox="0 0 37 9" fill="none" xmlns="http://www.w3.org/2000/svg">
							<g id="tab">
								<path
									id="tabPath"
									d="M9 0C4.73077 -0.000487574 4.26923 9.00049 0 9.00049H37C32.7308 9.00049 32.2692 0.000488449 28 0.000488449L9 0Z"
								/>
							</g>
						</svg>
						<p>{t('home.Recipes')}</p>
					</div>
				</div>
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
							borderRadius="1rem"
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
						borderRadius="1rem"
					/>
				</div>
			</div>
			<div className={styles.buttonGroup} style={{ justifyContent: 'right' }}>
				<ThemeSwitch />
				<CornerAvatar user={user}/>
			</div>
		</div>
	);
};
