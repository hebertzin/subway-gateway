import { User } from "../../../domains/entities/users";
import { HttpStatusCode } from "../../../domains/http";
import { Logging } from "../../../domains/logger";
import { UserRepository } from "../../../domains/repository/users/user-repository";
import { AppError } from "../../errors/errors";

export interface GetUsers {
  execute(filters: Partial<User>): Promise<Omit<User, "password">[]>;
}

export class GetUsersUseCase implements GetUsers {
  constructor(
    readonly usersRepository: UserRepository,
    readonly logging: Logging
  ) {}
  async execute(filters: Partial<User>): Promise<Omit<User, "password">[]> {
    try {
      return await this.usersRepository.get(filters);
    } catch (error) {
      this.logging.error(`Ocurred an error while retrieve users ${error}`);
      throw new AppError(
        "some error has been ocurred",
        HttpStatusCode.InternalServerError
      );
    }
  }
}
