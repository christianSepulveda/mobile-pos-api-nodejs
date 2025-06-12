import { UserService } from "../../infrastructure/services/user-service";
import { SaveUser } from "../../application/use-cases/user/save";
import { UpdateUser } from "../../application/use-cases/user/update";
import { FindUser } from "../../application/use-cases/user/find";
import { User } from "../../domain/entities/user";
import { Request, Response } from "express";
import passwordEncryption from "../helpers/password-encryption";
import { BuildResponse } from "../helpers/build-response";
import {
  generateAuthToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../helpers/token-handler";
import { JsonWebTokenError, JwtPayload, TokenExpiredError } from "jsonwebtoken";
import { Login } from "../../domain/repositories/user-repository";

const userService = new UserService();
const saveUser = new SaveUser(userService);
const updateUser = new UpdateUser(userService);
const findUser = new FindUser(userService);

export class UserController {
  async save(req: Request, res: Response): Promise<void> {
    try {
      const user = req.body as User;
      const encryptedPassword = await passwordEncryption(user.password);

      if (!encryptedPassword) {
        BuildResponse.error(res, new Error("Error al encriptar"));
        return;
      }

      const securedUser = { ...user, password: encryptedPassword };
      const newUser = await saveUser.execute(securedUser);

      BuildResponse.success(res, newUser);
    } catch (error) {
      BuildResponse.error(res, error as Error);
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const user = req.body;
      const encryptedPassword = await passwordEncryption(user.password);

      if (!encryptedPassword) {
        await BuildResponse.error(res, new Error("Error al encriptar"));
        return;
      }

      const securedUser = { ...user, password: encryptedPassword };
      const updatedUser = await updateUser.execute(securedUser);

      BuildResponse.success(res, updatedUser);
    } catch (error) {
      BuildResponse.error(res, error as Error);
    }
  }

  async find(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const foundUser = await findUser.execute({ email, password });

      if (!foundUser) {
        BuildResponse.error(res, new Error("Usuario o contraseña incorrectos"));
        return;
      }

      const payload = { id: foundUser.id, email: foundUser.email };
      const authToken = generateAuthToken(payload);
      const refreshToken = generateRefreshToken(payload);

      const user = { ...foundUser, password: "" };
      const authorization = { authToken, refreshToken };

      BuildResponse.success(res, { user, authorization });
    } catch (error: any) {
      BuildResponse.error(res, error as Error);
    }
  }

  async refreshToken(req: Request, res: Response): Promise<void> {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      BuildResponse.error(res, new Error("No a facilitado un Token"));
      return;
    }

    try {
      const payload = verifyRefreshToken(refreshToken) as JwtPayload & Login;

      const newAuthToken = generateAuthToken({
        id: payload.id,
        email: payload.email,
      });

      res.json({ authToken: newAuthToken });
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        BuildResponse.authError(res, new Error("Token expirado"));
        return;
      }

      if (err instanceof JsonWebTokenError) {
        BuildResponse.authError(res, new Error("Token malformado"));
        return;
      }

      console.error(err);
      BuildResponse.error(res, new Error("Internal server error"));
    }
  }
}
