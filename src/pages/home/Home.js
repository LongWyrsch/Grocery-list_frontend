// React
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, getUser, userHasError } from '../../features/user/state/userSlice';
import { getLists } from '../../features/lists/state/listsSlice';
import { getRecipes } from '../../features/recipes/state/recipesSlice';

// CSS
import styles from './Home.module.css';

// Components
import { Navbar } from '../../components/Navbar/Navbar';
import { Grid } from '../../components/Grid/Grid';
import { ErrorMessage } from '../Error/ErrorMessage';
import { Account } from '../Account/Account';

// libs
import { useTranslation } from 'react-i18next';

export const Home = () => {
	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	const userAuthError = useSelector(userHasError);

	const isAuthenticated = user.email || user.google_name ? true : false;
	
	const { i18n } = useTranslation();
	
	useEffect(() => {
		console.log('Dispatching getUser, getLists, getRecipes')
		dispatch(getUser());
		i18n.changeLanguage(user.language);
	}, [dispatch]);

	let { targetPage } = useParams();
	let accountPage = targetPage === 'account'



	return (
		<div className={styles.homePage}>
			{isAuthenticated && <Navbar targetPage={targetPage} user={user}/>}
			{isAuthenticated && !accountPage && <Grid targetPage={targetPage} user={user}/>}
			{isAuthenticated && accountPage && <Account targetPage={targetPage} user={user}/>}
			{userAuthError && <ErrorMessage title='Signed out' message='Please try signing in again.'/>}
		</div>
	);
};
