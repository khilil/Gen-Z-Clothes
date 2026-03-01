import api from './api';

/**
 * 👑 Admin: Get Analytics Data
 */
export const getAnalyticsData = async () => {
    try {
        const response = await api.get('/analytics/data');
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};
