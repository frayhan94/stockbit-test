import { createSlice } from '@reduxjs/toolkit'

export const movieSlice = createSlice({
    name: 'movie store',
    initialState: {
        listAllMovies: [],
        listSingleMovie:{},
        loading: false,
        loadingLoadMore: false,
        count: 0
    },
    reducers: {
        requestMovie: (state, action) => {
            state.showProductDetails = state.products.find(
                product => product.id === action.payload
            )
        },
        requestLoadMoreMovie: (state, action) => {
            state.favorites = [...state.favorites, action.payload]
        },
        countAllMovie: (state, action) => {
            state.cartItems = [
                ...state.cartItems.filter(item => item.id !== action.payload.id),
                {
                    id: action.payload.id,
                    title: action.payload.title,
                    price: action.payload.price,
                    quantity: action.payload.quantity
                }
            ]
        },
        getAllMovie: (state, action) => {
            state.listAllMovies = action.payload;
        },
        getSingleMovie: (state, action) => {
            state.listSingleMovie = {...state.listSingleMovie, ...action.payload}
        },

        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setLoadingMore: (state, action) => {
            state.loadingMore = action.payload;
        },

    }
})

export const {
    requestMovie,
    requestLoadMoreMovie,
    countAllMovie,
    getAllMovie,
    getSingleMovie,
    setLoading,
    setLoadingMore
} = movieSlice.actions

export const selectAllMovie = state => state.movie.listAllMovies
export const selectSingleMovie = state => state.movie.listSingleMovie
export const selectLoading = state => state.movie.loading
export const selectLoadingMore = state => state.movie.loadingLoadMore
export const selectCount = state => state.movie.count

export default movieSlice.reducer
