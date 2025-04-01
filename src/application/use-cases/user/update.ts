import { User } from "../../../domain/entities/user";
import { UserService } from "../../../infrastructure/services/user-service";

export class UpdateUser {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async execute(user: User): Promise<User> {
    const updatedUser = await this.userService.update(user);
    return updatedUser;
  }
}
