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

	const createElement = (recipe) => {
		const removeStyle = {
			position: 'absolute',
			right: '2px',
			top: 0,
			cursor: 'pointer',
		};
		let card_uuid = recipe[0].card_uuid
		let grid_position = recipe[0].grid_position
		return (
			<div key={card_uuid} data-grid={grid_position} className={styles.testItemContainer}>
				<span className="text">{recipe[0].title}</span>
				<span className="remove" style={removeStyle} onClick={() => onRemoveItem(card_uuid)}>
					x
				</span>
			</div>
		);
	};

	const onAddItem = (newRecipe) => {
		// /*eslint no-console: 0*/

		// newRecipe.forEach((ingredient) => {
		// 	let grid_position = {
		// 		i: ingredient.card_uuid,
		// 		x: (recipes.length*2) % (newItemCol || 12),
		// 		y: Infinity,  // puts it at the bottom
		// 		w: 2,
		// 		h: 6,
		// 		minW: 2,
		// 		maxW: 2,
		// 		minH: 1,
		// 		maxH: 40,
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
		<div>
			<button onClick={onAddItem}>Add Item</button>
			<ResponsiveReactGridLayout onBreakpointChange={onBreakpointChange} {...nextProps}>
				{recipes.map((recipe) => createElement(recipe))}
			</ResponsiveReactGridLayout>
		</div>
	);
};
