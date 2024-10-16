import { User } from "../../entities/users";

export interface GetUsers {
  execute(filters: Partial<User>): Promise<Omit<User, "password">[]>;
}
