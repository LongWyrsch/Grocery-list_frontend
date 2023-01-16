import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

//Middleware fetches all lists before saving it to the store
export const getLists = createAsyncThunk('lists/getLists', async (thunkAPI) => {
	const response = await fetch('http://localhost:3000/lists', {
		method: 'GET',
		credentials: 'include',
	});
	const json = await response.json();
	return json;
});

// //Middleware updates list before updating it in the store
// export const updateList = createAsyncThunk('lists/updateList', async (updatedList, thunkAPI) => {
// 	const response = fetch('http://localhost:3000/lists', {
// 		method: 'POST',
// 		headers: {
// 			'Content-type': 'application/json',
// 		},
// 		// We convert the React state to JSON and send it as the POST body
// 		body: JSON.stringify(updatedList),
// 	});
// 	const json = await response.json();
// 	return json;
// });

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
			console.log('listsSlice/updatedList:', updatedList)

			// Find index of list
			let listIndex = state.lists.findIndex(list => list[0].card_uuid === updatedList[0].card_uuid)

			// Replace with updatedList at listIndex
			state.lists.splice(listIndex,1,updatedList)
		},
		createList: (state, action) => { 
			let newList = action.payload
			state.lists = state.lists.push(newList)
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
		},
        // [updateList.pending]: (state, action) => {
		// 	state.isLoading = true;
		// 	state.hasError = false;
		// },
		// [updateList.fulfilled]: (state, action) => {
		// 	state.isLoading = false;
		// 	state.hasError = false;
		// 	state.lists = [...state, ...action.payload]
		// },
		// [updateList.rejected]: (state, action) => {
		// 	state.isLoading = false;
		// 	state.hasError = true;
		// }
	}
});

export const selectLists = (state) => state.lists.lists;
export const isLoadingLists = (state) => state.lists.isLoading;
export const { deleteList, updateList, createList } = listsSlice.actions;
export default listsSlice.reducer;
