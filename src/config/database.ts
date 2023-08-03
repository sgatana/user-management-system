import { Sequelize } from 'sequelize-typescript';
import * as dotenv from 'dotenv';
import { User } from '../models/User';
dotenv.config();

export default class Database {
  public sequelize: Sequelize | undefined;

  private DB_NAME = process.env.POSTGRES_DB as string;
  private DB_HOST = process.env.DB_HOST as string;
  private DB_PORT = process.env.DB_PORT as unknown as number;
  private DB_USER = process.env.DB_USER as unknown as string;
  private DB_PASSWORD = process.env.DB_PASSWORD as unknown as string;

  private async connectToDatabase() {
    this.sequelize = new Sequelize({
      database: this.DB_NAME,
      username: this.DB_USER,
      password: this.DB_PASSWORD,
      host: this.DB_HOST,
      port: this.DB_PORT,
      dialect: 'postgres',
      models: [User],
      logging: true,
    });
    try {
      await this.sequelize.authenticate();
      console.log('✅ Connection has been established successfully.');
    } catch (error) {
      console.error('❌ Unable to connect to the database:', error);
    }
  }

  constructor() {
    this.connectToDatabase();
  }
}