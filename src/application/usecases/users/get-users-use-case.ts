import { User } from "../../../domains/entities/users";
import { HttpStatusCode } from "../../../domains/http";
import { Logging } from "../../../domains/logger";
import { UserRepository } from "../../../domains/repository/users/user-repository";
import { GetUsers } from "../../../domains/usecases/users/get-users-use-case";
import { AppError } from "../../errors/errors";

export type PaginationResult = {
  users: Omit<User, "password">[];
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  page: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
};

export class GetUsersUseCase implements GetUsers {
  constructor(
    readonly usersRepository: UserRepository,
    readonly logging: Logging
  ) {}
  async execute(
    filters: Partial<User>,
    page: number,
    pageSize: number
  ): Promise<PaginationResult> {
    try {
      const skip = (page - 1) * pageSize;
      const totalItems = await this.usersRepository.count(filters);
      const users = await this.usersRepository.get(filters, skip, pageSize);
      const totalPages = Math.ceil(totalItems / pageSize);
      return {
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
        page,
        pageSize,
        totalPages,
        totalItems,
        users,
      };
    } catch (error) {
      this.logging.error(`Ocurred an error while retrieve users ${error}`);
      throw new AppError(
        "some error has been ocurred",
        HttpStatusCode.InternalServerError
      );
    }
  }
}
