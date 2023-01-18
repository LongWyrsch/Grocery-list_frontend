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

const recipesSlice = createSlice({
	name: 'recipes',
	initialState: {
		recipes: [],
		isLoading: false,
		hasError: false,
	},
	reducers: {
		deleteRecipe: (state, action) => {
			console.log('recipesSlice, deleteRecipe called')
			state.recipes = state.recipes.filter((recipe) => recipe[0].card_uuid !== action.payload);
		},
		updateRecipe: (state, action) => {
			console.log('recipesSlice, updateRecipe called')

			let updatedRecipe = action.payload;
			console.log('recipesSlice/updatedRecipe')

			// Find index of recipe
			let recipeIndex = state.recipes.findIndex(recipe => recipe[0].card_uuid === updatedRecipe[0].card_uuid)

			// Replace with updatedRecipe at recipeIndex
			state.recipes.splice(recipeIndex,1,updatedRecipe)
		},
		addRecipe: (state, action) => { 
			console.log('recipesSlice, addRecipe called')
			let updatedRecipes = [...state.recipes, action.payload]
			state.recipes = updatedRecipes
		}
	},
	extraReducers: {
		[getRecipes.pending]: (state, action) => {
			state.isLoading = true;
			state.hasError = false;
		},
		[getRecipes.fulfilled]: (state, action) => {
			console.log('recipesSlice, getRecipes called')
			state.isLoading = false;
			state.hasError = false;
			state.recipes = action.payload;
		},
		[getRecipes.rejected]: (state, action) => {
			state.isLoading = false;
			state.hasError = true;
		}
	},
});

export const selectRecipes = (state) => state.recipes.recipes;
export const isLoadingRecipes = (state) => state.recipes.isLoading;
export const { deleteRecipe, updateRecipe, addRecipe } = recipesSlice.actions;
export default recipesSlice.reducer;
