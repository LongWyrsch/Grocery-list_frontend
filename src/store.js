import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './features/theme/components/themeSlice'

export default configureStore({
    reducer: {
        theme: themeReducer
    }
})