import axios from 'axios'
import { logout } from '../redux/auth/authSlice';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

// Always set the latest token before each request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth-token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    } else {
      delete config.headers['Authorization'];
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Function to inject store and set up interceptor
export const setupAxiosInterceptors = (store) => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if(error.response && error.response.data.status === 403) {
        console.warn("token expired - redirecting to login page")
        store.dispatch(logout()); 
      }
      return Promise.reject(error);
    }
  )
}

export default axiosInstance;