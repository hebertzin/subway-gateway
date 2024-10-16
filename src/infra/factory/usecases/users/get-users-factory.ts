import {
      GetUsers,
      GetUsersUseCase,
} from "../../../../application/usecases/users/get-users-use-case";
import { UsersRepository } from "../../../db/repository/user-repository";
import { LoggerService } from "../../../logging/logger";

export const makeDbGetUsers = (): GetUsers => {
  const usersRepository = new UsersRepository();
  const logging = new LoggerService();
  return new GetUsersUseCase(usersRepository, logging);
};
