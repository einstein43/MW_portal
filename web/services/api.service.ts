import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { AuthService } from './auth.service';

// Ensure the URL doesn't have a trailing slash to prevent double slashes in requests
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002/api';

// Create axios instance with base URL
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add auth token to all requests
apiClient.interceptors.request.use(
  (config) => {
    const token = AuthService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('Making API request to:', `${config.baseURL}/${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle auth errors
apiClient.interceptors.response.use(
  (response) => {
    console.log('API response received:', response.status);
    return response;
  },
  (error) => {
    // Don't redirect to login if the request was canceled
    if (axios.isCancel(error)) {
      return Promise.reject(error);
    }
    
     
    
    // Handle 401 Unauthorized or 403 Forbidden responses
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      // Logout and redirect to login page if we're in a browser environment
      if (typeof window !== 'undefined') {
        AuthService.logout();
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const ApiService = {
  get: <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return apiClient.get<T>(url, config);
  },

  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return apiClient.post<T>(url, data, config);
  },

  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return apiClient.put<T>(url, data, config);
  },

  delete: <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return apiClient.delete<T>(url, config);
  }
};