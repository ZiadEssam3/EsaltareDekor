import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getBrandAnnouncements } from '../services/discountService';

export const getDiscountCode = createAsyncThunk(
  'discount/getDiscountCode',
  async () => {
    return await getBrandAnnouncements();
  }
);

const discountSlice = createSlice({
  name: 'discount',
  initialState: {
    title: '',
    percentage: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDiscountCode.fulfilled, (state, action) => {
      const firstDiscount = action.payload[0]; 
      state.title = firstDiscount?.title || '';
      state.percentage = firstDiscount?.percentage || null;
    });
  }
});


export default discountSlice.reducer;
