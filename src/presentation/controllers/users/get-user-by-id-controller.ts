import { Request } from "express";
import { Controller, HttpResponse } from "../../../domains/controller";
import { HttpStatusCode } from "../../../domains/http";
import { GetUserById } from "../../../domains/usecases/users/get-user-by-id";

export class GetUserByIdController implements Controller {
  constructor(readonly getUserById: GetUserById) {}
  async handle(request: Request): Promise<HttpResponse> {
    try {
      const { user_id }= request.params;
      const user = await this.getUserById.execute(String(user_id));
      return {
        msg: "User retrieved successfully",
        statusCode: HttpStatusCode.Ok,
        body: user,
      };
    } catch (error) {
      return {
        msg: error.message,
        statusCode: error.statusCode,
      };
    }
  }
}
