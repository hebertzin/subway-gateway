import { Controller } from "../../../../domains/controller";
import { UpdateUserController } from "../../../../presentation/controllers/users/update-user-controller";
import { makeDbUpdateUser } from "../../usecases/users/update-user-factory";

export const makeUpdateUserController = (): Controller => {
  const updateUserUseCase = makeDbUpdateUser();
  return new UpdateUserController(updateUserUseCase);
};
