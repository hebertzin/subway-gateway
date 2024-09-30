import { User } from "../../../domain/entities/users";
import { Logging } from "../../../domain/logger";
import { AddUserRepository } from "../../../domain/repository/users/add-user-repository";
import { AddUser } from "../../../domain/usecases/users/add-user-use-case";

export class AddUserUseCase implements AddUser {
  constructor(
    readonly userRepository: AddUserRepository,
    readonly logging: Logging
  ) {}
  async execute(data: User): Promise<User> {
    const user = await this.userRepository.create(data);
    this.logging.info("User created successfully");
    return user;
  }
}
