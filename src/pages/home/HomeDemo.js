// React
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, getUser, userHasError, initializeUserDemo } from '../../features/user/state/userSlice';
import { getLists } from '../../features/lists/state/listsSlice';
import { getRecipes } from '../../features/recipes/state/recipesSlice';

// CSS
import styles from './Home.module.css';

// Components
import { Navbar } from '../../components/Navbar/Navbar';
import { GridDemo } from '../../components/Grid/GridDemo';
import { ErrorMessage } from '../Error/ErrorMessage';
import { AccountDemo } from '../Account/AccountDemo';

// libs
import { useTranslation } from 'react-i18next';

export const HomeDemo = () => {
	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	const userAuthError = useSelector(userHasError);
	
	const isAuthenticated = user.email || user.google_name ? true : false;
	
	const { t, i18n } = useTranslation();
	
	
	useEffect(() => {
		console.log('Dispatching getUser, getLists, getRecipes');
		dispatch(initializeUserDemo());
	}, [dispatch]);

	useEffect(() => {
		console.log(user.language);
		i18n.changeLanguage(user.language);
	}, [user.language]);

	let { targetPage } = useParams();
	let accountPage = targetPage === 'account';

	return (
		<div className={styles.homePage}>
			{isAuthenticated && <Navbar targetPage={targetPage} user={user} />}
			{isAuthenticated && !accountPage && <GridDemo targetPage={targetPage} user={user} />}
			{isAuthenticated && accountPage && <AccountDemo targetPage={targetPage} user={user} />}
			{userAuthError && <ErrorMessage title={t('warnings.SignedOut')} message={t('warnings.TryAgain')} />}
		</div>
	);
};
