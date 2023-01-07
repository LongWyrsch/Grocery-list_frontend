import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../features/theme/state/themeSlice';
import userReducer from '../features/user/state/userSlice';

export default configureStore({
	reducer: {
		theme: themeReducer,
		user: userReducer
	},
});
