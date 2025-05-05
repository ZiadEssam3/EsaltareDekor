import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    statusTab: false,
};

const updateLocalStorage = (items) => {
    localStorage.setItem("carts", JSON.stringify(items));
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // Add product to cart or update its quantity
        addToCart(state, action) {
            const { productId, quantity } = action.payload;
            const index = state.items.findIndex(item => item.productId === productId);

            if (index >= 0) {
                state.items[index].quantity += quantity;
            } else {
                state.items.push({ productId, quantity });
            }

            updateLocalStorage(state.items);
        },

        // Change quantity or remove product
        changeQuantity(state, action) {
            const { productId, quantity } = action.payload;
            const index = state.items.findIndex(item => item.productId === productId);

            if (quantity > 0 && index >= 0) {
                state.items[index].quantity = quantity;
            } else {
                state.items = state.items.filter(item => item.productId !== productId);
            }

            updateLocalStorage(state.items);
        },

        // Toggle visibility of cart tab
        toggleStatusTab(state) {
            state.statusTab = !state.statusTab;
        },

        // Load cart from localStorage on first load
        setCartFromStorage(state, action) {
            state.items = action.payload || [];
        }
    }
});

export const { addToCart, changeQuantity, toggleStatusTab, setCartFromStorage } = cartSlice.actions;
export default cartSlice.reducer;
