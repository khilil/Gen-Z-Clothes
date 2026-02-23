import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1/sizes';

export const getAllSizes = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const createSize = async (sizeData) => {
    try {
        const response = await axios.post(API_URL, sizeData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const deleteSize = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
