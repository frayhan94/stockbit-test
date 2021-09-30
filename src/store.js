import { configureStore } from '@reduxjs/toolkit'
import movieReducer from './reducers/movieSlice.js'
export default configureStore({
    reducer: {
        movie:movieReducer
    }
})
