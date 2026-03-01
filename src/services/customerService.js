import api from './api';

/**
 * 👑 Admin: Get All Customers
 */
export const getAllCustomers = async () => {
    try {
        const response = await api.get('/customers');
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

/**
 * 👑 Admin: Get Customer Detail & Order History
 */
export const getCustomerDetail = async (customerId) => {
    try {
        const response = await api.get(`/customers/${customerId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};
