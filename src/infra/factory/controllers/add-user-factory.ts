import { Controller } from "../../../domains/controller";
import { AddUserController } from "../../../presentation/controllers/users/add-user-controller";
import { makeDbAddUser } from "../usecases/add-user-factory";

export const makeAddUserController = () : Controller => {
  const dbAddUser = makeDbAddUser();
  return new AddUserController(dbAddUser)
}