import React, {useEffect, useRef} from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import styles from './Navbar.module.css';

import { Button } from '../Button/Button';
import { ThemeSwitch } from '../../features/theme/components/ThemeSwitch';
import { CornerAvatar } from '../../features/avatar/components/CornerAvatar';

export const Navbar = () => {
	const navigate = useNavigate();
	let {targetPage} = useParams()
	let recipeButtonRef = useRef()
	let listButtonRef = useRef()

	useEffect(() => { 
		if (targetPage==='recipes') {
			recipeButtonRef.current.dataset.show = true
			listButtonRef.current.dataset.show = false
		} else {
			recipeButtonRef.current.dataset.show = false
			listButtonRef.current.dataset.show = true
		}
	})

	return (
		<div className={styles.navbar}>
			<div className={styles.buttonGroup}>
				<div className={styles.imgContainer}>
					<img className={styles.logo} src={require('../../assets/GroceryList_logo.png')} alt="logo" />
				</div>
				<Button
					buttonStyle={targetPage === 'lists' ? 'filled' : 'outlined'}
					text="Grocery lists"
					onClick={() => {
						// setPage('lists');
						navigate('/home/lists');
					}}
				/>
				<Button
					buttonStyle={targetPage === 'recipes' ? 'filled' : 'outlined'}
					text="Recipes"
					onClick={() => {
						// setPage('recipes');
						navigate('/home/recipes');
					}}
				/>
			</div>
			<div className={styles.buttonGroup}>
				<div id='recipeButton' data-show ref={recipeButtonRef}>
					<Button
						buttonStyle="elevated"
						text='New recipe'
						iconInfo={{
							iconName: 'BsPlusLg',
							size: '1rem',
						}}
						width="100%"
					/>
				</div>
				<div id='listButton' data-show ref={listButtonRef}>
					<Button
						buttonStyle="elevated"
						text='New list'
						iconInfo={{
							iconName: 'BsPlusLg',
							size: '1rem',
						}}
						width="100%"
					/>
				</div>
			</div>
			<div className={styles.buttonGroup} style={{ justifyContent: 'right' }}>
				<ThemeSwitch />
				<CornerAvatar />
			</div>
		</div>
	);
};
