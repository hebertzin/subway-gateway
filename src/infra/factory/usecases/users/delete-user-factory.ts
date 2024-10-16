import { DeleteUserUseCase } from "../../../../application/usecases/users/delete-user-use-case";
import { DeleteUser } from "../../../../domains/usecases/users/delete-user-use-case";
import { UsersRepository } from "../../../db/repository/user-repository";
import { LoggerService } from "../../../logging/logger";

export const makeDbDeleteUser = (): DeleteUser => {
  const userRepository = new UsersRepository();
  const logging = new LoggerService();
  return new DeleteUserUseCase(userRepository, logging);
};
