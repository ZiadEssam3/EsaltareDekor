import axios from 'axios';
import Cookies from 'js-cookie';
axios.defaults.withCredentials = true;

const API_URL = "https://web-production-0ba5.up.railway.app/api/user";
const API_URL2 = "https://web-production-0ba5.up.railway.app/api";


export const signupUser = (email, password, name, password_confirmation) =>
    axios.post(`${API_URL}/signup`,
        {
            email,
            password,
            password_confirmation,
            name
        },
        {
            withCredentials: true
        }
    )
        .then((res) => {
            return res;
        })
        .catch((error) => {
            console.error("Signup request failed:", error);
            throw error;
        }
);
export const loginUser = (email, password) =>
    axios.post(`${API_URL}/login`,
        {
            email,
            password
        }, {
        withCredentials: true
    }
    ).then((res) => {
        Cookies.set('token', res.data.token, { expires: 7, path: '' }); 
        // localStorage.setItem('token', JSON.stringify(res.data.token));
        return res;

    })
        .catch((error) => {
            console.error("Login request failed:", error);
            throw error;
        }
);
export const sendResetEmail = (email) =>
    axios.post(`${API_URL}/forgot-password`,
        {
            email
        }

    ).then((res) => {
        localStorage.setItem('token', JSON.stringify(res.data.token));
        return res;

    })
        .catch((error) => {
            console.error("Failed to send reset email:", error);
            throw error;
        }
);
export const resetPasswordWithToken = (token, email, password , password_confirmation) =>
    axios.post(`${API_URL}/reset-password`, 
        {
        token,
        password,
        password_confirmation,
        email
    }
);
export const logoutUser = (token) =>
    axios.post(`${API_URL2}/logout`, {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
}
);

export const verifyEmailCode = (code) =>
    axios.post(`${API_URL}/verify-email`, { code });

export const checkAuthStatus = () =>
    axios.get(`${API_URL}/check-auth`);


