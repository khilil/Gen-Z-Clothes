import api from './api';

// Get low stock products
export const getLowStockProducts = async () => {
    try {
        const response = await api.get('/inventory/low-stock');
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

// Update variant stock
export const updateVariantStock = async (productId, variantId, stock) => {
    try {
        const response = await api.put(`/inventory/${productId}/${variantId}`, { stock });
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

// Bulk update stock
export const bulkUpdateStock = async (productId, updates) => {
    try {
        const response = await api.put(`/inventory/bulk/${productId}`, { updates });
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};
