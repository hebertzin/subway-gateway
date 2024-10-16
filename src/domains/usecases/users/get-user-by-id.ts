import { User } from "../../entities/users";

export interface GetUserById {
  execute(user_id: string): Promise<Omit<User, "password">>;
}
