import axios from 'axios';
const API_URL = 'http://localhost:4555';

export const login = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/login`, {
            id: credentials.id,
            password: credentials.password
        });
        const token = response.data;
        if (token) {
            localStorage.setItem('token', token);
            return { token };  // Retourne un objet avec le token
        } else {
            throw new Error('Token not provided in response');
        }
    } catch (error) {
        console.error("Login error:", error.response ? error.response.data : error);
        throw error;
    }
};

export const checkAdminStatus = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/isadmin`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data.isAdmin;
    } catch (error) {
        console.error("Error checking admin status:", error.response ? error.response.data : error);
        throw error;
    }
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
};

export const signup = async (credentials) => {
    const response = await axios.post(`${API_URL}/signup`, credentials);
    return response.data;
};
