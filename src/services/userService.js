import axios from 'axios';
const API_URL = 'http://localhost:4555';

export const getUsers = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/users`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error.response ? error.response.data : error);
        throw error;
    }
};

export const deleteUser = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(`${API_URL}/user/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Failed to delete user:", error.response ? error.response.data : error);
        throw error;
    }
};

export const changeUserType = async (id, newType) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.patch(`${API_URL}/usertype/${id}`, { newType }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data.user;
    } catch (error) {
        console.error("Failed to change user type:", error.response ? error.response.data : error);
        throw error;
    }
};
