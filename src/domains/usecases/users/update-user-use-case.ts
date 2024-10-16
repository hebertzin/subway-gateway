import { User } from "../../entities/users";

export interface UpdateUser {
  execute(user_id: string, userData: Partial<User>): Promise<User>;
}
