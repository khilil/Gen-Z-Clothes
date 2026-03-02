import api, { API_BASE_URL } from './api';

const API_URL = `${API_BASE_URL}/categories`;

export const getAllCategories = async () => {
    try {
        const response = await api.get(API_URL);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const createCategory = async (categoryData) => {
    try {
        const response = await api.post(API_URL, categoryData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const updateCategory = async (id, categoryData) => {
    try {
        const response = await api.put(`${API_URL}/${id}`, categoryData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const deleteCategory = async (id) => {
    try {
        const response = await api.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
