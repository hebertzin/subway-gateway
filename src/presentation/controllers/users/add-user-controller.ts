import { Request } from "express";
import { Controller, HttpResponse } from "../../../domains/controller";
import { User } from "../../../domains/entities/users";
import { HttpStatusCode } from "../../../domains/http";
import { AddUser } from "../../../domains/usecases/users/add-user-use-case";

export class AddUserController implements Controller {
  constructor(readonly addUserUseCase: AddUser) {}
  async handle(req: Request): Promise<HttpResponse> {
    try {
      const data = req.body as User;
      const user = await this.addUserUseCase.execute(data);
      return {
        msg: "User created successfully",
        statusCode: HttpStatusCode.Created,
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
