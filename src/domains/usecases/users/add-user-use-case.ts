import { User } from "../../entities/users";

export interface AddUser {
  execute(data: User): Promise<User>;
}
