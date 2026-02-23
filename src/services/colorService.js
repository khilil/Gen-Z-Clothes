import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1/colors';

export const getAllColors = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const createColor = async (colorData) => {
    try {
        const response = await axios.post(API_URL, colorData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const deleteColor = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
