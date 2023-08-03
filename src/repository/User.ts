import { User } from '../models/User';

type PaginationParams = {
  limit?: number;
  offset?: number;
};

interface IUserRepo {
  save(user: User): Promise<User>;
  update(user: User): Promise<void>;
  delete(userId: string): Promise<void>;
  getById(userId: string): Promise<User>;
  getAll({ limit, offset }: PaginationParams): Promise<User[]>;
}

export class UserRepo implements IUserRepo {
  async save(user: User): Promise<User> {
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

  async getById(userId: string): Promise<User> {
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
  async getAll({ limit, offset }: PaginationParams): Promise<User[]> {
    try {
      return await User.findAll({ limit, offset });
    } catch (error) {
      throw new Error('Failed to retrieve users!');
    }
  }

  async update(user: User): Promise<void> {
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
