import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../features/theme/state/themeSlice';
import userReducer from '../features/user/state/userSlice';
import recipesReducer from '../features/recipes/state/recipesSlice';

export default configureStore({
	reducer: {
		theme: themeReducer,
		user: userReducer,
		recipes: recipesReducer,
	},
});
