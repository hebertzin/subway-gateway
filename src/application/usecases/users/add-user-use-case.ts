import { User } from "../../../domain/entities/users";
import { Hasher } from "../../../domain/hasher";
import { HttpStatusCode } from "../../../domain/http";
import { Logging } from "../../../domain/logger";
import { AddUserRepository } from "../../../domain/repository/users/add-user-repository";
import { LoadUserByEmailRepository } from "../../../domain/repository/users/find-user-by-email";
import { AddUser } from "../../../domain/usecases/users/add-user-use-case";
import { AppError, UserAlreadyExistError } from "../../errors/errors";

export class AddUserUseCase implements AddUser {
  constructor(
    readonly userRepository: AddUserRepository,
    readonly logging: Logging,
    readonly loadUserByEmail: LoadUserByEmailRepository,
    readonly hasher: Hasher
  ) {}
  async execute(userData: User): Promise<User> {
    try {
      if (this.loadUserByEmail.loadByEmail(userData.email)) {
        throw new UserAlreadyExistError(
          "User already exist",
          HttpStatusCode.Conflict
        );
      }
      const passwordHashed = await this.hasher.hash(userData.password);
      const updatedUserData = { ...userData, password: passwordHashed };
      const user = await this.userRepository.create(updatedUserData);
      this.logging.info("User created successfully");
      return user;
    } catch (error) {
      throw new AppError(
        "Some error has been ocurred",
        HttpStatusCode.InternalServerError
      );
    }
  }
}
