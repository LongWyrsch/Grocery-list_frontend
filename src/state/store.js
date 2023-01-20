import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/state/userSlice';
import recipesReducer from '../features/recipes/state/recipesSlice';
import listsReducer from '../features/lists/state/listsSlice';

export default configureStore({
	reducer: {
		user: userReducer,
		recipes: recipesReducer,
		lists: listsReducer,
	},
});
