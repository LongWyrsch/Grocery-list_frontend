// React
import React from 'react';

// CSS
import styles from './Card.module.css';

// components
import { Textfield } from '../Textfield/Textfield';
import { Chip } from '../Chip/Chip';
import { Button } from '../Button/Button';
import { Checkbox } from '../Checkbox/Checkbox';

// libs
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { t } from 'i18next';
import { IconContext } from 'react-icons';
import { RxDragHandleDots2 } from 'react-icons/rx';
import { IoMdClose } from 'react-icons/io';

export const CardList = ({
	focusCard,
	setFocusCard,
	updateTitle,
	updateCard,
	addIngredient,
	deleteWarning,
	deleteIngredient,
	stopPropagation
}) => {
	// When typing in a field, update focusCard variable in <Grid/>
	const updatefield = (index, col, newValue) => {
		setFocusCard((prev) => {
			let updatedList = [...prev];
			updatedList[index] = { ...updatedList[index], [col]: newValue };
			return updatedList;
		});
	};

	const checkedUpdateAndMove = (index) => { 
		let updatedList = Array.from(focusCard); // temp array

		// Toggle checked column
		updatedList[index] = { ...focusCard[index], checked: !focusCard[index].checked };

		const [movedItem] = updatedList.splice(index, 1); // item from array
		if (movedItem.checked) {
			// Move to bottom
			updatedList.push(movedItem); 
		} else {
			// Move to top
			updatedList.unshift(movedItem); 
		}
		
		// Loop over each row and reassign them an index in ascending order
		updatedList = updatedList.map((item, i) => ({ ...item, index: i }));
		setFocusCard(updatedList)	
	}

	const makeRows = (row, index) => (
		<Draggable key={row.uuid} draggableId={row.uuid} index={index} className={styles.draggable}>
			{(provided) => {
				return (
					<div
						className={styles.row}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						ref={provided.innerRef}
						id={row.checked? 'done' : 'notDone'}
					>
						<IconContext.Provider value={{ className: styles.handleIcon }}>
							<RxDragHandleDots2 />
						</IconContext.Provider>
						<Checkbox checked={row.checked} handleChange={()=>checkedUpdateAndMove(index)}/>
						<div className={styles.ingredient}>
							<Textfield
								fieldStyle="card"
								value={row.ingredient}
								placeholder=" " // This shows if input is empty. Shouldn't be empty. CSS picks it up and warns user to fill.
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
						<div data-testid='deleteListIngredient' className={styles.deleteRowContainer} onClick={() => deleteIngredient(row.uuid)}>
							<IoMdClose className={styles.deleteRow} />
						</div>
					</div>
				);
			}}
		</Draggable>
	);

	// Drag and drop: update position of dragged item
	const handleOnDragEnd = (result) => {
		if (!result.destination) return; // If droping out of the droppable area, then ignore.
		let items = Array.from(focusCard); // temp array
		const [movedItem] = items.splice(result.source.index, 1); // remove dragger item from array
		items.splice(result.destination.index, 0, movedItem); // place item in its new position (where dropped)
		// Loop over each row and reassign them an index in ascending order
		items = items.map((item, i) => ({ ...item, index: i }));
		setFocusCard(items);
	};

	return (
		<div className={`card-elevated  ${styles.cardWrapper}`} onClick={stopPropagation}>
			<div className={styles.header}>
				<Textfield
					fieldStyle="card"
					fieldType="text"
					value={focusCard[0].title}
					handleOnChange={updateTitle}
					width="100%"
					height="3.5rem"
					fontSize="1.5rem"
				/>
				<Button buttonStyle="text" text={t('general.Close')} onClick={updateCard} />
			</div>
			<div className={styles.recipeNames}>
				{focusCard[0].recipes.map( (r, i) => <div key={i}>{r}</div>)}
			</div>
			<div className={styles.colHeaders}>
				<h4 className={`generalText ${styles.checked}`}> </h4>
				<h4 className={`generalText ${styles.ingredient}`}>{t('home.Ingredients')}</h4>
				<h4 className={`generalText ${styles.quantity}`}>{t('home.Quantity')}</h4>
				<h4 className={`generalText ${styles.unit}`}>{t('home.Unit')}</h4>
				<h4 className={`generalText ${styles.section}`}>{t('home.Section')}</h4>
				<div className={styles.deleteRowContainer}></div>
			</div>
			<DragDropContext onDragEnd={handleOnDragEnd}>
				<Droppable droppableId="ingredientRows" >
					{(provided) => (
						<div className={styles.table} {...provided.droppableProps} ref={provided.innerRef}>
							{focusCard.map((row, i) => makeRows(row, i))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>
			<div className={`${styles.smallButton} ${styles.addIngredient}`}>
				<Button
					buttonStyle="outlined"
					text={t('home.AddIngredients')}
					iconInfo={{ iconName: 'BsPlusLg', size: '' }}
					onClick={addIngredient}
				/>
			</div>
			<div className={`${styles.smallButton} ${styles.deleteCard}`}>
				<Button buttonStyle="text" text={t('general.Delete')} onClick={deleteWarning} />
			</div>
		</div>
	);
};
