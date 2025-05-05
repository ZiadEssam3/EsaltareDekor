import axios from 'axios';

const API_URL = 'http://localhost:3000/api/new-arrivals';

export const fetchNewArrivalsData = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data; // Returning the response data
    } catch (error) {
        console.error('Error fetching new arrivals:', error);
        throw error;
    }
};
