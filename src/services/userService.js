import axios from 'axios';

const API_URL = "http://localhost:3000/";
axios.defaults.withCredentials = true;

export const signupUser = (email, password, name) =>
    axios.post(`${API_URL}signup`, { email, password, name });

export const loginUser = (email, password) =>
    axios.post(`${API_URL}login`, { email, password });

export const logoutUser = () =>
    axios.post(`${API_URL}/logout`);

export const verifyEmailCode = (code) =>
    axios.post(`${API_URL}/verify-email`, { code });

export const checkAuthStatus = () =>
    axios.get(`${API_URL}/check-auth`);

export const sendResetEmail = (email) =>
    axios.post(`${API_URL}/forgotpassword`, { email });

export const resetPasswordWithToken = (token, password) =>
    axios.post(`${API_URL}/resetpassword/${token}`, { password });
