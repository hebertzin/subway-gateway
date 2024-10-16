import { AddUserUseCase } from "../../../../application/usecases/users/add-user-use-case";
import { AddUser } from "../../../../domains/usecases/users/add-user-use-case";
import { UsersRepository } from "../../../db/repository/user-repository";
import { LoggerService } from "../../../logging/logger";
import { Hash } from "../../../security/bcrypt/hash";

export const makeDbAddUser = (): AddUser => {
  const usersRepository = new UsersRepository();
  const logging = new LoggerService();
  const hash = new Hash();
  return new AddUserUseCase(usersRepository, logging, hash);
};
