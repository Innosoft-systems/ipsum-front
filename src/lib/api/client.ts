import axios from 'axios';
export const baseURL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api';
export const api = axios.create({ baseURL, timeout: 12000 });
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = sessionStorage.getItem('ipsum_access_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original?._retry && typeof window !== 'undefined') {
      const refreshToken = sessionStorage.getItem('ipsum_refresh_token');
      if (refreshToken) {
        original._retry = true;
        try {
          const { data } = await axios.post(`${baseURL}/auth/refresh`, { refreshToken });
          const payload = data.data;
          sessionStorage.setItem('ipsum_access_token', payload.accessToken);
          sessionStorage.setItem('ipsum_refresh_token', payload.refreshToken);
          original.headers.Authorization = `Bearer ${payload.accessToken}`;
          return api(original);
        } catch {
          sessionStorage.clear();
          window.location.href = '/admin/login';
        }
      }
    }
    return Promise.reject(error);
  },
);
