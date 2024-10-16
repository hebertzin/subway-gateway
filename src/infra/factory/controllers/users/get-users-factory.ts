import { Controller } from "../../../../domains/controller";
import { GetUsersController } from "../../../../presentation/controllers/users/get-users-controller";
import { makeDbGetUsers } from "../../usecases/users/get-users-factory";

export const makeGetUsersController = (): Controller => {
  const getUsersUseCase = makeDbGetUsers();
  return new GetUsersController(getUsersUseCase);
};
