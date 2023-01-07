import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './Home.module.css';
import { Navbar } from '../../components/Navbar/Navbar';
import { Lists } from '../Lists/Lists';
import { Recipes } from '../Recipes/Recipes';

export const Home = () => {

	let { targetPage } = useParams();

	return (
		<div className={styles.homePage}>
			{/* <Navbar page={page} setPage={setPage} /> */}
			<Navbar page={targetPage} />
			{targetPage === 'lists' ? <Lists /> : <Recipes />}
		</div>
	);
};
