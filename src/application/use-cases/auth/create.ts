import { Auth, DeviceInfo } from "../../../domain/entities/auth";
import { User } from "../../../domain/entities/user";
import { AuthRepository } from "../../../domain/repositories/auth-repository";

export class CreateAuth {
  private authRepository: AuthRepository;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  async execute(device: DeviceInfo, userid: string): Promise<Auth> {
    const message =
      "Se necesita la informacion del dispositivo generar la autenticacion";
    if (!device) throw new Error(message);
    if (!userid) throw new Error("Se necesita el id del usuario");

    const createAuth = await this.authRepository.createAuth(device, userid);
    return createAuth;
  }
}
