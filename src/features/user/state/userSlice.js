import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { config } from '../../../constants';
import { DemoUser } from './DemoUser';

// Middleware fetches current user before saving it to the store
export const getUser = createAsyncThunk('user/getUser', async (thunkAPI) => {
	console.log('config.server_url: ', config.server_url)
	const response = await fetch(`${config.server_url}/users`, {
		//This allows client to send the session cookie with request.
		// Without it, CORS will block the request. The request won't make it to deserializeUser().
		credentials: 'include',
	});
	let user = await response.json();
	return user;
});
// import { getUser } from './thunck';


const userSlice = createSlice({
	name: 'user',
	initialState: {
		user: {
			uuid: null,
			email: null,
			language: null,
			theme: 'light',
			google_name: null,
			avatar_variant: null,
			avatar_colors: null,
			layouts_recipes: null,
			layouts_lists: null,
			CSRF_token: null,
		},
		isLoading: false,
		hasError: false,
		hasLoaded: false
	},
	reducers: {
		updateUser: (state, action) => {
			console.log('userSlice updating user');
			state.user = action.payload;
		},
		clearUser: (state) => {
			state.user = {
				uuid: null,
				email: null,
				language: null,
				theme: state.user.theme,
				google_name: null,
				avatar_variant: null,
				avatar_colors: null,
				layouts_recipes: null,
				layouts_lists: null,
			};
		},
		initializeDemoUser: (state) => {
			state.user = DemoUser;
		},
	},
	extraReducers: builder => {
		builder
			.addCase(getUser.pending, (state, action) => {
				state.isLoading = true;
				state.hasError = false;
			})
			.addCase(getUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.hasError = false;
				state.wasRequested = true;
				state.user = action.payload;
			})
			.addCase(getUser.rejected, (state, action) => {
				state.isLoading = false;
				state.hasError = true;
				state.wasRequested = true;
			})
	}
});

export const selectUser = (state) => state.user.user;
export const userHasError = (state) => state.user.hasError;
export const userWasRequested = (state) => state.user.wasRequested;
export const { updateUser, clearUser, initializeDemoUser } = userSlice.actions;
export default userSlice.reducer;
