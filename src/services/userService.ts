import bcrypt from 'bcrypt';

import { User } from '../models/User';
export interface IUser {
  id?: string;
  name: string;
  password: string;
  email: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface IUserResponse {
  id?: string;
  name: string;
  email: string;
  created_at?: Date;
  updated_at?: Date;
}

export type PaginationParams = {
  limit: number;
  offset: number;
};

interface IUserService {
  save(user: IUser): Promise<void>;
  update(user: IUser): Promise<void>;
  delete(userId: string): Promise<void>;
  getById(userId: string): Promise<IUserResponse>;
  getAll({ limit, offset }: PaginationParams): Promise<IUserResponse[]>;
}

class UserService implements IUserService {
  async save(user: IUser): Promise<void> {
    const salt = await bcrypt.genSalt();
    try {
      const { name, email, password } = user;
      const existingUser = await User.findOne({ where: { email } });
      if(existingUser) throw {message: 'User with provided email already exist', status: 400}
      const hashedPassword = await bcrypt.hash(password, salt);
      await User.create({
        name,
        email,
        password: hashedPassword,
      });
    } catch (error: any) {
      throw { message: error?.message ?? error, status: error?.status };
    }
  }

  async getById(userId: string): Promise<IUserResponse> {
    try {
      const user = await User.findOne({
        where: {
          id: userId,
        },
        attributes: {
          exclude: ['password'],
        },
      });
      if (!user) {
        throw { message: 'User not found!', status: 404 };
      }
      return user;
    } catch (error: any) {
      throw { message: error?.message ?? error, status: error?.status };
    }
  }
  async getAll({ limit, offset }: PaginationParams): Promise<IUserResponse[]> {
    try {
      return await User.findAll({
        limit,
        offset,
        where: {},
        attributes: {
          exclude: ['password'],
        },
      });
    } catch (error: any) {
      throw { message: error?.message ?? error, status: error?.status };
    }
  }

  async update(user: Partial<IUser>): Promise<void> {
    const { id, name, email, password } = user;
    try {
      const existingUser = await User.findOne({
        where: {
          id,
        },
      });
      if (!existingUser) {
        throw { message: 'User not found!', status: 404 };
      }
      existingUser.name = name ?? existingUser.name;
      existingUser.email = email ?? existingUser.email;
      existingUser.password = password ?? existingUser.password;

      await existingUser.save();
    } catch (error: any) {
      throw { message: error?.message ?? error, status: error?.status };
    }
  }
  async delete(userId: string): Promise<void> {
    try {
      const existingUser = await User.findOne({
        where: {
          id: userId,
        },
      });
      if (!existingUser) {
        throw { message: 'User not found!', status: 404 };
      }

      await existingUser.destroy();
    } catch (error: any) {
      throw { message: error?.message ?? error, status: error?.status };
    }
  }
}
export default new UserService();
