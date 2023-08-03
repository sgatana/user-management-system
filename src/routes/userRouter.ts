import UserController from '../controllers/userController';
import validate from '../helpers/validate';
import { createUserSchema, updateUserSchema } from '../schemas/UserSchema';
import BaseRoutes from './baseRouter';

class UserRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post("/", validate(createUserSchema), UserController.create);
    this.router.patch(
      "/:id",
      validate(updateUserSchema),
      UserController.update
    );
    this.router.delete("/:id", UserController.delete);
    this.router.get("/", UserController.findAll);
    this.router.get("/:id", UserController.findById);
  }
}

export default new UserRoutes().router