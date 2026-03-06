import axios from "axios";

export const API_BASE_URL = `http://${window.location.hostname}:5000/api/v1`;

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true, // IMPORTANT (cookies mate)
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If the error is 401 and not already a retry
        if (error.response?.status === 401 && !originalRequest._retry) {

            // If the request was actually the refresh-token request, then we must bail out
            if (originalRequest.url?.includes("/users/refresh-token")) {
                isRefreshing = false;
                processQueue(error, null);
                // Clear state and redirect to login if we're in the browser and not already on an auth page
                if (typeof window !== "undefined") {
                    const publicPaths = ["/login", "/forgot-password", "/reset-password"];
                    const isPublicPath = publicPaths.some(path => window.location.pathname.startsWith(path));
                    if (!isPublicPath) {
                        window.location.href = "/login";
                    }
                }
                return Promise.reject(error);
            }

            if (isRefreshing) {
                return new Promise(function (resolve, reject) {
                    failedQueue.push({ resolve, reject });
                })
                    .then(() => {
                        return api(originalRequest);
                    })
                    .catch((err) => {
                        return Promise.reject(err);
                    });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            return new Promise(function (resolve, reject) {
                axios
                    .post(
                        `${API_BASE_URL}/users/refresh-token`,
                        {},
                        { withCredentials: true }
                    )
                    .then(() => {
                        processQueue(null);
                        resolve(api(originalRequest));
                    })
                    .catch((err) => {
                        processQueue(err, null);
                        // Redirect to login on refresh token failure if not already on an auth page
                        if (typeof window !== "undefined") {
                            const publicPaths = ["/login", "/forgot-password", "/reset-password"];
                            const isPublicPath = publicPaths.some(path => window.location.pathname.startsWith(path));
                            if (!isPublicPath) {
                                window.location.href = "/login";
                            }
                        }
                        reject(err);
                    })
                    .finally(() => {
                        isRefreshing = false;
                    });
            });
        }

        return Promise.reject(error);
    }
);

export default api;
