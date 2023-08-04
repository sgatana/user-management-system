import { generateAccessToken } from './../helpers/auth';
import bcrypt from 'bcrypt';

import { User } from '../models/User';

export interface ILogin {
  password: string;
  email: string;
}
export interface ILoginResponse {
  name: string;
  accessToken: string;
  email: string;
}

export type PaginationParams = {
  limit: number;
  offset: number;
};

interface IAuthService {
  login(payload: ILogin): Promise<ILoginResponse>;
}

class AuthService implements IAuthService {
  async login(loginPayload: ILogin): Promise<ILoginResponse> {
    try {
      const { email, password } = loginPayload;
      const user = await User.findOne({
        where: {
          email,
        },
      });
      if (!user) {
        throw { message: 'unable to sign in', status: 401 };
      }
      const isMatchingPassword = await bcrypt.compare(password, user.password);
      if (!isMatchingPassword) {
        throw { message: 'Invalid password', status: 403 };
      }
      const accessToken = generateAccessToken({ email, name: user.name });

      return {
        email,
        name: user.name,
        accessToken,
      };
    } catch (error: any) {
      throw { message: error?.message ?? error, status: error?.status };
    }
  }
}
export default new AuthService();
