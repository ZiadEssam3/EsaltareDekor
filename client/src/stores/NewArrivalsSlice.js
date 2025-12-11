import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { fetchNewArrivalsData } from '../services/NewArrivalsService';

export const fetchNewArrivals = createAsyncThunk(
    'newArrivals/fetchNewArrivals',
    async () => {
        const response = await fetchNewArrivalsData();
        return response;
    }
);

const newArrivalsSlice = createSlice({
    name: 'newArrivals',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        resetNewArrivals: (state) => {
            state.items = [];
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNewArrivals.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchNewArrivals.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = [...action.payload];
            })
            .addCase(fetchNewArrivals.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload?.message || action.error.message;
            });
    },
});

export const { resetNewArrivals } = newArrivalsSlice.actions;
export default newArrivalsSlice.reducer;