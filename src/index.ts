import express, { Application, Request, Response } from 'express';
import { setup, serve } from 'swagger-ui-express';
import * as dotenv from 'dotenv';

import Database from './config/database';
import userRouter from './routes/userRouter';
import authRouter from './routes/authRouter';
import { authenticationMiddleware } from './helpers/auth';

dotenv.config();
class App {
  public app: Application;

  protected databaseSync(): void {
    const db = new Database();
    db.sequelize?.sync();
  }
  protected initializePlugins(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  protected initializeSwagger(): void {
    this.app.use(express.static('public'));
    this.app.use(
      '/docs',
      serve,
      setup(undefined, {
        explorer: true,
        swaggerOptions: {
          url: '/swagger.json',
        },
      })
    );
  }

  protected routes(): void {
    this.app.route('/').get((_, res: Response) => {
      res.status(200).json({
        status: 'OK',
        message: 'Users API is running',
      });
    });
    this.app.use('/api/v1/auth', authRouter);
    this.app.use('/api/v1/users', authenticationMiddleware, userRouter);
  }

  constructor() {
    this.app = express();
    this.databaseSync();
    this.initializePlugins();
    this.routes();
    this.initializeSwagger();
  }
}

const port: number = (process.env.PORT as unknown as number) || 8000;
const app = new App().app;
app.listen(port, () => {
  console.log(`✅ Server started successfully on http://localhost:${port}`);
});
