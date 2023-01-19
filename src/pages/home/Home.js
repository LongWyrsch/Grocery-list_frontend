// React
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { selectTheme, toggleTheme } from '../../features/theme/state/themeSlice';
import { selectUser, getUser, userHasError } from '../../features/user/state/userSlice';
import { getLists } from '../../features/lists/state/listsSlice';
import { getRecipes } from '../../features/recipes/state/recipesSlice';

import styles from './Home.module.css';

// Components
import { Navbar } from '../../components/Navbar/Navbar';
import { Grid } from '../../components/Grid/Grid';
import { ErrorMessage } from '../Error/ErrorMessage';

export const Home = () => {
	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	const userAuthError = useSelector(userHasError);

	const isAuthenticated = user.email || user.google_name ? true : false;

	useEffect(() => {
		console.log('Dispatching getUser, getLists, getRecipes')
		dispatch(getUser());
		dispatch(getLists());
		dispatch(getRecipes());
	}, [dispatch]);

	return (
		<div className={styles.homePage}>
			{isAuthenticated && <Navbar/>}
			{isAuthenticated && <Grid/>}
			{userAuthError && <ErrorMessage title='Signed out' message='Please try signing in again.'/>}
		</div>
	);
};
