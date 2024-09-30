import { User } from "../../../domain/entities/users";
import { Hasher } from "../../../domain/hasher";
import { HttpStatusCode } from "../../../domain/http";
import { Logging } from "../../../domain/logger";
import { AddUserRepository } from "../../../domain/repository/users/add-user-repository";
import { LoadUserByEmailRepository } from "../../../domain/repository/users/load-user-by-email";
import { AddUser } from "../../../domain/usecases/users/add-user-use-case";
import { AppError, UserAlreadyExistError } from "../../errors/errors";

export class AddUserUseCase implements AddUser {
  constructor(
    readonly addUserRepository: AddUserRepository,
    readonly logging: Logging,
    readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    readonly hasher: Hasher
  ) {}
  async execute(userData: User): Promise<User> {
    try {
      const existentUser = await this.loadUserByEmailRepository.loadByEmail(
        userData.email
      );
      if (existentUser) {
        this.logging.warn("Could not create user because it already exists");
        throw new UserAlreadyExistError(
          "User already exists",
          HttpStatusCode.Conflict
        );
      }
      const passwordHashed = await this.hasher.hash(userData.password);
      const updatedUserData = { ...userData, password: passwordHashed };
      const user = await this.addUserRepository.create(updatedUserData);
      this.logging.info("User created successfully");
      return user;
    } catch (error) {
      this.logging.error(
        `Some error has been ocurred trying create a new user ${error}`
      );
      throw new AppError(
        "Some error has been ocurred",
        HttpStatusCode.InternalServerError
      );
    }
  }
}
