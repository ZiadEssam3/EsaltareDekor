import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    favorites: [],
    statusTab: false,
};

// Save favorites to localStorage
const updateFavStorage = (favorites) => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
};

const favSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        // Add product to favorites (if not already there)
        addToFav(state, action) {
            const product = action.payload;
            const exists = state.favorites.find(item => item.productId === product.productId);

            if (!exists) {
                state.favorites.push(product);
                updateFavStorage(state.favorites);
            }
        },
        toggleStatusTabFav(state) {
            state.statusTab = !state.statusTab;
        },
        // Remove product from favorites
        removeFromFav(state, action) {
            const { productId } = action.payload;
            state.favorites = state.favorites.filter(item => item.productId !== productId);
            updateFavStorage(state.favorites);
        },

        // Load favorites from localStorage
        setFavFromStorage(state, action) {
            state.favorites = action.payload || [];
        },
    }
});

export const {
    addToFav,
    removeFromFav,
    setFavFromStorage,
    toggleStatusTabFav
} = favSlice.actions;

export default favSlice.reducer;
