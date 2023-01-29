// React
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, getUser, userHasError } from '../../features/user/state/userSlice';

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
	const navigate = useNavigate()
	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	const userAuthError = useSelector(userHasError);

	const isAuthenticated = user.email || user.google_name ? true : false;

	const { t, i18n } = useTranslation();
		
	useEffect(() => { 
		i18n.changeLanguage(user.language);
	 }, [user.language])

	let { targetPage } = useParams()
	if (targetPage === undefined) targetPage = 'lists' // Default to lists

	let accountPage = targetPage === 'account'


	return (
		<div className={styles.homePage}>
			{isAuthenticated && <Navbar targetPage={targetPage} user={user}/>}
			{isAuthenticated && !accountPage && <Grid targetPage={targetPage} user={user}/>}
			{isAuthenticated && accountPage && <Account targetPage={targetPage} user={user}/>}
			{userAuthError && <ErrorMessage title={t('warnings.SignedOut')} message={t('warnings.TryAgain')}/>}
		</div>
	);
};
