import jwt from "jsonwebtoken";

type AuthTokens = {
  authToken: string;
  refreshToken: string;
};

export function CreateAuthTokens(id: string): AuthTokens {
  const secretKey = process.env.JWT_SECRET ?? "";

  const authToken = jwt.sign({ id }, secretKey, {
    expiresIn: "1m",
  });

  const refreshToken = jwt.sign({ id }, secretKey, {
    expiresIn: "5m",
  });

  return {
    authToken,
    refreshToken,
  };
}
