import axios from 'axios';
// http://127.0.0.1:8000/api/home
const API_BASE_URL = 'http://localhost:3000/api';
const API_BASE_URL_2 = 'http://127.0.0.1:8000/api/home';


export const getBrandAds = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/brand-ads`);
    return response.data;
  } catch (error) {
    console.error('Error fetching brand ads:', error);
    throw error;
  }
};



export const getAdvertisedata = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL_2}`);
    // console.log('my slides', response.data.posts[0].image);
    console.log('my slides', response.data.posts[0].image);
    return response.data.posts;
  } catch (error) {
    console.error('Error fetching brand ads:', error);
    throw error;
  }
};
