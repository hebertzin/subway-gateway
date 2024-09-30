import { User } from "../../../domain/entities/users";
import { AddUserRepository } from "../../../domain/repository/users/add-user-repository";
import { LoadUserByEmailRepository } from "../../../domain/repository/users/find-user-by-email";
import { prisma } from "../prisma-client";

export class UserRepository implements AddUserRepository, LoadUserByEmailRepository {
  async create(userData: User): Promise<User> {
    const user = await prisma.users.create({
      data: {
        ...userData,
      },
    });
    return user;
  }

  async loadByEmail(email: string): Promise<User> {
    const user = await prisma.users.findFirst({ where: { email } });
    return user
  }
}
