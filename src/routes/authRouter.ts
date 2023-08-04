import { Request, Response } from 'express';
import authController from '../controllers/authController';
import validate from '../helpers/validate';
import BaseRoutes from './baseRouter';
import { loginSchema } from '../schemas/authSchema';

class AuthRouter extends BaseRoutes {
  public routes(): void {
    this.router.post(
      '/login',
      validate(loginSchema),
      async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const { status, response } = await authController.login({
          email,
          password,
        });
        res.status(status).json(response);
      }
    );

  }
}

export default new AuthRouter().router;
