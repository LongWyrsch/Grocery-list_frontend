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
	let deletedRowsRef = useRef([])
	const [showWarning, setShowWarning] = useState(false);
	
	let layoutsQueueRef = useRef([]) // Queue array to limit layout update server requests
	
	let breakpointRef = useRef('')
	let newItemColRef = useRef('')

	let cardsRef = useRef([])
	let layoutsRef = useRef({})
	let prevPageRef = useRef('')
	
	// If user toggle between lists or recipes, update cards and layouts accordingly
	// Also, check recipes and lists since they might be empty in the first renders while data is being fetched.
	if (targetPage && recipes.length > 0 && lists.length > 0 && user)  {
		cardsRef.current = targetPage==='recipes'? recipes : lists
		prevPageRef.current = targetPage
		layoutsRef.current = JSON.parse(targetPage==='recipes'? user.layouts_recipes : user.layouts_lists)
	}

	// We're using the cols coming back from this to calculate where to add new items.
	const onBreakpointChange = (breakpoint, newCol) => {
		breakpointRef.current = breakpoint
		newItemColRef.current = newCol
	};

	const gridWrapperRef = useRef()
	// useLayoutEffect(() => {
	// 	currentWidth = gridWrapperRef.current.offsetWidth;
	//   }, []);

	const openCard = (card) => { 
		setFocusCard(card)
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	const createCard = () => {
		
		let newCard = [{
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
		}]

		newCard[0] = targetPage==='recipes' 
			? { ...newCard[0], kcal: null} 
			: { ...newCard[0], checked: false, recipes: []}
		

		const grid_position = {
			i: newCard[0].card_uuid,
			// x: (recipes.length*2) % (newItemCol || 12),
			// y: Infinity,  // puts it at the bottom
			x: 0,
			y: 0,
			w: 2,
			h: 2,
			minW: 2,
			maxW: 2,
			minH: 2,
			maxH: 5,
			isBounded: true
		};

		let updatedLayouts = {}
		for (const [key, value] of Object.entries(layoutsRef.current)) {
			updatedLayouts[key] = [...value.map(grid_position => ({...grid_position, y: grid_position.y+1}) ), grid_position]
		}
		layoutsRef.current = updatedLayouts

		// const currentBreakpoint = Responsive.utils.getBreakpointFromWidth({ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }, gridWrapperRef.current.offsetWidth)
		// let updatedLayouts = {...layoutsRef.current}
		// updatedLayouts[currentBreakpoint].push(grid_position)


		const updatedUser = {...user, [`layouts_${targetPage}`]: JSON.stringify(layoutsRef.current)}
		
		dispatch(updateUser(updatedUser))
		dispatch(createRecipe(newCard))
		setFocusCard(newCard)
	};

	const closeCard = () => {
		setFocusCard(null);
		setShowWarning(false);
	};

	const updateTitle = (e) => { 
		const updatedTitle = e.target.value
		setFocusCard( prev => prev.map( ingredient => ({...ingredient, title: updatedTitle}) ))
	}

	const updateCard = async () => {
		console.log('updateCard called')

		// If there was no change, do nothing. Stringify array to compare them.
		let cardFromSlice = cardsRef.current.filter((card) => card[0].card_uuid === focusCard[0].card_uuid)[0];
		if (JSON.stringify(focusCard) === JSON.stringify(cardFromSlice)) {
			closeCard()
			return
		};

		// If number of ingredients changed, update card height

		if (focusCard.length !== cardFromSlice.length) {
			// Updating card height in user.layouts_recipes or user.layouts_lists 
			const adjustedHeight = adjustCardHeight(focusCard.length)
			let updatedLayouts = {...layoutsRef.current}
			for (const [key, value] of Object.entries(updatedLayouts)) {
				var cardIndex = value.findIndex((layout) => layout.i === focusCard[0].card_uuid)
				// When updating a new card, only the layout at the current breakpoint contains the card. Therefore check cardIndex. 
				if (cardIndex !== -1) updatedLayouts[key][cardIndex].h = adjustedHeight
			}
			const updatedUser = {...user, [`layouts_${targetPage}`]: JSON.stringify(updatedLayouts)}
			dispatch(updateUser(updatedUser))
			serverRequests('/users', 'PUT', updatedUser, () => { navigate('/signin') }, () => { dispatch(getUser()) })
		}

		let updatedCard = focusCard.map( ingredient => ({...ingredient, last_modified: new Date().toJSON()}) )

		targetPage==='recipes'
			?dispatch(updateRecipe(updatedCard))
			:dispatch(updateList(updatedCard))

		
		const failureAction = () => setFocusCard(updatedCard)

		serverRequests(`/${targetPage}`, 'PUT', updatedCard, () => { navigate('/signin')}, failureAction)
		
		if (deletedRowsRef.current.length>0) {
			serverRequests(`/${targetPage}`, 'DELETE', { row_uuid: deletedRowsRef.current, card_uuid: null }, () => { navigate('/signin')}, failureAction)
			deletedRowsRef.current.length = 0 // clear array
		}

		closeCard();
	};

	const deleteCard = async (card_uuid) => {
		console.log('deleteCard called')

		targetPage==='recipes'
			?dispatch(deleteRecipe(card_uuid))
			:dispatch(deleteList(card_uuid))

		targetPage==='recipes'
			?serverRequests(`/${targetPage}`, 'DELETE', { row_uuid: null, card_uuid: card_uuid }, () => {navigate('/signin')}, () => {dispatch(getRecipes())})
			:serverRequests(`/${targetPage}`, 'DELETE', { row_uuid: null, card_uuid: card_uuid }, () => {navigate('/signin')}, () => {dispatch(getLists())})
		
		closeCard();
	};

	const addIngredient = () => {
		console.log('addIngredient called')

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
		deletedRowsRef.current.push(row_uuid)
	}

	const onLayoutChange = (layout, newlayouts) => {
		const updatedLayouts = {...layoutsRef.current, ...newlayouts}
		
		// If no change in layouts, do nothing
		if (_.isEqual(layoutsRef.current, updatedLayouts)) return

		layoutsRef.current = updatedLayouts 

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
				? <MiniCardRecipe card={card} openCard={openCard}/> 
				: <MiniCardList card={card}	openCard={openCard}/> 
			}
		</div>
	)

	return (
		<div className={styles.gridWrapper} id='gridWrapper' ref={gridWrapperRef}>
			{showWarning && (
				<ActionWarning
					action="Delete"
					message={<div>Delete  <b>{focusCard[0].title}</b> ?</div>}
					handleOnClick={() => deleteCard(focusCard[0].card_uuid)}
					handleCancel={() => setShowWarning(false)}
					iconName="MdDeleteOutline"
				/>
			)}
			{cardsRef.current.length > 0 && <ResponsiveReactGridLayout
					onBreakpointChange={onBreakpointChange}
					onLayoutChange={(layout, newlayouts) =>  onLayoutChange(layout, newlayouts)}
					layouts={layoutsRef.current}
					rowHeight= {100}
					isResizable= {false}
					isBounded= {true}
					// className= 'layout'
					// cols= {{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
					// breakpoints= {{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
				>
					{cardsRef.current.map((card) => createMiniCard(card))}
			</ResponsiveReactGridLayout>}
			<div className={styles.blur} data-show={focusCard? true : false} onClick={updateCard}>
				{focusCard && (
					<RecipeCard
						recipe={focusCard}
						setRecipe={setFocusCard}
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


