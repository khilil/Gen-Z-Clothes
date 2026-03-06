import api from "../../services/api";

export const loginAPI = async (data) => {
    const response = await api.post("/users/login", data);
    return response.data;
};

export const registerAPI = async (data) => {
    const response = await api.post("/users/register", data);
    return response.data;
};

export const getCurrentUserAPI = async () => {
    const response = await api.get("/users/current-user");
    return response.data;
};

export const logoutAPI = async (data) => {
    const response = await api.post("/users/logout", data);
    return response.data;
};

export const googleLoginAPI = async (credential) => {
    const response = await api.post("/users/google-login", { credential });
    return response.data;
};

export const addAddressAPI = async (data) => {
    const response = await api.post("/users/addresses", data);
    return response.data;
};

export const updateAddressAPI = async (addressId, data) => {
    const response = await api.put(`/users/address/${addressId}`, data);
    return response.data;
};

export const deleteAddressAPI = async (addressId) => {
    const response = await api.delete(`/users/address/${addressId}`);
    return response.data;
};

export const forgotPasswordAPI = async (email) => {
    const response = await api.post("/users/forgot-password", { email });
    return response.data;
};

export const resetPasswordAPI = async (token, password) => {
    const response = await api.post(`/users/reset-password/${token}`, { password });
    return response.data;
};