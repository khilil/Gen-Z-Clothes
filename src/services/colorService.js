import api, { API_BASE_URL } from './api';

const API_URL = `${API_BASE_URL}/colors`;

export const getAllColors = async () => {
    try {
        const response = await api.get(API_URL);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const createColor = async (colorData) => {
    try {
        const response = await api.post(API_URL, colorData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const deleteColor = async (id) => {
    try {
        const response = await api.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
