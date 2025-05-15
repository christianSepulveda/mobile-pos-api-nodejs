import { Auth, DeviceInfo } from "../entities/auth";

export interface AuthRepository {
  createAuth(device: DeviceInfo, userid: string): Promise<Auth>;
  updateAuth(auht: Auth): Promise<boolean>;
  refreshToken(
    authToken: string,
    refreshToken: string
  ): Promise<{ authToken: string; refreshToken: string }>;
}
