import { HttpStatusCode } from "../../../domains/http";
import { Logging } from "../../../domains/logger";
import { UserRepository } from "../../../domains/repository/users/user-repository";
import { DeleteUser } from "../../../domains/usecases/users/delete-user-use-case";
import { AppError, UserNotFoundError } from "../../errors/errors";

export class DeleteUserUseCase implements DeleteUser {
  constructor(
    readonly usersRepository: UserRepository,
    readonly logging: Logging
  ) {}
  async execute(user_id: string): Promise<void> {
    const user = await this.usersRepository.loadById(user_id);
    if (!user) {
      throw new UserNotFoundError("User not found", HttpStatusCode.NotFound);
    }
    try {
      await this.usersRepository.delete(user_id)
    } catch (error) {
      this.logging.error(`Error while delete user ${error}`);
      throw new AppError(
        "Some error has been ocurred",
        HttpStatusCode.InternalServerError
      );
    }
  }
}
