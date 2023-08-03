import { Request, Response } from 'express';
import { User } from '../models/User';
import { UserRepo } from '../repository/User';

class UserController {
  async create(req: Request, res: Response) {
    try {
      const newUser = new User();
      newUser.name = req.body.name;
      newUser.email = req.body.email;
      newUser.password = req.body.password;

      await new UserRepo().save(newUser);

      res.status(201).json({
        status: 'Created!',
        message: 'User has been created successfully!',
      });
    } catch (err) {
      res.status(500).json({
        status: 'Internal Server Error!',
        message: 'Internal Server Error!',
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      let id = req.params['id'];
      await new UserRepo().delete(id);
      res.status(200).json({
        message: 'User has been successfully deleted!',
      });
    } catch (err) {
      res.status(500).json({
        status: 'Internal Server Error!',
        message: 'Internal Server Error!',
      });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      let id = req.params['id'];
      const user = await new UserRepo().getById(id);
      res.status(200).json({
        data: user,
      });
    } catch (err) {
      res.status(500).json({
        status: 'Internal Server Error!',
        message: 'Internal Server Error!',
      });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const { limit = 10, offset = 0 } = req.query;
      const users = await new UserRepo().getAll({
        limit: Number(limit),
        offset: Number(offset),
      });
      res.status(200).json({
        users,
      });
    } catch (err) {
      res.status(500).json({
        status: 'Internal Server Error!',
        message: 'Internal Server Error!',
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      let id = req.params['id'];
      const payload = new User();

      payload.id = id;
      payload.name = req.body.name;
      payload.email = req.body.email;
      payload.password = req.body.password;

      await new UserRepo().update(payload);

      res.status(200).json({
        message: 'Successfully updated user data!',
      });
    } catch (err) {
      res.status(500).json({
        status: 'Internal Server Error!',
        message: 'Internal Server Error!',
      });
    }
  }
}

export default new UserController();
