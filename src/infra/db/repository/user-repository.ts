import { User } from "../../../domain/entities/users";
import { AddUserRepository } from "../../../domain/repository/users/add-user-repository";
import { LoadUserByEmailRepository } from "../../../domain/repository/users/load-user-by-email";
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

  async loadByEmail(email: string): Promise<Omit<User, "password">> {
    const user = await prisma.users.findFirst({
      where: { email },
      select: {
        username: true,
        email: true,
        phone: true,
        street: true,
        country: true,
        nationality: true,
        state: true,
        city: true,
        postal_code: true,
        gender: true,
        date_of_birth: true,
        languages: true,
      },
    });
    return user;
  }
}
