import axios from 'axios';
import { getCookie } from '../utils/config';

const token = getCookie('token');
// const API_URL = 'https://web-production-0ba5.up.railway.app/api';
const API_URL = 'http://127.0.0.1:8000/api';

export const addProduct = async (productData) => {
    if (!Array.isArray(productData.images) || productData.images.length === 0) {
        console.error('no Images To Upload');
        return;
    }
    for (let img of productData.images) {
        if (!(img instanceof File || img instanceof Blob)) {
            console.error('Images must be of type File or Blob');
            return;
        }
    }

    const formData = new FormData();
    formData.append('name', productData.name || '');
    formData.append('category_id', productData.category_id || '');
    formData.append('description', productData.description || '');
    formData.append('price', parseFloat(productData.price || 0));
    formData.append('subcategory_id', productData.subcategory_id || '');
    formData.append('num_in_stock', parseInt(productData.num_in_stock || 0));

    productData.images.forEach((img) => {
        formData.append('images[]', img);
    });

    console.log('Sending product:', productData);
    try {
        const response = await axios.post(`${API_URL}/vendor/add-product`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error('Upload failed:', error);
        if (error.response) {
            console.error('Server Response:', error.response.data);
        }
        throw error;
    }
};



