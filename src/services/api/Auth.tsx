/* eslint-disable import/no-extraneous-dependencies */
import axios, { AxiosError } from 'axios';
import jwt from 'jsonwebtoken';
import { ROLE, User, userConstructor } from '../../models/user';
import { AuthService } from '../AuthService';

export class AuthAPI {
  url = process.env.NEXT_PUBLIC_LOGIN_PORTAL_URL || '';

  login = async (username: string, password: string): Promise<string> => {
    try {
      const { status, data } = await axios.post(this.url, { username, password });

      const token = data.access_token;
      const user: User = userConstructor(jwt.decode(token));
      console.log(user);
      if (user.privileges.some(p => p.roles.includes(ROLE.ADMIN))) {
        await AuthService.login(token);
        await localStorage.setItem('user', JSON.stringify(user));
        return 'Success';
      }
      return 'Access denied';
    }
    catch (error) {

      if (error instanceof AxiosError) {
        return error.response?.data.message;
      }
      return 'Unkown error';
    }

  };

}
