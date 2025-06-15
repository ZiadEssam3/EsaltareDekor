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
        addToCart(state, action) {
            const { productId, title, image, price, quantity } = action.payload;
            const index = state.items.findIndex(item => item.productId === productId);
            const quantityNumber = parseInt(quantity); 
        
            if (index >= 0) {
                state.items[index].quantity += quantityNumber;
            } else {
                state.items.push({ productId, title, image, price, quantity: quantityNumber });
            }
        
            updateLocalStorage(state.items);
        },

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

        toggleStatusTab(state) {
            state.statusTab = !state.statusTab;
        },

        setCartFromStorage(state, action) {
            state.items = action.payload || [];
            updateLocalStorage(state.items);
        }
    }
});

export const { addToCart, changeQuantity, toggleStatusTab, setCartFromStorage } = cartSlice.actions;
export default cartSlice.reducer;
