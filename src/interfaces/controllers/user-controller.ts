import { UserService } from "../../infrastructure/services/user-service";
import { SaveUser } from "../../application/use-cases/user/save";
import { UpdateUser } from "../../application/use-cases/user/update";
import { FindUser } from "../../application/use-cases/user/find";
import { User } from "../../domain/entities/user";
import { Request, Response } from "express";
import passwordEncryption from "../helpers/password-encryption";

const userService = new UserService();
const saveUser = new SaveUser(userService);
const updateUser = new UpdateUser(userService);
const findUser = new FindUser(userService);

export class UserController {
  constructor() {
    this.save = this.save.bind(this);
    this.update = this.update.bind(this);
    this.find = this.find.bind(this);
  }

  handleError(error: Error, status?: number) {
    const errorMessage = (error as Error).message;
    const json = { error: true, message: errorMessage, code: status };

    return { status: status ?? 500, json };
  }

  handleEncryptionError() {
    const message = "Error al encriptar la contraseña";
    const { json, status } = this.handleError(new Error(message));

    return { json, status };
  }

  async save(req: Request, res: Response): Promise<void> {
    try {
      const user = req.body as User;
      const encryptedPassword = await passwordEncryption(user.password);

      if (!encryptedPassword) {
        const { json, status } = this.handleEncryptionError();
        res.status(status).json(json);
        return;
      }

      const securedUser = { ...user, password: encryptedPassword };
      const newUser = await saveUser.execute(securedUser);

      res.status(200).json(newUser);
    } catch (error) {
      const { status, json } = this.handleError(error as Error);
      res.status(status).json(json);
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const user = req.body;
      const encryptedPassword = await passwordEncryption(user.password);

      if (!encryptedPassword) {
        const { json, status } = this.handleEncryptionError();
        res.status(status).json(json);
        return;
      }

      const securedUser = { ...user, password: encryptedPassword };
      const updatedUser = await updateUser.execute(securedUser);

      res.status(200).json(updatedUser);
    } catch (error) {
      const { status, json } = this.handleError(error as Error);
      res.status(status).json(json);
    }
  }

  async find(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const findedUser = await findUser.execute({ email, password });

      if (!findedUser) {
        const message = "Usuario o contraseña incorrectos";
        const { status, json } = this.handleError(new Error(message), 200);
        res.status(status).json(json);
      }

      res.status(200).json(findedUser);
    } catch (error: any) {
      const message = error.message;

      const checkMessage =
        message === "Email incorrecto" || message === "Contraseña incorrecta";

      if (checkMessage) {
        const { status, json } = this.handleError(error as Error, 200);
        res.status(status).json(json);
        return;
      }

      const { status, json } = this.handleError(error as Error, 500);
      res.status(status).json(json);
    }
  }
}
