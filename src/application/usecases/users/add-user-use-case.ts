import { User } from "../../../domains/entities/users";
import { Hasher } from "../../../domains/hasher";
import { HttpStatusCode } from "../../../domains/http";
import { Logging } from "../../../domains/logger";
import { UserRepository } from "../../../domains/repository/users/user-repository";
import { AddUser } from "../../../domains/usecases/users/add-user-use-case";
import { AppError, UserAlreadyExistError } from "../../errors/errors";

export class AddUserUseCase implements AddUser {
  constructor(
    readonly userRepository : UserRepository,
    readonly logging: Logging,
    readonly hasher: Hasher
  ) {}
  async execute(userData: User): Promise<User> {
    try {
      const existentUser = await this.userRepository.loadByEmail(
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
      const user = await this.userRepository.add(updatedUserData);
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
