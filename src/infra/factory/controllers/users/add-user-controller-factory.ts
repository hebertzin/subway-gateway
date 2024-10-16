import { Controller } from "../../../../domains/controller";
import { AddUserController } from "../../../../presentation/controllers/users/add-user-controller";
import { makeDbAddUser } from "../../usecases/users/add-user-factory";

export const makeAddUserController = () : Controller => {
  const addUserUseCase = makeDbAddUser();
  return new AddUserController(addUserUseCase)
}