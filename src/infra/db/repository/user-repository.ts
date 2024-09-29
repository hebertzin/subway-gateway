import { User } from "../../../domain/entities/users";
import { AddUserRepository } from "../../../domain/repository/users/add-user-repository";
import { prisma } from "../prisma-client";

export class UserRepository implements AddUserRepository {
  async create(userData: User): Promise<User> {
    const user = await prisma.users.create({
      data: {
        ...userData,
      },
    });
    return user;
  }
}
