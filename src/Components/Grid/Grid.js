import React, { useEffect, useRef, useState } from 'react';
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
import { selectUser, getUser, updateUser } from '../../features/user/state/userSlice'
import { selectLists, getLists, updateList, deleteList, createList } from '../../features/lists/state/listsSlice';
import { selectRecipes, getRecipes, updateRecipe, deleteRecipe, createRecipe } from '../../features/recipes/state/recipesSlice';

// Components
import { MiniCardRecipe } from '../MiniCardRecipe/MiniCardRecipe';
import { MiniCardList } from '../MiniCardList/MiniCardList';
import { RecipeCard } from '../../features/recipes/components/RecipeCard';
import { ActionWarning } from '../ActionWarning/ActionWarning';
// import { RecipeCardNew } from '../../features/recipes/components/RecipeCardNew';
import { ListCardNew } from '../../features/lists/components/ListCardNew';

// Utils
// import { limiter } from '../../utils/rate-limiting-limiter-args'
import { serverRequests } from '../../utils/serverRequests';
import { queueTask } from '../../utils/queueTask';
import { adjustCardHeight } from '../../utils/adjustCardHeight';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export const Grid = (props) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	let { targetPage } = useParams();
	const user = useSelector(selectUser);
	const recipes = useSelector(selectRecipes); //Hook 3
	const lists = useSelector(selectLists);
	
	const [focusCard, setFocusCard] = useState(null); // card object [{},{},...]
	let deletedRows = useRef([])
	const [showWarning, setShowWarning] = useState(false);
	
	let layoutsQueueRef = useRef([]) // Queue array to limit layout update server requests
	
	const [newItemCol, setNewItemCol] = useState(); // Hook 7
	let cards = useRef([])
	let layouts = useRef({})
	let prevPage = useRef('')
	
	// If user toggle between lists or recipes, update cards and layouts accordingly
	// Also, check recipes and lists since they might be empty in the first renders while data is being fetched.
	if (targetPage && recipes.length > 0 && lists.length > 0 && user)  {
		cards.current = targetPage==='recipes'? recipes : lists
		prevPage.current = targetPage
		layouts.current = JSON.parse(targetPage==='recipes'? user.layouts_recipes : user.layouts_lists)
	}

	// We're using the cols coming back from this to calculate where to add new items.
	const onBreakpointChange = (breakpoint, newCol) => {
		setNewItemCol(newCol);
	};

	const createCard = (newCard) => {
		// // /*eslint no-console: 0*/
		// let cardHeight = 0;
		// if (newRecipe.length <= 3) {
		// 	cardHeight = 2;
		// } else if (newRecipe.length <= 7) {
		// 	cardHeight = 3;
		// } else if (newRecipe.length <= 11) {
		// 	cardHeight = 4;
		// } else {
		// 	cardHeight = 5;
		// }
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

	const closeCard = () => {
		setFocusCard(false);
		setShowWarning(false);
	};

	const updateCard = async () => {
		console.log('updateCard called')

		closeCard();

		// If there was no change, do nothing. Stringify array to compare them.
		let cardFromSlice = cards.current.filter((card) => card[0].card_uuid === focusCard[0].card_uuid)[0];
		if (JSON.stringify(focusCard) === JSON.stringify(cardFromSlice)) return;

		// If number of ingredients changed, update card height
		if (focusCard.length !== cardFromSlice.length) {
			// Updating card height in user.layouts_recipes or user.layouts_lists 
			const adjustedHeight = adjustCardHeight(focusCard.length)
			let updatedLayouts = {...layouts.current}
			for (const [key, value] of Object.entries(updatedLayouts)) {
				var cardIndex = value.findIndex((layout) => layout.i === focusCard[0].card_uuid) 
				updatedLayouts[key][cardIndex].h = adjustedHeight
			}
			const updatedUser = {...user, [`layouts_${targetPage}`]: JSON.stringify(updatedLayouts)}
			dispatch(updateUser(updatedUser))
		}

		targetPage==='recipes'
			?dispatch(updateRecipe(focusCard))
			:dispatch(updateList(focusCard))

		
		const failureAction = () => setFocusCard(focusCard)

		serverRequests(`/${targetPage}`, 'PUT', focusCard, () => { navigate('/signin')}, failureAction)
		
		if (deletedRows.current.length>0) {
			serverRequests(`/${targetPage}`, 'DELETE', { row_uuid: deletedRows.current, card_uuid: null }, () => { navigate('/signin')}, failureAction)
			deletedRows.current.length = 0 // clear array
		}
	};

	const deleteCard = async (card_uuid) => {
		console.log('deleteCard called')

		closeCard();
		setFocusCard(null)
		
		targetPage==='recipes'
			?dispatch(deleteRecipe(card_uuid))
			:dispatch(deleteList(card_uuid))
		targetPage==='recipes'
			?serverRequests(`/${targetPage}`, 'DELETE', { row_uuid: null, card_uuid: card_uuid }, () => {navigate('/signin')}, () => {dispatch(getRecipes())})
			:serverRequests(`/${targetPage}`, 'DELETE', { row_uuid: null, card_uuid: card_uuid }, () => {navigate('/signin')}, () => {dispatch(getLists())})

	};

	const addIngredient = () => {
		console.log('addIngredient called')

		// const newGridPosition = {
		// 	...focusCard[0].grid_position,
		// 	h: adjustCardHeight(focusCard.length + 1),
		// };
		// const newLayouts = {
		// 	...focusCard[0].grid_position,
		// 	...user[`layouts_${targetPage}`]
		// 	h: adjustCardHeight(focusCard.length + 1),
		// };



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
		}

		newIngredient = targetPage==='recipes' 
			? { ...newIngredient, kcal: null} 
			: { ...newIngredient, checked: false, recipes: focusCard[0].recipies}
		
		const updatedRecipe = [...focusCard, newIngredient]

		setFocusCard(updatedRecipe);

	};

	const deleteIngredient = (row_uuid) => { 
		setFocusCard( prev => prev.filter(ingredient => ingredient.uuid !== row_uuid) )	
		deletedRows.current.push(row_uuid)
	}

	const onLayoutChange = (layout, newlayouts) => {
		const updatedLayouts = {...layouts.current, ...newlayouts}
		
		// If no change in layouts, do nothing
		if (_.isEqual(layouts.current, updatedLayouts)) return

		layouts.current = updatedLayouts 

		const updatedUser = targetPage==='recipes'
			? {...user, layouts_recipes: JSON.stringify(updatedLayouts)}
			: {...user, layouts_lists: JSON.stringify(updatedLayouts)}

		dispatch(updateUser(updatedUser))
		
		const task = () => serverRequests('/users', 'PUT', updatedUser, () => { navigate('/signin') }, () => { dispatch(getUser()) })
		queueTask(layoutsQueueRef.current, task, 3000)
	};

	useEffect(() => { 
		document.querySelector('#buttonParent>button').addEventListener('click', createCard)
	}, [])

	// Moving the below JSX with it's properties into <MiniCardRecipe/> create a warning saying ref shouldn't be passed to components.
	const createMiniCard = (card) => (
		<div key={card[0].card_uuid} >  
			{targetPage==='recipes'
				? <MiniCardRecipe card={card} setFocusCard={setFocusCard}/> 
				: <MiniCardList card={card}	setFocusCard={setFocusCard}/> 
			}
		</div>
	)


	return (
		<div className={styles.gridWrapper} id='gridWrapper'>
			{showWarning && (
				<ActionWarning
					action="Delete"
					message={`Delete recipe ${focusCard[0].title}?`}
					handleOnClick={() => deleteCard(focusCard[0].card_uuid)}
					handleCancel={() => setShowWarning(false)}
					iconName="MdDeleteOutline"
				/>
			)}
			{cards.current.length > 0 && <ResponsiveReactGridLayout
					onBreakpointChange={onBreakpointChange}
					onLayoutChange={(layout, layouts) =>  onLayoutChange(layout, layouts)}
					layouts={layouts.current}
					rowHeight= {100}
					isResizable= {false}
					isBounded= {true}
					// className= 'layout'
					// cols= {{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
					// breakpoints= {{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
				>
					{cards.current.map((card) => createMiniCard(card))}
			</ResponsiveReactGridLayout>}
			<div className={styles.blur} data-show={focusCard? true : false} onClick={updateCard}>
				{focusCard && (
					<RecipeCard
						recipe={focusCard}
						setRecipe={setFocusCard}
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


