import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addProduct } from '../services/vendorService';

export const addNewProduct = createAsyncThunk(
    'vendor/addProduct',
    async (productData, { rejectWithValue }) => {
        try {
            const response = await addProduct(productData);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const vendorSlice = createSlice({
    name: 'vendor',
    initialState: {
        productData: {
            name: '',
            images: [], 
            num_in_stock: '', 
            status: '',   
            description: '',
            price: '',
            subcategory_id: '',  
            category_id: ''       
        },
        loading: false,
        error: null
    },
    reducers: {
        setProductData: (state, action) => {
            state.productData = {
                ...state.productData,
                ...action.payload
            };
        },
        resetProductData: (state) => {
            state.productData = {
                name: '',
                images: [],
                num_in_stock: '', 
                status: '',   
                description: '',
                price: '',
                subcategory_id: '',   
                category_id: ''       
            };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addNewProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addNewProduct.fulfilled, (state) => {
                state.loading = false;
                state.productData = {
                    name: '',
                    images: [],   
                    num_in_stock: '', 
                    status: '',   
                    description: '',
                    price: '',
                    subcategory_id: '',   
                    category_id: ''       
                };
            })
            .addCase(addNewProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});


export const { setProductData, resetProductData } = vendorSlice.actions;
export default vendorSlice.reducer;