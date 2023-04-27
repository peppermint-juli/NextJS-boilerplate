// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable import/no-extraneous-dependencies */
import axios, { AxiosError } from 'axios';
import jwt from 'jsonwebtoken';
import { Role, User } from '../../graphql/typings';
import { userConstructor } from '../../models/user';
import { AuthService } from '../AuthService';

export class AuthAPI {
  url = process.env.NEXT_PUBLIC_LOGIN_PORTAL_URL || '';

  login = async (username: string, password: string): Promise<string> => {
    try {
      const { data } = await axios.post(this.url, { username, password });

      const token = data.access_token;
      const user: User = userConstructor(jwt.decode(token));

      if (user.privileges.some(p => p.roles.includes(Role.Admin || Role.Sysadmin))) {
        console.log(token);

        await AuthService.login(token);

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
