import { User } from "../../entities/users";

export type LoadUserByEmailRepository = {
  loadByEmail(email: string): Promise<User>;
};
