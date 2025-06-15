// favSlice.js (Redux Slice)
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    favorites: [],
    statusTab: false,
    loading: false,
    error: null
};

const favSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        setFavFromStorage(state, action) {
            state.favorites = action.payload || [];
        },
        addToFav(state, action) {
            const product = action.payload;
            const exists = state.favorites.find(item => item.productId === product.productId);
            if (!exists) {
                state.favorites.push(product);
            }
        },
        removeFromFav(state, action) {
            const { id } = action.payload;
            state.favorites = state.favorites.filter(item => item.id !== id);
        },
        refreshFavorites(state, action) {
            state.favorites = action.payload;
            state.error = null;
        },
        toggleStatusTabFav(state) {
            state.statusTab = !state.statusTab;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
        clearFavorites(state) {
            state.favorites = [];
        }
    }
});

export const {
    addToFav,
    removeFromFav,
    setFavFromStorage,
    toggleStatusTabFav,
    refreshFavorites,
    setLoading,
    setError,
    clearFavorites
} = favSlice.actions;

export default favSlice.reducer;
