import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { BuildResponse } from "../helpers/build-response";

export interface JwtPayload {
  exp?: number;
  iat?: number;
}

declare global {
  namespace Express {
    interface Request {
      auth?: JwtPayload;
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  if (!token) {
    BuildResponse.error(res, {
      name: "UnauthorizedError",
      message: "Token no proporcionado.",
    });

    return;
  }

  try {
    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) {
      BuildResponse.error(res, {
        name: "UnauthorizedError",
        message: "Clave secreta no proporcionada.",
      });

      return;
    }

    const decoded = jwt.verify(token, secretKey) as JwtPayload;
    req.auth = decoded;
    next();
  } catch (error: any) {
    BuildResponse.error(res, error);
  }
};
