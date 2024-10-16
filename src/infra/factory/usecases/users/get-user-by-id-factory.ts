import { GetUserByIdUseCase } from "../../../../application/usecases/users/get-user-by-id";
import { GetUserById } from "../../../../domains/usecases/users/get-user-by-id";
import { UsersRepository } from "../../../db/repository/user-repository";
import { LoggerService } from "../../../logging/logger";

export const makeDbGetUserById = (): GetUserById => {
  const userRepository = new UsersRepository();
  const logging = new LoggerService();
  return new GetUserByIdUseCase(userRepository, logging);
};
