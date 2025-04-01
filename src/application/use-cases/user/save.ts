import { randomUUID } from "crypto";
import { User } from "../../../domain/entities/user";
import { UserService } from "../../../infrastructure/services/user-service";

export class SaveUser {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async execute(user: User): Promise<User> {
    const id = randomUUID();
    const newUser = await this.userService.save({ id, ...user });
    return newUser;
  }
}
