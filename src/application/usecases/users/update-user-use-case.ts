import { User } from "../../../domains/entities/users";
import { Hasher } from "../../../domains/hasher";
import { HttpStatusCode } from "../../../domains/http";
import { Logging } from "../../../domains/logger";
import { UserRepository } from "../../../domains/repository/users/user-repository";
import { UpdateUser } from "../../../domains/usecases/users/update-user-use-case";
import { AppError, UserNotFoundError } from "../../errors/errors";

export class UpdateUserUseCase implements UpdateUser {
  constructor(
    readonly userRepository: UserRepository,
    readonly logging: Logging,
    readonly hasher: Hasher 
  ) {}

  async execute(user_id: string, userData: Partial<User>): Promise<User> {
    try {
      const existingUser = await this.userRepository.loadById(user_id);
      if (!existingUser) {
        this.logging.warn("User not found");
        throw new UserNotFoundError("User not found", HttpStatusCode.NotFound);
      }
      if (userData.password) {
        userData.password = await this.hasher.hash(userData.password);
      }
      const updatedUser = await this.userRepository.update(user_id, userData);
      this.logging.info("User updated successfully");
      return updatedUser;
    } catch (error) {
      this.logging.error(
        `Error occurred while updating user: ${error.message}`
      );
      throw new AppError(
        "An error occurred while updating the user",
        HttpStatusCode.InternalServerError
      );
    }
  }
}
