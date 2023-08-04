import { errorHandler } from '../helpers/errorHanlder';
import authService, { ILogin } from '../services/authService';
import { Body, Post, Route } from 'tsoa';

@Route('api/v1/auth/login')
class AuthController {
  @Post('/')
  async login(@Body() loginPayload: ILogin) {
    try {
      const user = await authService.login(loginPayload);
      return {
        status: 200,
        response: user,
      };
    } catch (error) {
      return errorHandler(error);
    }
  }
}

export default new AuthController();
