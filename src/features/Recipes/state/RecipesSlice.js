import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

//Middleware fetches all recipes before saving it to the store
export const getRecipes = createAsyncThunk('recipes/getRecipes', async (thunkAPI) => {
	const response = await fetch('http://localhost:3000/recipes', {
		method: 'GET',
		credentials: 'include',
	});
	const json = await response.json();
	return json;
});

//Middleware updates recipe before updating it in the store
export const updateRecipe = createAsyncThunk('recipes/updateRecipe', async (updatedRecipe, thunkAPI) => {
	const response = fetch('http://localhost:3000/recipes', {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-type': 'application/json',
		},
		// We convert the React state to JSON and send it as the POST body
		body: JSON.stringify(updatedRecipe),
	});
	// const json = await response.json();
	if (response.status === 200) return updateRecipe;
});

const recipesSlice = createSlice({
	name: 'recipes',
	initialState: {
		recipes: [],
		isLoading: false,
		hasError: false,
	},
	reducers: {
		deleteRecipeInState: (state, action) => {
			state.recipes = state.recipes.filter((recipe) => recipe[0].card_uuid !== action.payload);
		},
		updateRecipeInState: (state, action) => {
			let updatedRecipe = action.payload;
			console.log(updatedRecipe)
			// Find index of recipe
			let recipeIndex = state.recipes.findIndex(recipe => recipe[0].card_uuid === updatedRecipe[0].card_uuid)

			// Replace with updatedRecipe at recipeIndex
			state.recipes.splice(recipeIndex,1,updatedRecipe)
		},
		createRecipeInState: (state, action) => { 
			let newRecipe = action.payload
			state.recipes = state.recipes.push(newRecipe)
		}
	},
	extraReducers: {
		[getRecipes.pending]: (state, action) => {
			state.isLoading = true;
			state.hasError = false;
		},
		[getRecipes.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.hasError = false;
			state.recipes = action.payload;
		},
		[getRecipes.rejected]: (state, action) => {
			state.isLoading = false;
			state.hasError = true;
		},
		[updateRecipe.pending]: (state, action) => {
			state.isLoading = true;
			state.hasError = false;
		},
		[updateRecipe.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.hasError = false;

			state.recipes = [...state, ...action.payload];
		},
		[updateRecipe.rejected]: (state, action) => {
			state.isLoading = false;
			state.hasError = true;
		},
	},
});

export const selectRecipes = (state) => state.recipes.recipes;
export const isLoadingRecipes = (state) => state.recipes.isLoading;
export const { deleteRecipeInState } = recipesSlice.actions;
export const { updateRecipeInState } = recipesSlice.actions;
export const { createRecipeInState } = recipesSlice.actions;
export default recipesSlice.reducer;
