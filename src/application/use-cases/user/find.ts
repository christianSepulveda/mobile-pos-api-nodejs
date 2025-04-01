import {
  Login,
  UserRepository,
} from "../../../domain/repositories/user-repository";

export class FindUser {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(login: Login): Promise<Login | undefined> {
    const findedUser = await this.userRepository.find(login);
    return findedUser;
  }
}
