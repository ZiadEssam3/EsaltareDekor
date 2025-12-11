import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    username: '',
    email: '',
    avatar: '', 
    lastOrders: [],
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state, action) => {
            const { username, email, avatar, lastOrders } = action.payload;
            state.username = username;
            state.email = email;
            state.avatar = avatar || '';
            state.lastOrders = lastOrders || [];
        },
        clearUserData: (state) => {
            state.username = '';
            state.email = '';
            state.avatar = '';
            state.lastOrders = [];
        },
    },
});

export const { setUserData, clearUserData } = userSlice.actions;
export default userSlice.reducer;
