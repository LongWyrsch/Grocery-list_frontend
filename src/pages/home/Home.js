import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import userSlice, { selectUser, getUser, updateUser } from '../../features/user/state/userSlice';

import styles from './Home.module.css';
import { Navbar } from '../../components/Navbar/Navbar';
import { Lists } from '../Lists/Lists';
import { Recipes } from '../Recipes/Recipes';

export const Home = () => {
	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	
	let { targetPage } = useParams();
	const displayPage = targetPage === 'lists' ?  <Lists /> : <Recipes />

	useEffect(() => {
		dispatch((getUser()));
	}, [dispatch]);

	const isAuthenticated = user.email || user.googleName? true : false

	return (
		<div className={styles.homePage}>
			{isAuthenticated && <Navbar page={targetPage} />}
			<h1>{user.email}{user.googleName}</h1>
			{isAuthenticated && displayPage}
		</div>
	);
};
