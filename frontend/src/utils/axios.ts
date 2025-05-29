import axios from 'axios'
import { useAuthStore } from '../store/useAuthStore';

const BASE_API_URL = import.meta.env.VITE_API_URL

const axiosInstance = axios.create({
    baseURL: BASE_API_URL,
    withCredentials: true,
})


// Response interceptor for 401 errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const { logout } = useAuthStore.getState();
      logout();
    }
    return Promise.reject(error);
  }
);

export { axiosInstance }
