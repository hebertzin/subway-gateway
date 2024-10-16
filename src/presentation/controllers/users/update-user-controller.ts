import { Request } from "express";
import { Controller, HttpResponse } from "../../../domains/controller";
import { User } from "../../../domains/entities/users";
import { HttpStatusCode } from "../../../domains/http";
import { UpdateUser } from "../../../domains/usecases/users/update-user-use-case";

export class UpdateUserController implements Controller {
  constructor(readonly updateUserUseCase: UpdateUser) {}

  async handle(request: Request): Promise<HttpResponse> {
    try {
      const { user_id } = request.params;
      const data = request.body as Partial<User>;
      const updatedUser = await this.updateUserUseCase.execute(user_id, data);
      return {
        msg: "User updated successfully",
        statusCode: HttpStatusCode.Ok,
        body: updatedUser,
      };
    } catch (error) {
      return {
        msg: error.message,
        statusCode: error.statusCode,
      };
    }
  }
}
