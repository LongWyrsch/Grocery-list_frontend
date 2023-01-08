import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import userSlice, { selectUser, getUser, updateUser } from '../../features/user/state/userSlice';

import styles from './Home.module.css';
import { Navbar } from '../../components/Navbar/Navbar';
import { Lists } from '../../features/Lists/components/Lists';
import { Recipes } from '../../features/Recipes/components/Recipes';

export const Home = () => {
	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	
	let { targetPage } = useParams();
	let displayPage = targetPage === 'lists' ?  <Lists /> : <Recipes />

	useEffect(() => {
		dispatch((getUser()));
	}, [dispatch]);

	const isAuthenticated = user.email || user.googleName? true : false

	return (
		<div className={styles.homePage}>
			<h1>Hello {user.email} {user.googleName}</h1>
			{isAuthenticated && <Navbar page={targetPage} />}
			{isAuthenticated && displayPage}
		</div>
	);
};
