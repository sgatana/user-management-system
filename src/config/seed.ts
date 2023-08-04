import bcrypt from 'bcrypt';
import { User } from '../models/User';
export const seedData = async () => {
  const salt = await bcrypt.genSalt();
  try {
    const hashedPassword = await bcrypt.hash('admin', salt);
    const adminData = {
      name: 'admin',
      email: 'admin@gmail.com',
      password: hashedPassword,
    };

    await User.findOrCreate({
      where: { email: adminData.email },
      defaults: adminData,
    });
  } catch (error: any) {
    console.error('❌ Unable to seed data', error);
  }
};
