import api, { API_BASE_URL } from './api';

const API_URL = `${API_BASE_URL}/sizes`;

export const getAllSizes = async () => {
    try {
        const response = await api.get(API_URL);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const createSize = async (sizeData) => {
    try {
        const response = await api.post(API_URL, sizeData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const deleteSize = async (id) => {
    try {
        const response = await api.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
