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

  async get(filters: Partial<User>): Promise<Omit<User, "password">[]> {
    const {
      email,
      phone,
      city,
      state,
      country,
      username,
      date_of_birth,
      languages,
    } = filters;
    const users = await prisma.users.findMany({
      where: {
        AND: [
          email ? { email } : {},
          phone ? { phone } : {},
          city ? { city } : {},
          state ? { state } : {},
          country ? { country } : {},
          username
            ? { username: { contains: username, mode: "insensitive" } }
            : {},
          date_of_birth ? { date_of_birth } : {},
          languages
            ? { languages: { contains: languages, mode: "insensitive" } }
            : {},
        ],
      },
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

    return users;
  }
}
