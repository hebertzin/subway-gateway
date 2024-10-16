import { Request } from "express";
import { GetUsers } from "../../../application/usecases/users/get-users-use-case";
import { Controller, HttpResponse } from "../../../domains/controller";
import { User } from "../../../domains/entities/users";
import { HttpStatusCode } from "../../../domains/http";

export class GetUsersController implements Controller {
  constructor(readonly getUsers: GetUsers) {}
  async handle(request: Request): Promise<HttpResponse> {
    try {
      const filters = request.query as Partial<User>;
      const filteredUsers = await this.getUsers.execute(filters);
      return {
        msg: "Users retrieved successfully",
        statusCode: HttpStatusCode.Ok,
        body: filteredUsers,
      };
    } catch (error) {
      return {
        msg: error.message,
        statusCode: error.statusCode,
      };
    }
  }
}
