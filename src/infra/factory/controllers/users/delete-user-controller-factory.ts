import { Controller } from "../../../../domains/controller";
import { DeleteUserController } from "../../../../presentation/controllers/users/delete-user-controller";
import { makeDbDeleteUser } from "../../usecases/users/delete-user-factory";

export const makeDeleteUserController = (): Controller => {
  const deleteUserUseCase = makeDbDeleteUser();
  return new DeleteUserController(deleteUserUseCase);
};
