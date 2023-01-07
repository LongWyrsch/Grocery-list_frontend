import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

//Middleware fetches current user before saving it to the store
export const getUser = createAsyncThunk('user/getUser', async (thunkAPI) => {
	const response = await fetch('http://localhost:3000/users', {
		credentials: 'include',
	});
	const json = await response.json();
	return json;
});

//Middleware updates current user before updating it in the store
export const updateUser = createAsyncThunk('user/updateUser', async (updatedUser, thunkAPI) => {
	const response = fetch('http://localhost:3000/users', {
		method: 'POST',
		headers: {
			'Content-type': 'application/json',
		},
		// We convert the React state to JSON and send it as the POST body
		body: JSON.stringify(updateUser),
	});
	const json = await response.json();
	return json;
});

const userSlice = createSlice({
	name: 'user',
	initialState: {
        user: {
            email: null,
            language: null,
            darktheme: false,
            googleName: null,
			avatarVariant: null,
			avatarColors: null
        },
        isLoading: false,
        hasError: false
	},
	extraReducers: {
		[getUser.pending]: (state, action) => {
			state.isLoading = true;
			state.hasError = false;
		},
		[getUser.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.hasError = false;
			state.user = action.payload
		},
		[getUser.rejected]: (state, action) => {
			state.isLoading = false;
			state.hasError = true;
		},
        [updateUser.pending]: (state, action) => {
			state.isLoading = true;
			state.hasError = false;
		},
		[updateUser.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.hasError = false;
			state.user = {...state, ...action.payload}
		},
		[updateUser.rejected]: (state, action) => {
			state.isLoading = false;
			state.hasError = true;
		}
	}
});

export const selectUser = (state) => state.user.user;
export const isLoadingUser = (state) => state.user.isLoading;
export default userSlice.reducer;
