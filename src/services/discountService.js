import axios from 'axios';

export const fetchDiscountCode = async () => {
  const response = await axios.get('http://localhost:3000/api/discount-code', {
withCredentials: false
  });
  return response.data; 
};
