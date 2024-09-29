import { User } from "../../entities/users";

export interface AddUserUseCase {
  execute(data: User): Promise<User>;
}
