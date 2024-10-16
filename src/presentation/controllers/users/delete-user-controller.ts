import { Request } from "express";
import { Controller, HttpResponse } from "../../../domains/controller";
import { HttpStatusCode } from "../../../domains/http";
import { DeleteUser } from "../../../domains/usecases/users/delete-user-use-case";

export class DeleteUserController implements Controller {
  constructor(readonly deleteUser: DeleteUser) {}
  async handle(request: Request): Promise<HttpResponse> {
    try {
      const { user_id } = request.params;
      await this.deleteUser.execute(String(user_id));
      return {
        msg: "User deleted successfully",
        statusCode: HttpStatusCode.Ok,
      };
    } catch (error) {
      return {
        msg: error.message,
        statusCode: error.statusCode,
      };
    }
  }
}
