import { User } from "../../entities/users";

export interface AddUserRepository {
  create(user: User): Promise<User>;
}
