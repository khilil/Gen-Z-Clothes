import api from './api';

/**
 * 🛒 Get User Cart
 */
export const getCart = async () => {
    try {
        const response = await api.get('/cart');
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

/**
 * ➕ Add Item to Cart
 */
export const addToCart = async (productId, variantId, quantity) => {
    try {
        const response = await api.post('/cart/add', { productId, variantId, quantity });
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

/**
 * 🔄 Update Cart Item
 */
export const updateCartItem = async (productId, variantId, quantity) => {
    try {
        const response = await api.put('/cart/update', { productId, variantId, quantity });
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

/**
 * ❌ Remove Item from Cart
 */
export const removeFromCart = async (itemId) => {
    try {
        const response = await api.delete(`/cart/remove/${itemId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};
