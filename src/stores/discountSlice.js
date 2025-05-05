import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchDiscountCode } from '../services/discountService';

export const getDiscountCode = createAsyncThunk(
  'discount/getDiscountCode',
  async () => {
    return await fetchDiscountCode();
  }
);

const discountSlice = createSlice({
  name: 'discount',
  initialState: {
    code: '',
    percentage: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDiscountCode.fulfilled, (state, action) => {
      state.code = action.payload.code;
      state.percentage = action.payload.percentage;
    });
  }
});

export default discountSlice.reducer;
