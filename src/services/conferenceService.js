import axios from 'axios';
const API_URL = 'http://localhost:4555';

export const getConferences = async () => {
    try {
        const response = await axios.get(`${API_URL}/conferences`);
        return response.data;
    } catch (error) {
        console.error("Error fetching conferences:", error.response ? error.response.data : error);
        throw error;
    }
};

export const getConference = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/conference/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching conference details:", error.response ? error.response.data : error);
        throw error;
    }
};

export const createConference = async (conferenceData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${API_URL}/conference`, conferenceData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error creating conference:", error.response ? error.response.data : error);
        throw error;
    }
};

export const updateConference = async (id, conferenceData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.patch(`${API_URL}/conference/${id}`, conferenceData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error updating conference:", error.response ? error.response.data : error);
        throw error;
    }
};

export const deleteConference = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(`${API_URL}/conference/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error deleting conference:", error.response ? error.response.data : error);
        throw error;
    }
};
