import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../features/theme/state/themeSlice';

export default configureStore({
	reducer: {
		theme: themeReducer,
	},
});
