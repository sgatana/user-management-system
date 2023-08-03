import express, { Application, Response } from 'express';
import Database from './config/database';
import UserRouter from './routes/userRouter';

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

  protected routes(): void {
    this.app.route('/').get((_, res: Response) => {
      res.status(200).json({
        status: "OK",
        message: "Users API is running"
      });
    });
    this.app.use("/api/v1/users", UserRouter);
  }

  constructor() {
    this.app = express();
    this.databaseSync();
    this.initializePlugins();
    this.routes();
  }
}

const port: number = (process.env.PORT as unknown as number) || 8000;
const app = new App().app;
app.listen(port, () => {
  console.log(`✅ Server started successfully on http://localhost:${port}`);
});
