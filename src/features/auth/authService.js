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

export const logoutAPI = async () => {
    const response = await api.post("/users/logout");
    return response.data;
};