import React, { useEffect, useRef, useState } from 'react';
import { WidthProvider, Responsive } from 'react-grid-layout';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';

import '/node_modules/react-grid-layout/css/styles.css';
import '/node_modules/react-resizable/css/styles.css';
import styles from './Grid.module.css';

import { useSelector, useDispatch } from 'react-redux';
// import listsSlice, { selectLists, getLists, updateList } from '../../features/lists/state/listsSlice';
import recipesSlice, {
	selectRecipes,
	updateRecipe,
	deleteRecipeFromState,
	addRecipeToState,
} from '../../features/recipes/state/recipesSlice';
import { MiniCardRecipe } from '../MiniCardRecipe/MiniCardRecipe';
import { MiniCardList } from '../MiniCardList/MiniCardList';
import { RecipeCard } from '../../features/recipes/components/RecipeCard';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export const Grid = (props) => {
	const dispatch = useDispatch();
	const recipes = useSelector(selectRecipes); //Hook 3

	const [nextProps, setNextProps] = useState({
		targetPage: '',
		className: 'layout',
		cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
		rowHeight: 100,
		isResizable: false,
		...props,
	});

	const [breakpoint, setBreakpoint] = useState({}); //Hook 8
	const [newItemCol, setNewItemCol] = useState(); // Hook 7
	const [openCardId, setOpenCardId] = useState(null);
	const [focusCardUuid, setfocusCardUuid] = useState(null);

	let blurRef = useRef();
	const movedRef = useRef(true);

	// useEffect(() => {
	// 	setNextProps((prev) => ({
	// 		...prev,
	// 		...props,
	// 	}));
	// }, []);

	const blurElement = blurRef.current;
	let downListener = () => (movedRef.current = false);
	let moveListener = () => (movedRef.current = true);
	let upListener = (card_uuid) => {
		if (movedRef.current === false) {
			setfocusCardUuid(card_uuid);
			blurElement.dataset.show = true;
		}
	};

	const createElement = (card) => {
		return (
			<div key={card[0].card_uuid} data-grid={card[0].grid_position}>
				<div
					onMouseDown={downListener}
					onMouseMove={moveListener}
					onMouseUp={() => upListener(card[0].card_uuid)}
					className={styles.cardContainer}
				>
					<MiniCardRecipe
						card={card}
						targetPage={props.targetPage}
						// handleOnClick={() => {handleOnClick(card[0].card_uuid)}}
						handleOnRemove={() => onRemoveItem(card[0].card_uuid)}
					/>
				</div>
			</div>
		);
	};

	const onAddItem = (newRecipe) => {
		// /*eslint no-console: 0*/
		let cardHeight = 0;
		if (newRecipe.length <= 3) {
			cardHeight = 2;
		} else if (newRecipe.length <= 7) {
			cardHeight = 3;
		} else if (newRecipe.length <= 11) {
			cardHeight = 4;
		} else {
			cardHeight = 5;
		}
		// newRecipe.forEach((ingredient) => {
		// 	let grid_position = {
		// 		i: ingredient.card_uuid,
		// 		x: (recipes.length*2) % (newItemCol || 12),
		// 		y: Infinity,  // puts it at the bottom
		// 		w: 2,
		// 		h: cardHeight,
		// 		minW: 2,
		// 		maxW: 2,
		// 		minH: 2,
		// 		maxH: 5,
		// 		isBounded: true,
		// 	};
		// 	ingredient.grid_position = JSON.stringify(grid_position);
		// 	ingredient.card_uuid = uuidv4();

		// });

		// dispatch(addRecipeToState(newRecipe));
	};

	// We're using the cols coming back from this to calculate where to add new items.
	const onBreakpointChange = (breakpoint, newCol) => {
		setBreakpoint(breakpoint);
		setNewItemCol(newCol);
	};

	// onLayoutChange(layout) {
	// 	this.props.onLayoutChange(layout);
	// 	this.setState({ layout: layout });
	// 	this.setState({ layout: layout });
	// }

	const onRemoveItem = (card_uuid) => {
		console.log('removing card with uuid:', card_uuid);
		dispatch(deleteRecipeFromState(card_uuid));
		// dispatch(deleteRecipeFromDatabase(card_uuid))
		// The card will be removed from the layout. Then dispatch the action to the server.
		// If there is an error, the card will reappear on next refresh. All cards will be at their original position.
	};

	const closeCard = () => {
		blurElement.dataset.show = false;
		setfocusCardUuid(false);
	};

	const deleteCard = (card_uuid) => { 
		
	 }

	return (
		<div className={styles.gridWrapper}>
			<ResponsiveReactGridLayout onBreakpointChange={onBreakpointChange} {...nextProps}>
				{recipes.map((recipe) => createElement(recipe))}
			</ResponsiveReactGridLayout>
			<div className={styles.blur} data-show={false} ref={blurRef} onClick={closeCard} />
			{focusCardUuid && <RecipeCard card_uuid={focusCardUuid} closeCard={closeCard} deleteCard={deleteCard(focusCardUuid)}/>}
		</div>
	);
};
