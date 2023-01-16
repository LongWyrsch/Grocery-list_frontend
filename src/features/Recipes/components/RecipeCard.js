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
import { IoMdClose } from 'react-icons/io';

export const RecipeCard = ({ recipe, setRecipe, updateTitle, updateCard, addIngredient, deleteWarning, deleteIngredient }) => {

	// // Ingredients should be properly indexed, but for good measure, they are reindexed.
	// recipe.forEach((ingredient, i) => ingredient.index = i);

	const updatefield = (index, col, newValue) => {
		setRecipe((prev) => {
			let updatedRecipe = [...prev];
			updatedRecipe[index] = { ...updatedRecipe[index], [col]: newValue };
			return updatedRecipe;
		});
	};

	// if (recipe.length === 0) {
	// 	// CREATE 1 ROW {} WITH ALL COLUMN SET TO EMPTY VALUES.
	// 	// HOW TO DEAL WITH GRID_POSITION...?
	// 	recipe.push({
	// 		user_uuid: null,
	// 		card_uuid: null,
	// 		title: null,
	// 		index: null,
	// 		ingredient: null,
	// 		quantity: null,
	// 		unit: null,
	// 		section: null,
	// 		kcal: null,
	// 		last_modified: null,
	// 		grid_position: null,
	// 	});
	// }

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
								fieldStyle="card"
								value={row.ingredient}
								placeholder=' ' // This shows if input is empty. Shouldn't be empty. CSS picks it up and warns user to fill.
								fieldType="text"
								handleOnChange={(e) => updatefield(index, 'ingredient', e.target.value)}
								height="2rem"
							/>
						</div>
						<div className={styles.quantity}>
							<Textfield
								fieldStyle="card"
								value={row.quantity}
								fieldType="text"
								handleOnChange={(e) => updatefield(index, 'quantity', e.target.value)}
								height="2rem"
								textAlign="right"
							/>
						</div>
						<div className={styles.unit}>
							<Textfield
								fieldStyle="card"
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
								fieldStyle="card"
								value={Math.trunc(row.kcal)}
								fieldType="number"
								handleOnChange={(e) => updatefield(index, 'kcal', e.target.value)}
								height="2rem"
								textAlign="right"
							/>
						</div>
						<div className={styles.deleteRowContainer} onClick={() => deleteIngredient(row.uuid)}>
							<IoMdClose className={styles.deleteRow}/>
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
				<Textfield 
					fieldStyle='card'
					fieldType = 'text'
					value = {recipe[0].title}
					handleOnChange={updateTitle}
					width = '100%'
					height = '3.5rem'
					fontSize='1.5rem'
				/>	
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
				<div className={styles.deleteRowContainer}></div>
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
			<div className={`${styles.smallButton} ${styles.deleteCard}`}>
				<Button buttonStyle="text" text="Delete" onClick={deleteWarning} />
			</div>
		</div>
	);
};
