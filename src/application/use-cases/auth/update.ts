import { Auth, DeviceInfo } from "../../../domain/entities/auth";
import { User } from "../../../domain/entities/user";
import { AuthRepository } from "../../../domain/repositories/auth-repository";

export class UpdateAuth {
  private authRepository: AuthRepository;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  async execute(auth: Auth): Promise<boolean> {
    if (!auth) throw new Error("Se necesita una autenticación para actualizar");

    const updated = await this.authRepository.updateAuth(auth);
    return updated;
  }
}
