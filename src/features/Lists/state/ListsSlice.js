import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { listsDemo } from './listsDemo'

//Middleware fetches all lists before saving it to the store
export const getLists = createAsyncThunk('lists/getLists', async (thunkAPI) => {
	const response = await fetch('http://localhost:3000/lists', {
		method: 'GET',
		credentials: 'include',
	});
	const json = await response.json();
	return json;
});

const listsSlice = createSlice({
	name: 'lists',
	initialState: {
        lists: [],
        isLoading: false,
        hasError: false
	},
	reducers: {
		deleteList: (state, action) => {
			state.lists = state.lists.filter((list) => list[0].card_uuid !== action.payload);
		},
		updateList: (state, action) => {
			let updatedList = action.payload;
			console.log('listsSlice/updatedList')

			// Find index of list
			let listIndex = state.lists.findIndex(list => list[0].card_uuid === updatedList[0].card_uuid)

			// Replace with updatedList at listIndex
			state.lists.splice(listIndex,1,updatedList)
		},
		addList: (state, action) => { 
			console.log('listsSlice, addList called')
			let updatedLists = [...state.lists, action.payload]
			state.lists = updatedLists
		},
		clearLists: (state) => {
			state.lists = []
		},
		initializeListsDemo: (state) => { 
			state.lists = listsDemo
		 }
	},
	extraReducers: {
		[getLists.pending]: (state, action) => {
			state.isLoading = true;
			state.hasError = false;
		},
		[getLists.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.hasError = false;
			state.lists = action.payload
		},
		[getLists.rejected]: (state, action) => {
			state.isLoading = false;
			state.hasError = true;
		}
	}
});

export const selectLists = (state) => state.lists.lists;
export const isLoadingLists = (state) => state.lists.isLoading;
export const { deleteList, updateList, addList, clearLists, initializeListsDemo } = listsSlice.actions;
export default listsSlice.reducer;
