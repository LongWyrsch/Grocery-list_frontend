import React, { useEffect, useState } from 'react';
import styles from './RecipeCard.module.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { useSelector, useDispatch } from 'react-redux';
import { selectRecipes } from '../state/recipesSlice';

import { Textfield } from '../../../components/Textfield/Textfield';
import { Chip } from '../../../components/Chip/Chip';
import { Button } from '../../../components/Button/Button';

import { IconContext } from 'react-icons';
import { RxDragHandleDots2 } from 'react-icons/rx';

export const RecipeCard = ({ recipe, setRecipe, updateCard, addIngredient, deleteWarning }) => {
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

	if (recipe.length === 0) {
		// CREATE 1 ROW {} WITH ALL COLUMN SET TO EMPTY VALUES.
		// HOW TO DEAL WITH GRID_POSITION...?
		recipe.push({
			user_uuid: null,
			card_uuid: null,
			title: null,
			index: null,
			ingredient: null,
			quantity: null,
			unit: null,
			section: null,
			kcal: null,
			last_modified: null,
			grid_position: null,
		});
	}
	// 1D array of all field to iterate over. Ex: [<div>salt</div>, <div>1</div>, <div>tsp</div>, ...]
	// let fieldArray = recipe.reduce((acc, curr, index) => {
	// 	return acc.concat([
	// 		<div key={index * recipe.length + 1} className={styles.gridItemContainer}>
	// 			<Textfield
	// 				fieldStyle="small"
	// 				value={curr.ingredient}
	// 				fieldType="text"
	// 				handleOnChange={(e) => updatefield(index, 'ingredient', e.target.value)}
	// 				height="2rem"
	// 				width="100%"
	// 			/>
	// 		</div>,
	// 		<div key={index * recipe.length + 2} className={styles.gridItemContainer}>
	// 			<Textfield
	// 				fieldStyle="small"
	// 				value={curr.quantity}
	// 				fieldType="text"
	// 				handleOnChange={(e) => updatefield(index, 'quantity', e.target.value)}
	// 				height="2rem"
	// 				textAlign="right"
	// 			/>
	// 		</div>,
	// 		<div key={index * recipe.length + 3} className={styles.gridItemContainer}>
	// 			<Textfield
	// 				fieldStyle="small"
	// 				value={curr.unit}
	// 				fieldType="text"
	// 				handleOnChange={(e) => updatefield(index, 'unit', e.target.value)}
	// 				height="2rem"
	// 			/>
	// 		</div>,
	// 		<div key={index * recipe.length + 4} className={styles.gridItemContainer}>
	// 			<Chip
	// 				fieldStyle="filled"
	// 				value={curr.section}
	// 				handleChange={(e) => updatefield(index, 'section', e.target.value)}
	// 			/>
	// 		</div>,
	// 		<div key={index * recipe.length + 5} className={styles.gridItemContainer}>
	// 			<Textfield
	// 				fieldStyle="small"
	// 				value={Math.trunc(curr.kcal)}
	// 				fieldType="number"
	// 				handleOnChange={(e) => updatefield(index, 'kcal', e.target.value)}
	// 				height="2rem"
	// 				textAlign="right"
	// 			/>
	// 		</div>,
	// 	]);
	// }, []);

	const makeRows = (row, index) => (
		<Draggable key={row.uuid} draggableId={row.uuid} index={index}>
			{(provided) => {
				return (
					<div
						className={styles.row}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						ref={provided.innerRef}
					>
						<IconContext.Provider value={{ className: styles.handleIcon }}>
							<RxDragHandleDots2 />
						</IconContext.Provider>
						<div className={styles.ingredient}>
							<Textfield
								fieldStyle="small"
								value={row.ingredient}
								fieldType="text"
								handleOnChange={(e) => updatefield(index, 'ingredient', e.target.value)}
								height="2rem"
							/>
						</div>
						<div className={styles.quantity}>
							<Textfield
								fieldStyle="small"
								value={row.quantity}
								fieldType="text"
								handleOnChange={(e) => updatefield(index, 'quantity', e.target.value)}
								height="2rem"
								textAlign="right"
							/>
						</div>
						<div className={styles.unit}>
							<Textfield
								fieldStyle="small"
								value={row.unit}
								fieldType="text"
								handleOnChange={(e) => updatefield(index, 'unit', e.target.value)}
								height="2rem"
							/>
						</div>
						<div className={styles.section}>
							<Chip
								fieldStyle="filled"
								value={row.section}
								handleChange={(e) => updatefield(index, 'section', e.target.value)}
							/>
						</div>
						<div className={styles.kcal}>
							<Textfield
								fieldStyle="small"
								value={Math.trunc(row.kcal)}
								fieldType="number"
								handleOnChange={(e) => updatefield(index, 'kcal', e.target.value)}
								height="2rem"
								textAlign="right"
							/>
						</div>
					</div>
				);
			}}
		</Draggable>
	);

	const stopPropagation = (e) => {
		// Clicking on .blur element triggers updateCard() in <Grid/> component.
		// Since <RecipeCard/> is a child of the .blur element, any click on <RecipeCard> will bubble up to .blur and  trigger updateCard().
		// Need to stop this propagation.
		e.stopPropagation();
	};

	const handleOnDragEnd = (result) => {
		
		// If droping out of the droppable area, then ignore.
		if (!result.destination) return 
		let items = Array.from(recipe);
		const [movedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, movedItem);
		// Loop over each row and reassign them an index in ascending order
		items = items.map((item, i) => ({...item, index: i}))
		setRecipe(items)
	};

	return (
		<div className={`card-elevated  ${styles.cardWrapper}`} onClick={stopPropagation}>
			<div className={styles.header}>
				<h1 className="generalText">{recipe[0].title}</h1>
				<Button buttonStyle="text" text="Close" onClick={updateCard} />
			</div>
			{/* <div className={styles.grid}>
				{fieldArray.map((field, i) => field)}
			</div> */}
			<div className={styles.colHeaders}>
				<h4 className={`generalText ${styles.ingredient}`}>Ingredients</h4>
				<h4 className={`generalText ${styles.quantity}`}>Quantity</h4>
				<h4 className={`generalText ${styles.unit}`}>Unit</h4>
				<h4 className={`generalText ${styles.section}`}>Section</h4>
				<h4 className={`generalText ${styles.kcal}`}>kCal</h4>
			</div>
			<DragDropContext onDragEnd={handleOnDragEnd}>
				<Droppable droppableId="ingredientRows">
					{(provided) => (
						<div className={styles.table} {...provided.droppableProps} ref={provided.innerRef}>
							{recipe.map((row, i) => makeRows(row, i))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>
			<div className={`${styles.smallButton} ${styles.addIngredient}`}>
				<Button
					buttonStyle="elevated"
					text="Add ingredient"
					iconInfo={{ iconName: 'BsPlusLg', size: '' }}
					onClick={addIngredient}
				/>
			</div>
			<div className={`${styles.smallButton} ${styles.deleteButton}`}>
				<Button buttonStyle="text" text="Delete" onClick={deleteWarning} />
			</div>
		</div>
	);
};
