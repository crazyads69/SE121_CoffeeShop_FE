/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable func-names */
import axios from "axios";

const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Add a request interceptor
axiosClient.interceptors.request.use((config) => {
    // Get token from local storage
    const token = localStorage.getItem("ACCESS_TOKEN");
    // If token exists, set Authorization header else remove it
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        delete config.headers.Authorization;
    }
    return config;
});

// Add a response interceptor
axiosClient.interceptors.response.use(
    (response) => {
        // If the request succeeds, we don't have to do anything and just return the response
        return response;
    },
    (error) => {
        // If the request fails, we can check if the error is due to token expiration
        if (error.response.status === 429) {
            // Get retry-after header
            const retryAfter = error.response.headers["retry-after"] || 1;
            // Retry after the given time
            return new Promise((resolve) => {
                setTimeout(() => resolve(axiosClient(error.config)), retryAfter * 1000);
            });
        }
        if (error.response.status === 401) {
            // Remove token from local storage
            localStorage.removeItem("ACCESS_TOKEN");
        } else throw error;
    },
);

export default axiosClient;
