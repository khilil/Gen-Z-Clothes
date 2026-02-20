import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api/v1",
    withCredentials: true, // IMPORTANT (cookies mate)
});

// 🔥 Auto refresh on 401
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            try {
                await axios.post(
                    "http://localhost:5000/api/v1/users/refresh-token",
                    {},
                    { withCredentials: true }
                );
                return api(error.config); // retry original request
            } catch (err) {
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    }
);

export default api;