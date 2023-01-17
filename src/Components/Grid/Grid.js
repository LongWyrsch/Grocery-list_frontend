import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { Link, useParams, Navigate, useNavigate } from 'react-router-dom';

// Other libs
import { v4 as uuidv4 } from 'uuid';

// react-grid-layout
import { WidthProvider, Responsive } from 'react-grid-layout';
import _ from 'lodash';
import '/node_modules/react-grid-layout/css/styles.css';
import '/node_modules/react-resizable/css/styles.css';
import styles from './Grid.module.css';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, getUser, updateUser } from '../../features/user/state/userSlice';
import { selectLists, getLists, updateList, deleteList, createList } from '../../features/lists/state/listsSlice';
import {
	selectRecipes,
	getRecipes,
	updateRecipe,
	deleteRecipe,
	createRecipe,
} from '../../features/recipes/state/recipesSlice';

// Components
import { MiniCardRecipe } from '../MiniCard/MiniCardRecipe';
import { MiniCardList } from '../MiniCard/MiniCardList';
import { CardRecipe } from '../Card/CardRecipe';
import { CardList } from '../Card/CardList';
import { ActionWarning } from '../ActionWarning/ActionWarning';

// Utils
import { serverRequests } from '../../utils/serverRequests';
import { queueTask } from '../../utils/queueTask';
import { adjustCardHeight } from '../../utils/adjustCardHeight';
import { generateLayouts } from '../../utils/generateLayouts';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export const Grid = (props) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	let { targetPage } = useParams();
	const user = useSelector(selectUser);
	const recipes = useSelector(selectRecipes); //Hook 3
	const lists = useSelector(selectLists);

	const [focusCard, setFocusCard] = useState(null); // card object [{},{},...] // Hook 16
	let deletedRowsRef = useRef([]);
	const [showWarning, setShowWarning] = useState(false);

	let layoutsQueueRef = useRef([]); // Queue array to limit layouts update server requests

	// let breakpointRef = useRef('') // No used for now...
	// let newItemColRef = useRef('') // No used for now...

	let cardsRef = useRef([]);
	let layoutsRef = useRef({});

	// On reach render, update cards and layouts because:
	//     - User might have toggled between lists or recipes
	//     - Slice value of user, recipes or lists might have changed
	// Also, check recipes and lists since they might be empty in the first renders while data is being fetched.
	// "cards" is used to abstract from recipes or lists.
	console.log('rendering')
	if (targetPage && recipes.length > 0 && lists.length > 0 && user) {
		cardsRef.current = targetPage === 'recipes' ? recipes : lists;
		const targetLayouts = targetPage === 'recipes' ? user.layouts_recipes : user.layouts_lists
		console.log(targetLayouts)
		if (Object.keys(targetLayouts).length === 0) {
			// If empty object, generate layouts
			layoutsRef.current = generateLayouts(cardsRef.current);
		} else {
			layoutsRef.current = targetLayouts
		}
	}

	// We're using the cols coming back from this to calculate where to add new items.
	const onBreakpointChange = (breakpoint, newCol) => {
		// breakpointRef.current = breakpoint  // No used for now...
		// newItemColRef.current = newCol   // No use for now...
	};

	const focusOnCard = (card) => {
		console.log('focusOnCard called')
		setFocusCard(card);
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	const closeCard = () => {
		console.log('closeCard called')
		setFocusCard(null);
		setShowWarning(false);
	};

	const createCard = () => {
		console.log('createCard called')
		let newCard = [
			{
				uuid: uuidv4(),
				user_uuid: user.uuid,
				card_uuid: uuidv4(),
				title: `Recipe ${new Date().toLocaleDateString()}`,
				index: 0,
				ingredient: '',
				quantity: null,
				unit: null,
				section: 'other',
				last_modified: new Date().toJSON(),
			},
		];

		newCard[0] =
			targetPage === 'recipes' ? { ...newCard[0], kcal: null } : { ...newCard[0], checked: false, recipes: [] };

		const grid_position = {
			i: newCard[0].card_uuid,
			x: 0, // x: (recipes.length*2) % (newItemCol || 12),
			y: 0, // y: Infinity,  // puts it at the bottom
			w: 2,
			h: 2,
			minW: 2,
			maxW: 2,
			minH: 2,
			maxH: 5,
			isBounded: true,
		};

		// Update layouts with new card's grid position
		let updatedLayouts = {};
		for (const [key, value] of Object.entries(layoutsRef.current)) {
			updatedLayouts[key] = value.map((grid_position) => ({ ...grid_position, y: grid_position.y + 1 })); // Shift all cards down by 1 to make room for the newly added card
			updatedLayouts[key] = [...updatedLayouts[key], grid_position]; // Append grid position of newly added card to ALL breakpoints. Otherwise, 1x1 sized box will be assigned to other breakpoints
		}
		layoutsRef.current = updatedLayouts;

		const updatedUser = { ...user, [`layouts_${targetPage}`]: JSON.stringify(layoutsRef.current) };
		dispatch(updateUser(updatedUser));

		targetPage === 'recipes' ? dispatch(createRecipe(newCard)) : dispatch(createList(newCard));

		setFocusCard(newCard); // Open newly create card for editing
	};

	const updateTitle = (e) => {
		const updatedTitle = e.target.value;
		setFocusCard((prev) => prev.map((ingredient) => ({ ...ingredient, title: updatedTitle }))); // All rows store their card's title
	};

	const updateCard = async () => {
		console.log('updateCard called');

		// If there was no change, do nothing. Stringify array to compare them.
		let cardFromSlice = cardsRef.current.filter((card) => card[0].card_uuid === focusCard[0].card_uuid)[0];
		if (JSON.stringify(focusCard) === JSON.stringify(cardFromSlice)) {
			closeCard();
			return;
		}

		// If number of ingredients changed, update card height
		if (focusCard.length !== cardFromSlice.length) {
			// Updating card height in layouts stored in user object
			const adjustedHeight = adjustCardHeight(focusCard.length);
			let updatedLayouts = { ...layoutsRef.current };
			for (const [key, value] of Object.entries(updatedLayouts)) {
				var cardIndex = value.findIndex((layout) => layout.i === focusCard[0].card_uuid);
				// Check that findIndex returned something.
				if (cardIndex !== -1) updatedLayouts[key][cardIndex].h = adjustedHeight;
			}
			
			const updatedUser = { ...user, [`layouts_${targetPage}`]: updatedLayouts };
			dispatch(updateUser(updatedUser));
			serverRequests(
				'/users',
				'PUT',
				updatedUser,
				() => navigate('/signin'),
				() => dispatch(getUser())
			);
		}

		// Update last_modified column
		let updatedCard = focusCard.map((ingredient) => ({ ...ingredient, last_modified: new Date().toJSON() }));

		targetPage === 'recipes' ? dispatch(updateRecipe(updatedCard)) : dispatch(updateList(updatedCard));

		const failureAction = () => setFocusCard(updatedCard);
		serverRequests(`/${targetPage}`, 'PUT', updatedCard, () => navigate('/signin'), failureAction);

		// If some rows were delete, update database
		if (deletedRowsRef.current.length > 0) {
			serverRequests(
				`/${targetPage}`,
				'DELETE',
				{ row_uuid: deletedRowsRef.current, card_uuid: null },
				() => navigate('/signin'),
				failureAction
			);
			deletedRowsRef.current.length = 0; // clear array
		}

		closeCard();
	};

	const deleteCard = async (card_uuid) => {
		console.log('deleteCard called');

		targetPage === 'recipes' ? dispatch(deleteRecipe(card_uuid)) : dispatch(deleteList(card_uuid));

		const failureAction = targetPage==='recipes'? dispatch(getRecipes()) : dispatch(getLists())

		serverRequests(
				`/${targetPage}`,
				'DELETE',
				{ row_uuid: null, card_uuid: card_uuid },
				() => navigate('/signin'),
				() => failureAction
		)


		closeCard();
	};

	const addIngredient = () => {
		console.log('addIngredient called');

		// Columns common to recipes and lists
		let newIngredient = {
			uuid: uuidv4(),
			user_uuid: focusCard[0].user_uuid,
			card_uuid: focusCard[0].card_uuid,
			title: focusCard[0].title,
			index: focusCard.length,
			ingredient: '',
			quantity: null,
			unit: null,
			section: 'other',
			last_modified: focusCard[0].last_modified,
		};

		newIngredient =
			targetPage === 'recipes'
				? { ...newIngredient, kcal: null }
				: { ...newIngredient, checked: false, recipes: focusCard[0].recipes };

		const updatedRecipe = [...focusCard, newIngredient];

		setFocusCard(updatedRecipe);
	};

	const deleteIngredient = (row_uuid) => {
		console.log('deleteIngredient called')
		setFocusCard((prev) => prev.filter((ingredient) => ingredient.uuid !== row_uuid));
		deletedRowsRef.current.push(row_uuid);
	};

	const onLayoutChange = (layout, newLayouts) => {
		
		// If no change in layouts, do nothing
		if (JSON.stringify(layoutsRef.current) === JSON.stringify(newLayouts)) { return }
		// if (_.isEqual(layoutsRef.current, updatedLayouts)) return;
		
		const updatedLayouts = { ...layoutsRef.current, ...newLayouts };

		const updatedUser = { ...user, [`layouts_${targetPage}`]: updatedLayouts }

		dispatch(updateUser(updatedUser));

		const task = () =>
			serverRequests(
				'/users',
				'PUT',
				updatedUser,
				() => navigate('/signin'),
				() => dispatch(getUser())
			);
		queueTask(layoutsQueueRef.current, task, 3000);
	};

	useEffect(() => {
		let addButton = document.querySelector('#buttonParent>button') // "New recipe" "New list" button
		addButton.addEventListener('click', createCard); 
		return () => {
			addButton.removeEventListener("click", createCard);
		};
	}, []);

	// Moving the below JSX with it's properties into <MiniCardRecipe/> create a warning saying ref shouldn't be passed to components.
	const createMiniCard = (card) => (
		<div key={card[0].card_uuid}>
			{targetPage === 'recipes' ? (
				<MiniCardRecipe card={card} focusOnCard={focusOnCard} />
			) : (
				<MiniCardList card={card} focusOnCard={focusOnCard} />
			)}
		</div>
	);

	return (
		<div className={styles.gridWrapper} id="gridWrapper">
			{showWarning && (
				<ActionWarning
					action="Delete"
					message={
						<div>
							Delete <b>{focusCard[0].title}</b> ?
						</div>
					}
					handleOnClick={() => deleteCard(focusCard[0].card_uuid)}
					handleCancel={() => setShowWarning(false)}
					iconName="MdDeleteOutline"
				/>
			)}
			{cardsRef.current.length > 0 && (
				<ResponsiveReactGridLayout
					onBreakpointChange={onBreakpointChange}
					onLayoutChange={(layout, newLayouts) => onLayoutChange(layout, newLayouts)}
					layouts={layoutsRef.current}
					rowHeight={100}
					isResizable={false}
					isBounded={true}
					// className= 'layout'
					// cols= {{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
					// breakpoints= {{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
				>
					{cardsRef.current.map((card) => createMiniCard(card))}
				</ResponsiveReactGridLayout>
			)}
			<div className={styles.blur} data-show={focusCard ? true : false} onClick={updateCard}>
				{focusCard && targetPage === 'recipes' && (
					<CardRecipe
						recipe={focusCard}
						setRecipe={setFocusCard}
						updateTitle={updateTitle}
						updateCard={updateCard}
						addIngredient={addIngredient}
						deleteWarning={() => setShowWarning(true)}
						deleteIngredient={deleteIngredient}
					/>
				)}
				{focusCard && targetPage === 'lists' && (
					<CardList
						list={focusCard}
						setList={setFocusCard}
						updateTitle={updateTitle}
						updateCard={updateCard}
						addIngredient={addIngredient}
						deleteWarning={() => setShowWarning(true)}
						deleteIngredient={deleteIngredient}
					/>
				)}
			</div>
		</div>
	);
};
