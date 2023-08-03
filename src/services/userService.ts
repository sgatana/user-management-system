import { User } from '../models/User';

export interface IUser  {
  id?: string;
  name: string;
  password: string;
  email: string;
  created_at?: Date;
  updated_at?: Date;
}

export type PaginationParams = {
  limit: number;
  offset: number;
};

interface IUserService {
  save(user: IUser): Promise<IUser>;
  update(user: IUser): Promise<void>;
  delete(userId: string): Promise<void>;
  getById(userId: string): Promise<IUser>;
  getAll({ limit, offset }: PaginationParams): Promise<IUser[]>;
}

export class UserService implements IUserService {
  async save(user: IUser ): Promise<User> {
    try {
      const { name, email, password } = user;
      return await User.create({
        name,
        email,
        password,
      });
    } catch (error) {
      throw new Error('Failed to create the user!');
    }
  }

  async getById(userId: string): Promise<IUser> {
    try {
      const user = await User.findOne({
        where: {
          id: userId,
        },
      });
      if (!user) {
        throw new Error('User not found!');
      }
      return user;
    } catch (error) {
      throw new Error('Failed to find the user!');
    }
  }
  async getAll({ limit, offset }: PaginationParams): Promise<IUser[]> {
    try {
      return await User.findAll({ limit, offset, where: {} });
    } catch (error) {
      throw new Error('Failed to retrieve users!');
    }
  }

  async update(user: Partial<User>): Promise<void> {
    const { id, name, email, password } = user;
    try {
      const existingUser = await User.findOne({
        where: {
          id,
        },
      });
      if (!existingUser) {
        throw new Error('User not found!');
      }
      existingUser.name = name ?? existingUser.name;
      existingUser.email = email ?? existingUser.email;
      existingUser.password = password ?? existingUser.password;

      await existingUser.save();
    } catch (error) {
      throw new Error('Failed to update the user!');
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
        throw new Error('User not found!');
      }

      await existingUser.destroy();
    } catch (error) {
      throw new Error('Failed to delete the user!');
    }
  }
}
