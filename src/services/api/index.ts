import { AuthAPI } from './Auth';

class API {
  auth = new AuthAPI();
}

export const api = new API();
