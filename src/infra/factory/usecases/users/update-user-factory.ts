import { UpdateUserUseCase } from "../../../../application/usecases/users/update-user-use-case";
import { UpdateUser } from "../../../../domains/usecases/users/update-user-use-case";
import { UsersRepository } from "../../../db/repository/user-repository";
import { LoggerService } from "../../../logging/logger";
import { Hash } from "../../../security/bcrypt/hash";

export const makeDbUpdateUser = (): UpdateUser => {
  const userRepository = new UsersRepository();
  const logging = new LoggerService();
  const hash = new Hash();
  return new UpdateUserUseCase(userRepository, logging, hash);
};
