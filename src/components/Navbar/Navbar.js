// React
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Redux
import { useDispatch } from 'react-redux';
import { clearUser } from '../../features/user/state/userSlice';
import { clearRecipes } from '../../features/recipes/state/recipesSlice';
import { clearLists } from '../../features/lists/state/listsSlice';

// CSS
import styles from './Navbar.module.css';

// components
import { Button } from '../Button/Button';
import { ThemeSwitch } from '../../features/theme/components/ThemeSwitch';
import { CornerAvatar } from '../../features/avatar/components/CornerAvatar';

// libs
import { t } from 'i18next';
import { Icon } from '@iconify/react';

export const Navbar = ({targetPage, user}) => {
	const navigate = useNavigate();
	const dispatch = useDispatch()
	let recipeButtonRef = useRef();
	let listButtonRef = useRef();
	const [showDrawer, setShowDrawer] = useState(false)

	useEffect(() => {
		recipeButtonRef.current.dataset.show = targetPage === 'recipes' ? true : false;
		listButtonRef.current.dataset.show = targetPage === 'lists' ? true : false;
	});

	let homePage = targetPage !== 'account';

	// Check if demo account is being used
	let path = user.uuid === 'a8eefbb0-9e50-4c00-b18f-798f2b951633' ? 'demo' : 'home'

	const logout = async () => {
		// If demo account, return to homepage
		if (user.uuid === 'a8eefbb0-9e50-4c00-b18f-798f2b951633') {
			navigate('/')
			return
		}

		let response = await fetch('https://mygrocerylists.up.railway.app/users/logout', {
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

	return (
		<div className={styles.navbar}>
			<div className={`${showDrawer && styles.showDrawer} ${styles.blur}`} onClick={() => setShowDrawer(false)}>
			</div>
			<div className={`${showDrawer && styles.showDrawer} ${styles.drawer}`} onClick={(e) => e.stopPropagation() }>
				<div className={styles.logoAvatar}>
					{/* <div className={styles.imgContainer}>
						<img className={styles.logo} src={require('../../assets/GroceryList_logo.png')} alt="logo" />
					</div> */}
					<div className={styles.avatar}>
						<CornerAvatar user={user}/>
					</div>		
				</div>
				<div className={styles.lists} onClick={() => {
					setShowDrawer(false)
					navigate(`/${path}/lists`)
				}}>
					<div className={styles.icon}><Icon icon="ph:list-checks" style={{width: '2rem', height: '2rem'}}/></div>
					<div className={styles.text}>{t('home.GroceryLists')}</div>
				</div>
				<div className={styles.recipes} onClick={() => {
					setShowDrawer(false)
					navigate(`/${path}/recipes`)
				}}>
					<div className={styles.icon}><Icon icon="icon-park-outline:chef-hat" style={{width: '2rem', height: '2rem'}}/></div>
					<div className={styles.text}>{t('home.Recipes')}</div>
				</div>
				<div className={styles.line}/>					
				<div className={styles.account} onClick={() => {
					setShowDrawer(false)
					navigate(`/${path}/account`)
				}}>
					<div className={styles.icon}><Icon icon="bi:gear-fill" style={{width: '2rem', height: '2rem'}}/></div>
					<div className={styles.text}>{t('cornerAvatar.Account')}</div>
				</div>
				<div className={styles.theme}>
					<div className={styles.icon}><ThemeSwitch/></div>
					<div className={styles.text}>{t('quickTour.theme')}</div>
				</div>
				<div className={styles.logout} onClick={logout}>
					<div className={styles.icon}><Icon icon="ic:baseline-logout" style={{width: '2rem', height: '2rem'}}/></div>
						{t('cornerAvatar.LogOut')}
				</div>
			</div>
			<div className={styles.smallNav}>
				<div className={styles.smallMenu} onClick={() => setShowDrawer(true)}>
					<Icon icon="mingcute:menu-fill" style={{width: '2rem', height: '2rem'}}/>
				</div>
				<div className={styles.smallName}>
					{targetPage==='recipes'? t('home.Recipes') : t('home.GroceryLists') }  
				</div>
				<div className={styles.imgContainer}>
					<img className={styles.logo} src={require('../../assets/GroceryList_logo.png')} alt="logo" />
				</div>
			</div>
			<div className={styles.largeNav}>
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
					<div id="recipeButton" data-show ref={recipeButtonRef} className={styles.addButton}>
						{homePage && (
							<Button
								buttonStyle="elevated"
								text={t('home.NewRecipe')}
								iconInfo={{
									iconName: 'BsPlusLg',
									size: '1.5rem',
								}}
								width="80%"
								borderRadius="1rem"
							/>
						)}
					</div>
					<div id="listButton" data-show ref={listButtonRef} className={styles.addButton}>
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
		</div>
	);
};
