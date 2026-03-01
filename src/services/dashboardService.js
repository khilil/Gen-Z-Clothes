import api from './api';

/**
 * 👑 Admin: Get Dashboard Statistics
 */
export const getDashboardStats = async () => {
    try {
        const response = await api.get('/dashboard/stats');
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};
