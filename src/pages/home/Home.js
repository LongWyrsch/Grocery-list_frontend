import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { selectUser, getUser, updateUser } from '../../features/user/state/userSlice';

import styles from './Home.module.css';
import { Navbar } from '../../components/Navbar/Navbar';
import { Lists } from '../Lists/Lists';
import { Recipes } from '../Recipes/Recipes';

export const Home = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
	
  let { targetPage } = useParams();

	useEffect(() => {
		dispatch(getUser)
	}, []);

	return (
		<div className={styles.homePage}>
			{/* <Navbar page={page} setPage={setPage} /> */}
			<Navbar page={targetPage} />
			{targetPage === 'lists' ? <Lists /> : <Recipes />}
		</div>
	);
};
