import api from "./api";

/**
 * Fetch all products from the backend.
 * @param {AbortSignal} signal - Optional abort signal
 * @returns {Promise<Array>} List of products
 */
export const getProducts = async (signal) => {
    try {
        const response = await api.get("/products", { signal });
        console.log("Products Fetch Response:", response.data);
        return response.data;
    } catch (error) {
        if (error.name === 'CanceledError' || error.name === 'AbortError') {
            return null;
        }
        throw error;
    }
};

/**
 * Fetch a single product by SLUG.
 * @param {string} slug - Product Slug
 * @returns {Promise<Object>} Product details
 */
export const getProductBySlug = async (slug) => {
    try {
        const response = await api.get(`/products/${slug}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Update an existing product.
 * @param {string} id - Product ID
 * @param {FormData} formData - Multipart form data
 * @returns {Promise<Object>} Response data
 */
export const updateProduct = async (id, formData) => {
    try {
        const response = await api.put(`/products/update/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Delete a product by ID.
 * @param {string} id - Product ID
 * @returns {Promise<Object>} Response data
 */
export const deleteProduct = async (id) => {
    try {
        const response = await api.delete(`/products/delete/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
