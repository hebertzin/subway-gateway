import { Request } from "express";
import { Controller, HttpResponse } from "../../../domains/controller";
import { User } from "../../../domains/entities/users";
import { HttpStatusCode } from "../../../domains/http";
import { GetUsers } from "../../../domains/usecases/users/get-users-use-case";

export class GetUsersController implements Controller {
  constructor(readonly getUsers: GetUsers) {}
  async handle(request: Request): Promise<HttpResponse> {
    try {
      const page = Number(request.query.page) || 1;
      const pageSize = Number(request.query.limit) || 20;
      const filters = request.query as Partial<User>;
      const filteredUsers = await this.getUsers.execute(
        filters,
        page,
        pageSize
      );
      return {
        msg: "Users retrieved sucessfully",
        body: filteredUsers,
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
