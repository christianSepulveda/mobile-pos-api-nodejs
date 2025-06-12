import { Request, Response, NextFunction } from "express";
import { verifyAuthToken } from "../helpers/token-handler";
import { BuildResponse } from "../helpers/build-response";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    BuildResponse.authError(
      res,
      new Error("No token provided or invalid format")
    );
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyAuthToken(token);
    (req as any).user = decoded;
    next();
  } catch (err) {
    console.log(err);
    BuildResponse.authError(res, new Error("Invalid token"));
    return;
  }
}
