import { Controller } from "../../../../domains/controller";
import { GetUserByIdController } from "../../../../presentation/controllers/users/get-user-by-id-controller";
import { makeDbGetUserById } from "../../usecases/users/get-user-by-id-factory";

export const makeGetUserByIdController = (): Controller => {
  const getUserByIdUseCase = makeDbGetUserById();
  return new GetUserByIdController(getUserByIdUseCase);
};
