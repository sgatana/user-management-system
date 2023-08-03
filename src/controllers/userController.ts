import { IUser, PaginationParams, UserService } from '../services/userService';
import { Body, Delete, Get, Patch, Path, Post, Query, Route } from 'tsoa';

@Route('api/v1/users')
class UserController {
  @Post('/')
  async create(@Body() user: IUser) {
    try {
      const newUser = {
        name: user.name,
        email: user.email,
        password: user.password,
      };

      await new UserService().save(newUser);

      return {
        status: 201,
        response: { message: 'User has been created successfully!' },
      };
    } catch (error) {
      let response = { message: 'Internal server error' };
      if (error instanceof Error)
        response = {
          message: error.message,
        };
      return {
        status: 500,
        response,
      };
    }
  }


  @Get('/')
  async findAll(@Query() limit = 10, @Query() offset = 0) {
    try {
      const users = await new UserService().getAll({
        limit,
        offset,
      });
      return {
        status: 200,
        response: users,
      };
    } catch (error) {
      let response = { message: 'Internal server error' };
      if (error instanceof Error)
        response = {
          message: error.message,
        };
      return {
        status: 500,
        response,
      };
    }
  }

  @Get('/:id')
  async findById(@Path() id: string) {
    try {
      const user = await new UserService().getById(id);
      return {
        status: 200,
        response: user,
      };
    } catch (error) {
      let response = { message: 'Internal server error' };
      if (error instanceof Error)
        response = {
          message: error.message,
        };
      return {
        status: 500,
        response,
      };
    }
  }

  @Patch('/:id')
  async update(@Path() id: string, @Body() user: IUser) {
    try {
      await new UserService().update({
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
      let response = { message: 'Internal server error' };
      if (error instanceof Error)
        response = {
          message: error.message,
        };
      return {
        status: 500,
        response,
      };
    }
  }

  @Delete('/:id')
  async delete(@Path() id: string) {
    try {
      await new UserService().delete(id);
      return {
        status: 200,
        message: 'User has been successfully deleted!',
      };
    } catch (error) {
      let response = { message: 'Internal server error' };
      if (error instanceof Error)
        response = {
          message: error.message,
        };
      return {
        status: 500,
        response,
      };
    }
  }
}

export default new UserController();
