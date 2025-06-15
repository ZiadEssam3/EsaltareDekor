import axios from 'axios';
const API_BASE_URL = 'http://127.0.0.1:8000/api/home';

export const fetchDiscountCode = async () => {
  const response = await axios.get('http://localhost:3000/api/discount-code', {
    withCredentials: false
  });
  return response.data;
};



export const getBrandAnnouncements = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}`);
    console.log(response.data.announcements);
    return response.data.announcements;
  } catch (error) {
    console.error('Error fetching brand ads:', error);
    throw error;
  }
};