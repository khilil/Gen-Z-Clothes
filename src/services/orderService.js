import api from './api';

/**
 * 📦 Direct Buy (Buy Now)
 */
export const directBuy = async (orderData) => {
    try {
        const response = await api.post('/orders/direct', orderData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

/**
 * 🛒 Cart Checkout
 */
export const cartCheckout = async (checkoutData) => {
    try {
        const response = await api.post('/orders/checkout', checkoutData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

/**
 * 👤 Get User Orders
 */
export const getMyOrders = async () => {
    try {
        const response = await api.get('/orders/my-orders');
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

/**
 * ❌ Cancel Order
 */
export const cancelOrder = async (orderId) => {
    try {
        const response = await api.put(`/orders/cancel/${orderId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

/**
 * 👑 Admin: Get All Orders
 */
export const getAllAdminOrders = async () => {
    try {
        const response = await api.get('/orders/admin/all');
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

/**
 * 👑 Admin: Update Order Status
 */
export const updateOrderStatus = async (orderId, status) => {
    try {
        const response = await api.put(`/orders/admin/status/${orderId}`, { status });
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};
