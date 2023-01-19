import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

//Middleware fetches current user before saving it to the store
export const getUser = createAsyncThunk('user/getUser', async (thunkAPI) => {
	const response = await fetch('http://localhost:3000/users', {
		//This allows client to send the session cookie with request.
		// Without it, CORS will block the request. The request won't make it to deserializeUser().
		credentials: 'include',
	});
	let user = await response.json();
	return user;
});

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
		},
		isLoading: false,
		hasError: false,
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
				theme: 'light',
				google_name: null,
				avatar_variant: null,
				avatar_colors: null,
				layouts_recipes: null,
				layouts_lists: null,
			}
		}
	},
	extraReducers: {
		[getUser.pending]: (state, action) => {
			state.isLoading = true;
			state.hasError = false;
		},
		[getUser.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.hasError = false;
			state.user = action.payload;
		},
		[getUser.rejected]: (state, action) => {
			state.isLoading = false;
			state.hasError = true;
		},
		// [updateUser.pending]: (state, action) => {
		// 	state.isLoading = true;
		// 	state.hasError = false;
		// },
		// [updateUser.fulfilled]: (state, action) => {
		// 	state.isLoading = false;
		// 	state.hasError = false;
		// 	state.user = { ...state, ...action.payload };
		// },
		// [updateUser.rejected]: (state, action) => {
		// 	state.isLoading = false;
		// 	state.hasError = true;
		// },
	},
});

export const selectUser = (state) => state.user.user;
export const userHasError = (state) => state.user.hasError;
export const { updateUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
