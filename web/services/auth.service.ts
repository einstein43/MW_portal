import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3003/api';

export interface LoginCredentials {
  email: string;  // Changed from 'username' to 'email' to match the backend API
  password: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: User;
}

export class AuthService {
  static TOKEN_KEY = 'auth-token';
  static USER_KEY = 'auth-user';

  static async login(credentials: LoginCredentials): Promise<User | null> {
    try {
      const response = await axios.post<LoginResponse>(`${API_URL}/users/login`, credentials);
      
      if (response.data.token) {
        // Store token and user in localStorage
        localStorage.setItem(this.TOKEN_KEY, response.data.token);
        localStorage.setItem(this.USER_KEY, JSON.stringify(response.data.user));
        
        return response.data.user;
      }
      
      return null;
    } catch (error) {
      console.error('Login error:', error);
      return null;
    }
  }

  static logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  static getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.TOKEN_KEY);
    }
    return null;
  }

  static getCurrentUser(): User | null {
    if (typeof window !== 'undefined') {
      const userJson = localStorage.getItem(this.USER_KEY);
      if (userJson) {
        return JSON.parse(userJson);
      }
    }
    return null;
  }

  static isAuthenticated(): boolean {
    return !!this.getToken();
  }
}