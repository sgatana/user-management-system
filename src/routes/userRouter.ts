import { Request, Response } from 'express';
import userController from '../controllers/userController';
import validate from '../helpers/validate';
import { createUserSchema, updateUserSchema } from '../schemas/userSchema';
import BaseRoutes from './baseRouter';

class UserRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post(
      '/',
      validate(createUserSchema),
      async (req: Request, res: Response) => {
        const { name, email, password } = req.body;
        const { status, response } = await userController.create({
          name,
          email,
          password,
        });
        res.status(status).json(response);
      }
    );

    this.router.get('/', async (req: Request, res: Response) => {
      const { limit = 10, offset = 0 } = req.query;
      const { status, response } = await userController.findAll(
        Number(limit),
        Number(offset)
      );
      res.status(status).json(response);
    });

    this.router.get('/:id', async (req: Request, res: Response) => {
      const id = req.params['id'];
      const { status, response } = await userController.findById(id);
      res.status(status).json(response);
    });

    this.router.patch(
      '/:id',
      validate(updateUserSchema),
      async (req: Request, res: Response) => {
        const id = req.params['id'];
        const { status, response } = await userController.update(id, {
          ...req.body,
        });
        res.status(status).json(response);
      }
    );

    this.router.delete('/:id', async (req: Request, res: Response) => {
      const id = req.params['id'];
      const { status, response } = await userController.delete(id);
      res.status(status).json(response);
    });
  }
}

export default new UserRoutes().router;
