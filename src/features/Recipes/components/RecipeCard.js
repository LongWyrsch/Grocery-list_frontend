import React, { useState } from 'react';
import styles from './RecipeCard.module.css';

import { useSelector, useDispatch } from 'react-redux';
import { selectRecipes } from '../state/recipesSlice';

import { Textfield } from '../../../components/Textfield/Textfield';
import { Chip } from '../../../components/Chip/Chip';
import { Button } from '../../../components/Button/Button';

export const RecipeCard = ({ card_uuid, closeCard, deleteCard }) => {
	const dispatch = useDispatch();
	const recipes = useSelector(selectRecipes);
	const [recipe, setRecipe] = useState(recipes.filter((recipe) => recipe[0].card_uuid === card_uuid)[0]);

	const cols = ['ingredient', 'quantity', 'unit', 'section', 'kCal'];

	const updatefield = (index, col, newValue) => {
		setRecipe((prev) => {
			let updatedRecipe = [...prev];
			updatedRecipe[index] = { ...updatedRecipe[index], [col]: newValue };
			return updatedRecipe;
		});
	};

	const ingredientStyle = {
		justifySelf: 'start',
	};

	// 1D array of all field to iterate over. Ex: [<div>salt</div>, <div>1</div>, <div>tsp</div>, ...]
	let fieldArray = recipe.reduce((acc, curr, index) => {
		return acc.concat([
			<div key={index * recipe.length + 1} className={styles.gridItemContainer}>
				<Textfield
					fieldStyle="filled"
					cssStyle="card"
					value={curr.ingredient}
					fieldType="text"
					handleOnChange={(e) => updatefield(index, 'ingredient', e.target.value)}
					height="2rem"
          width='100%'
				/>
			</div>,
			<div key={index * recipe.length + 2} className={styles.gridItemContainer}>
				<Textfield
					fieldStyle="filled"
					cssStyle="card"
					value={curr.quantity}
					fieldType="text"
					handleOnChange={(e) => updatefield(index, 'quantity', e.target.value)}
					height="2rem"
          textAlign='right'
				/>
			</div>,
			<div key={index * recipe.length + 3} className={styles.gridItemContainer}>
				<Textfield
					fieldStyle="filled"
					cssStyle="card"
					value={curr.unit}
					fieldType="text"
					handleOnChange={(e) => updatefield(index, 'unit', e.target.value)}
					height="2rem"
				/>
			</div>,
			<div key={index * recipe.length + 4} className={styles.gridItemContainer}>
				<Chip
					fieldStyle="filled"
					value={curr.section}
					handleChange={(e) => updatefield(index, 'section', e.target.value)}
				/>
			</div>,
			<div key={index * recipe.length + 5} className={styles.gridItemContainer}>
				<Textfield
					fieldStyle="filled"
					cssStyle="card"
					value={Math.trunc(curr.kcal)}
					fieldType="number"
					handleOnChange={(e) => updatefield(index, 'kcal', e.target.value)}
					height="2rem"
          textAlign='right'
				/>
			</div>,
		]);
	}, []);

	return (
		<div className={`card-elevated  ${styles.cardWrapper}`}>
      <div className={styles.header}>
        <h2 className='generalText'>{recipe[0].title}</h2>
        <Button buttonStyle="text" text="Close" onClick={closeCard} />
      </div>
			<div className={styles.grid}>{fieldArray.map((field, i) => field)}</div>
			<div className={styles.deleteButton}>
				<Button buttonStyle="text" text="Delete" onClick={deleteCard} />
			</div>
		</div>
	);
};
