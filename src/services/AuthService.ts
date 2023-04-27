import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../utils/keys';

export const AuthService = {
  getToken(): string {
    return Cookies.get(ACCESS_TOKEN_KEY) || '';
  },

  isAuthenticated(): boolean {
    return Cookies.get(ACCESS_TOKEN_KEY) != null;
  },

  async login(token: string) {
    Cookies.set(ACCESS_TOKEN_KEY, token);
  },

  async logout() {
    Cookies.remove(ACCESS_TOKEN_KEY);
  }

};
