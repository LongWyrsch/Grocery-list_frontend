import React, { useEffect, useState } from 'react';
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
	getRecipes,
	updateRecipe,
	deleteRecipeFromState,
	addRecipeToState,
} from '../../features/recipes/state/recipesSlice';
import { MiniCardRecipe } from '../MiniCardRecipe/MiniCardRecipe';
import { MiniCardList } from '../MiniCardList/MiniCardList';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export const Grid = (props) => {
	let {
		targetPage,
		className = 'layout',
		cols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
		rowHeight = 100,
		...others
	} = props;

	let nextProps = {
		className: className,
		cols: cols,
		rowHeight: rowHeight,
		isResizable: false,
		...others,
	};

	const dispatch = useDispatch();

	// const [items, setItems] = useState(
	// 	[0, 1, 2, 3, 4].map(function (i, key, list) {
	// 		return {
	// 			i: i.toString(),
	// 			x: i * 2,
	// 			y: 0,
	// 			w: 2,
	// 			h: 2,
	// 			add: i === list.length - 1,
	// 		};
	// 	})
	// );

	const [breakpoint, setBreakpoint] = useState({});
	const [newItemCol, setNewItemCol] = useState();

	const createElement = (card) => {
		return (
			<div key={card[0].card_uuid} data-grid={card[0].grid_position} className={styles.cardContainer}>
				<MiniCardRecipe card={card} targetPage={targetPage} handleOnClick={() => onRemoveItem(card[0].card_uuid)}/>
			</div>
		);
	};

	const onAddItem = (newRecipe) => {
		// /*eslint no-console: 0*/
			let cardHeight = 0
			if (newRecipe.length <= 3) {
				cardHeight = 2
			} else if (newRecipe.length <= 7) {
				cardHeight = 3
			} else if (newRecipe.length <= 11) {
				cardHeight = 4
			} else {
				cardHeight = 5
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

	const recipes = useSelector(selectRecipes);

	return (
		<div className={styles.gridWrapper}>
			<button onClick={onAddItem}>Add Item</button>
			<ResponsiveReactGridLayout onBreakpointChange={onBreakpointChange} {...nextProps}>
				{recipes.map((recipe) => createElement(recipe))}
			</ResponsiveReactGridLayout>
		</div>
	);
};
