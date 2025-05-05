import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cart';
import favReducer from './favourite';
import productsReducer from './product';
import userReducer from './user';
import discountReducer from './discountSlice'
import newArrivalsReducer  from './NewArrivalsSlice';
export const store = configureStore({
    reducer: {
        cart: cartReducer,
        favorites: favReducer,
        products: productsReducer,
        user: userReducer,
        discount: discountReducer,
        newArrivals: newArrivalsReducer
        // user: ...
    }
});
