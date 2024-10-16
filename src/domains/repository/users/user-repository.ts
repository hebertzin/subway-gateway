import { User } from "../../entities/users";

export interface UserRepository {
  add(user: User): Promise<User>;
  loadByEmail(email: string): Promise<Omit<User, "password">>;
}
