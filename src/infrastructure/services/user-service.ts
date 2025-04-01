import { User } from "../../domain/entities/user";
import {
  Login,
  UserRepository,
} from "../../domain/repositories/user-repository";
import UserModel from "../database/models/user";
import bcrypt from "bcrypt";

export class UserService implements UserRepository {
  async save(user: User): Promise<any> {
    const condition = { where: { email: user.email } };

    const userExists = await UserModel.findOne(condition);
    if (userExists) throw new Error("User already exists");

    const newUser = await UserModel.create({ ...user, active: true });
    if (!newUser) throw new Error("Error creating user");

    return newUser;
  }

  async update(user: any): Promise<any> {
    const condition = { where: { email: user.email } };

    const userExists = await UserModel.findOne(condition);
    if (!userExists) throw new Error("User not found");

    const updatedUser = await UserModel.update(user, condition);
    if (!updatedUser) throw new Error("Error updating user");

    return user;
  }

  async find(data: Login): Promise<User | undefined> {
    const condition = { where: { email: data.email } };

    const userExists = await UserModel.findOne(condition);
    if (!userExists) throw new Error("Email incorrecto");

    const current = userExists.password;
    const request = data.password;

    const isPasswordValid = await bcrypt.compare(request, current);
    if (!isPasswordValid) throw new Error("Contraseña incorrecta");

    return userExists ?? undefined;
  }
}
