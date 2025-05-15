import AuthModel from "../database/models/auth";

import { randomUUID } from "crypto";
import { Auth, DeviceInfo } from "../../domain/entities/auth";
import { AuthRepository } from "../../domain/repositories/auth-repository";
import { CreateAuthTokens } from "../../interfaces/helpers/create-auth-tokens";

import jwt, { JwtPayload } from "jsonwebtoken";
import moment from "moment";

export class AuthService implements AuthRepository {
  async createAuth(device: DeviceInfo, userid: string): Promise<Auth> {
    const { authToken, refreshToken } = CreateAuthTokens(userid);

    const auth: Auth = {
      id: randomUUID(),
      userid,
      authtoken: authToken,
      refreshtoken: refreshToken,
      deviceinfo: JSON.stringify(device),
      active: true,
    };

    const createAuth = await AuthModel.create(auth);
    return createAuth.dataValues;
  }

  async updateAuth(auth: Auth): Promise<boolean> {
    const condition = { where: { id: auth.id } };

    const findAuth = await AuthModel.findOne(condition);
    if (!findAuth) throw new Error("No se encontró el refresh token");

    const updatedAuth = await AuthModel.update(auth, condition);
    if (!updatedAuth) throw new Error("No se pudo actualizar el refresh token");

    return true;
  }

  async refreshToken(
    authToken: string,
    refreshToken: string
  ): Promise<{ authToken: string; refreshToken: string }> {
    const secretKey = process.env.JWT_SECRET ?? "";

    const verifyAuthToken = jwt.verify(authToken, secretKey) as JwtPayload;
    if (!verifyAuthToken || !verifyAuthToken.exp)
      throw new Error("AuthToken inválido");

    const verifyRefrToken = jwt.verify(refreshToken, secretKey) as JwtPayload;
    if (!verifyRefrToken || !verifyRefrToken.exp)
      throw new Error("RefreshToken inválido");

    const authTokenExpired = moment
      .unix(verifyAuthToken.exp)
      .isBefore(moment());

    const refreshTokenExpired = moment
      .unix(verifyRefrToken.exp)
      .isBefore(moment());

    if (authTokenExpired && refreshTokenExpired)
      throw new Error("Token expirado.");

    if (authTokenExpired && !refreshTokenExpired) {
      const { userid } = verifyRefrToken;
      const tokens = CreateAuthTokens(userid);

      return tokens;
    }

    if (!authTokenExpired && refreshTokenExpired) {
      const { userid } = verifyRefrToken;
      const tokens = CreateAuthTokens(userid);

      return { authToken: tokens.authToken, refreshToken };
    }

    return { authToken, refreshToken };
  }
}
