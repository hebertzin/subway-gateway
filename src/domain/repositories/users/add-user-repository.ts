import { User } from "../../entities/users";

export interface AddUser {
  create(user: User): Promise<User>;
}
