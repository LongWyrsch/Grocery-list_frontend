import { createSlice} from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: 'theme',
    initialState: 'light',
    reducers: {
        toggleTheme: (state, action) => {
            return state === 'light'? 'dark' : 'light'
        }
    }
})

export default themeSlice.reducer
export const {toggleTheme} = themeSlice.actions
export const selectTheme = (state) => state.theme