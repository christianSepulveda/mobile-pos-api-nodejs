import { User } from "../entities/user";

export type Login = {
  id?: string;
  email: string;
  password: string;
};

export type UserRepository = {
  save: (user: User) => Promise<User>;
  update: (user: User) => Promise<User>;
  find: (data: Login) => Promise<User | undefined>;
};
