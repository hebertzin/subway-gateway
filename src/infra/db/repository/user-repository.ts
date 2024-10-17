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

  async update(user_id: string, userData: Partial<User>): Promise<User> {
    const user = await prisma.users.update({
      where: { id: user_id },
      data: {
        ...userData,
      },
    });
    return user;
  }

  async delete(user_id: string) {
    await prisma.users.delete({ where: { id: user_id } });
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

  async loadById(id: string): Promise<Omit<User, "password">> {
    const user = await prisma.users.findUnique({
      where: {
        id,
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
    return user;
  }

  async get(filters: Partial<User>, skip: number, take: number): Promise<Omit<User, "password">[]> {
    const {
      email,
      phone,
      city,
      state,
      country,
      username,
      date_of_birth,
      languages,
      gender,
    } = filters;

    return await prisma.users.findMany({
      where: {
        AND: [
          email ? { email } : {},
          phone ? { phone } : {},
          city ? { city: { contains: city, mode: "insensitive" } } : {},
          state ? { state: { contains: state, mode: "insensitive" } } : {},
          country
            ? { country: { contains: country, mode: "insensitive" } }
            : {},
          username
            ? { username: { contains: username, mode: "insensitive" } }
            : {},
          date_of_birth ? { date_of_birth } : {},
          languages
            ? { languages: { contains: languages, mode: "insensitive" } }
            : {},
          gender ? { gender: { contains: gender, mode: "insensitive" } } : {},
        ],
      },
      skip: skip,
      take: take,
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
  }

  async count(filters: Partial<User>): Promise<number> {
    const {
      email,
      phone,
      city,
      state,
      country,
      username,
      date_of_birth,
      languages,
      gender,
    } = filters;

    return await prisma.users.count({
      where: {
        AND: [
          email ? { email } : {},
          phone ? { phone } : {},
          city ? { city: { contains: city, mode: "insensitive" } } : {},
          state ? { state: { contains: state, mode: "insensitive" } } : {},
          country
            ? { country: { contains: country, mode: "insensitive" } }
            : {},
          username
            ? { username: { contains: username, mode: "insensitive" } }
            : {},
          date_of_birth ? { date_of_birth } : {},
          languages
            ? { languages: { contains: languages, mode: "insensitive" } }
            : {},
          gender ? { gender: { contains: gender, mode: "insensitive" } } : {},
        ],
      },
    });
  }
}
