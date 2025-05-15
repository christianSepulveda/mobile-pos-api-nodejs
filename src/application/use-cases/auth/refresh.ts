import { Auth, DeviceInfo } from "../../../domain/entities/auth";
import { AuthRepository } from "../../../domain/repositories/auth-repository";

export class RefreshAuth {
  private authRepository: AuthRepository;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  async execute(
    authToken: string,
    refreshToken: string
  ): Promise<{ authToken: string; refreshToken: string }> {
    if (!authToken || !refreshToken)
      throw new Error("Faltan datos de autenticación para refrescar");

    const refresh = await this.authRepository.refreshToken(
      authToken,
      refreshToken
    );

    return refresh;
  }
}
