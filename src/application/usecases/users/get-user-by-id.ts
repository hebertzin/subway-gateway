import { User } from "../../../domains/entities/users";
import { HttpStatusCode } from "../../../domains/http";
import { Logging } from "../../../domains/logger";
import { UserRepository } from "../../../domains/repository/users/user-repository";
import { GetUserById } from "../../../domains/usecases/users/get-user-by-id";
import { AppError } from "../../errors/errors";

export class GetUserByIdUseCase implements GetUserById {
  constructor(
    readonly usersRepository: UserRepository,
    readonly logging: Logging
  ) {}
  async execute(user_id: string): Promise<Omit<User, "password">> {
    try {
      return  await this.usersRepository.loadById(user_id);
    } catch (error) {
      this.logging.error(`Error while retrieve user ${error}`);
      throw new AppError(
        "Some error has been ocurred",
        HttpStatusCode.InternalServerError
      );
    }
  }
}
