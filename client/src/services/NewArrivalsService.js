import axios from 'axios';
const API_URL = 'http://localhost:3000/api/new-arrivals';
const API_URL_Products = 'http://127.0.0.1:8000/api/home';
const API_URL_Cart = 'http://127.0.0.1:8000/api/cart';
const API_URL_Faveourite= 'http://127.0.0.1:8000/api/favourites';

export const fetchNewArrivalsData = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching new arrivals:', error);
        throw error;
    }
};


export const getSuperDealsProducts = async () => {
    try {
        const response = await axios.get(API_URL_Products);
        console.log(response.data.super_deals);
        return response.data.super_deals;
    } catch (error) {
        console.error('Error fetching Super Deals:', error);
        throw error;
    }
};


export const getMegaDealsProducts = async () => {
    try {
        const response = await axios.get(API_URL_Products);
        console.log(response.data.mega_deals);
        return response.data.mega_deals;
    } catch (error) {
        console.error('Error fetching Mega Deals:', error);
        throw error;
    }
};


export const getNewArrivalsProducts = async () => {
    try {
        const response = await axios.get(API_URL_Products);
        console.log(response.data.new_arrivals);
        return response.data.new_arrivals;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export const getAllCartItems = async (token) => {
    try {
        const response = await axios.get(API_URL_Cart, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const items = response.data.data || []; 
        console.log('Cart Items:', items);
        return items;
    } catch (error) {
        console.error('Error fetching Cart Products:', error);
        return [];
    }
};

export const getAllFavouriteItems = async (token) => {
    try {
        const response = await axios.get(API_URL_Faveourite, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const items = response.data.data || []; 
        console.log('Favourite request Items:', items);
        return items;
    } catch (error) {
        console.error('Error fetching Cart Products:', error);
        return [];
    }
};


export const getAllProducts = async () => {
    try {
        const response = await axios.get(API_URL_Products);
        console.log(response.data.new_arrivals);
        return response.data.new_arrivals;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};