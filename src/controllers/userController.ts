import { errorHandler } from '../helpers/errorHanlder';
import userService, { IUser } from '../services/userService';
import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Path,
  Post,
  Query,
  Route,
} from 'tsoa';

@Route('api/v1/users')
class UserController extends Controller {
  @Post('/')
  async create(@Body() user: IUser) {
    try {
      const newUser = {
        name: user.name,
        email: user.email,
        password: user.password,
      };
      if (user.id) {
        Object.assign(newUser, { id: user.id });
      }
      await userService.save(newUser);

      return {
        status: 201,
        response: { message: 'User has been created successfully!' },
      };
    } catch (error) {
      return errorHandler(error);
    }
  }

  @Get('/')
  async findAll(@Query() limit = 10, @Query() offset = 0) {
    try {
      const users = await userService.getAll({
        limit,
        offset,
      });
      return {
        status: 200,
        response: users,
      };
    } catch (error) {
      return errorHandler(error);
    }
  }

  @Get('/:id')
  async findById(@Path() id: string) {
    try {
      const user = await userService.getById(id);
      return {
        status: 200,
        response: user,
      };
    } catch (error) {
      return errorHandler(error);
    }
  }

  @Patch('/:id')
  async update(@Path() id: string, @Body() user: IUser) {
    try {
      await userService.update({
        ...user,
        id,
      });

      return {
        status: 200,
        response: {
          message: 'Successfully updated user data!',
        },
      };
    } catch (error) {
      return errorHandler(error);
    }
  }

  @Delete('/:id')
  async delete(@Path() id: string) {
    try {
      await userService.delete(id);
      return {
        status: 200,
        response: { message: 'User has been successfully deleted!' },
      };
    } catch (error) {
      return errorHandler(error);
    }
  }
}

export default new UserController();
