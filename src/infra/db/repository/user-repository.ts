import { User } from "../../../domains/entities/users";
import { UserRepository } from "../../../domains/repository/users/user-repository";
import { prisma } from "../prisma-client";

export class UsersRepository implements UserRepository {
  async add(userData: User): Promise<User> {
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
