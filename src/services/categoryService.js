import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1/categories';

export const getAllCategories = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const createCategory = async (categoryData) => {
    try {
        const response = await axios.post(API_URL, categoryData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const updateCategory = async (id, categoryData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, categoryData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const deleteCategory = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
