/*import axios from 'axios';
import { AuthContext } from './AuthContext';
import { useContext } from 'react';

const api = axios.create({
  baseURL: 'http://localhost:5178/api',
  withCredentials: true,
});

const getAccessToken = () => {
  return localStorage.getItem('token');
};

const getRefreshToken = () => {
  return localStorage.getItem('refreshToken');
};

const setAccessToken = (accessToken) => {
  localStorage.setItem('token', accessToken);
};

api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const accessToken = getAccessToken();
        const refreshToken = getRefreshToken();

        if (!accessToken || !refreshToken) {
          throw new Error('Tokens are missing');
        }
        if (!accessToken.includes('.') || !refreshToken.includes('.')) {
          throw new Error('Token is not well-formed');
        }

        const response = await api.post('/account/refresh-token', {
          accessToken,
          refreshToken,
        });

        const { token: newAccessToken } = response.data;
        setAccessToken(newAccessToken);
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        console.error('Refresh token failed', refreshError);
        const { logout } = useContext(AuthContext);
        logout(true);
      }
    }
    console.error('Request failed:', error);
    return Promise.reject(error);
  }
);

export default api;

*/