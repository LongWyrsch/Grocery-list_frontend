import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import userSlice, { selectUser, getUser, updateUser } from '../../features/user/state/userSlice';
// import listsSlice, { selectLists, getLists, updateList } from '../../features/user/state/userSlice';
import recipesSlice, { selectRecipes, getRecipes, updateRecipe } from '../../features/recipes/state/recipesSlice';

import styles from './Home.module.css';
import { Navbar } from '../../components/Navbar/Navbar';
// import { Lists } from '../../features/Lists/components/Lists';
// import { Recipes } from '../../features/Recipes/components/Recipes';

import { Grid } from '../../components/Grid/Grid';

export const Home = () => {
	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	// const lists = useSelector(selectLists);
	// const recipes = useSelector(selectRecipes);
	let { targetPage } = useParams();
	useEffect(() => {
		dispatch(getUser());
		// dispatch(getLists());
		dispatch(getRecipes());
	}, [dispatch]);

	const isAuthenticated = user.email || user.google_name ? true : false;

	// const [layout, setLayout] = useState([]);
	// const onLayoutChange = (layout) => {
	// 	setLayout(layout);
	// };

	const [showNewCard, setShowNewCard] = useState(false)

	return (
		<div className={styles.homePage}>

			{isAuthenticated && <Navbar targetPage={targetPage} setShowNewCard={() => setShowNewCard(true) }/>}
			{/* {isAuthenticated && <Grid page={targetPage} onLayoutChange={onLayoutChange} />} */}
			{isAuthenticated && <Grid targetPage={targetPage} showNewCard={showNewCard} setShowNewCard={setShowNewCard}/>}
		</div>
	);
};
