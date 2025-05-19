import api from '../utils/api';
import { AuthResponse, LoginRequest, RegisterRequest } from '../types';

export const authService = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', data);
    // Save the token and user data to localStorage
    localStorage.setItem('token', response.data.access_token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    return response.data;
  },
  
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', data);
    // Save the token and user data to localStorage
    localStorage.setItem('token', response.data.access_token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    return response.data;
  },
  
  logout: (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  
  getCurrentUser: (): { user: any; isAuthenticated: boolean } => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (!token || !userStr) {
      return { user: null, isAuthenticated: false };
    }
    
    try {
      const user = JSON.parse(userStr);
      return { user, isAuthenticated: true };
    } catch (error) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      return { user: null, isAuthenticated: false };
    }
  },
};
