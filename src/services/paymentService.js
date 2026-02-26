import api from './api';

/**
 * 💳 Create Razorpay Order
 */
export const createRazorpayOrder = async (orderData) => {
    try {
        const response = await api.post('/payment/create-order', orderData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

/**
 * 🛡️ Verify Razorpay Payment
 */
export const verifyRazorpayPayment = async (paymentData) => {
    try {
        const response = await api.post('/payment/verify-payment', paymentData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};
