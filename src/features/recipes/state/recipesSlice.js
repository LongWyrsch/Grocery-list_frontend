import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { config } from '../../../constants';
import {DemoRecipes} from './DemoRecipes'

//Middleware fetches all recipes before saving it to the store
export const getRecipes = createAsyncThunk('recipes/getRecipes', async (thunkAPI) => {
	const response = await fetch(`${config.server_url}/recipes`, {
		method: 'GET',
		credentials: 'include',
	});
	const recipes = await response.json();

	return recipes;
});

const recipesSlice = createSlice({
	name: 'recipes',
	initialState: {
		recipes: [],
		isLoading: false,
		hasError: false,
	},
	reducers: {
		deleteRecipe: (state, action) => {
			console.log('recipesSlice, deleteRecipe called');
			state.recipes = state.recipes.filter((recipe) => recipe[0].card_uuid !== action.payload);
		},
		updateRecipe: (state, action) => {
			console.log('recipesSlice, updateRecipe called');

			let updatedRecipe = action.payload;
			console.log('recipesSlice/updatedRecipe');

			// Find index of recipe
			let recipeIndex = state.recipes.findIndex((recipe) => recipe[0].card_uuid === updatedRecipe[0].card_uuid);

			// Replace with updatedRecipe at recipeIndex
			state.recipes.splice(recipeIndex, 1, updatedRecipe);
		},
		addRecipe: (state, action) => {
			console.log('recipesSlice, addRecipe called');
			let updatedRecipes = [...state.recipes, action.payload];
			state.recipes = updatedRecipes;
		},
		clearRecipes: (state) => {
			state.recipes = [];
		},
		initializeDemoRecipes: (state) => {
			state.recipes = DemoRecipes;
		},
	},
	extraReducers: builder => {
		builder
			.addCase(getRecipes.pending, (state, action) => {
				state.isLoading = true;
				state.hasError = false;
			})
			.addCase(getRecipes.fulfilled, (state, action) => {
				console.log('recipesSlice, getRecipes called');
				state.isLoading = false;
				state.hasError = false;
				state.recipes = action.payload;
			})
			.addCase(getRecipes.rejected, (state, action) => {
				state.isLoading = false;
				state.hasError = true;
			})
	}
});

export const selectRecipes = (state) => state.recipes.recipes;
export const isLoadingRecipes = (state) => state.recipes.isLoading;
export const { deleteRecipe, updateRecipe, addRecipe, clearRecipes, initializeDemoRecipes } = recipesSlice.actions;
export default recipesSlice.reducer;
