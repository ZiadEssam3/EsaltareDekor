import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    compare: [],
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.compare = action.payload.compare || [];
        },
        addProduct: (state, action) => {
            state.items.push(action.payload);
        },
        updateProduct: (state, action) => {
            const index = state.items.findIndex(product => product.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },
        removeProduct: (state, action) => {
            state.items = state.items.filter(product => product.id !== action.payload.id);
        },

        // --- COMPARE RELATED --- \\ 
        addToCompare: (state, action) => {
            const exists = state.compare.find(p => p.id === action.payload.id);
            if (!exists && state.compare.length < 4) {
                state.compare.push(action.payload);
                localStorage.setItem('compare', JSON.stringify(state.compare));
            } else {
                toast.error('You can only compare up to 4 products.');
            }
        },
        clearCompare: (state) => {
            state.compare = [];  
            localStorage.removeItem('compare');  
        },
        removeFromCompare: (state, action) => {
            state.compare = state.compare.filter(p => p.id !== action.payload);
        },


    }
});

export const {
    setProducts,
    addProduct,
    updateProduct,
    removeProduct,
    addToCompare,
    removeFromCompare,
    clearCompare
} = productsSlice.actions;

export default productsSlice.reducer;
