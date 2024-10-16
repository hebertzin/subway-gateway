import { User } from "../../entities/users";

export interface UserRepository {
  add(user: User): Promise<User>;
  loadByEmail(email: string): Promise<Omit<User, "password">>;
  get(filters: Partial<User>): Promise<Omit<User, "password">[]>;
  loadById(user_id: string): Promise<Omit<User, "password">>;
  update(user_id: string, userData: Partial<User>): Promise<User>;
  delete(user_id: string): Promise<void>;
}
