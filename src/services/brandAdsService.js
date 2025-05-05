import axios from 'axios';
const API_BASE_URL = 'http://localhost:3000/api';
export const getBrandAds = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/brand-ads`);
    return response.data;
  } catch (error) {
    console.error('Error fetching brand ads:', error);
    throw error;
  }
};
