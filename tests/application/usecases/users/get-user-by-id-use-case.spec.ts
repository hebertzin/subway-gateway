import { describe, expect, it } from "vitest";
import {
  AppError,
  UserNotFoundError,
} from "../../../../src/application/errors/errors";
import { GetUserByIdUseCase } from "../../../../src/application/usecases/users/get-user-by-id";
import { makeLoggingMock } from "../../../mocks/logging-mock";
import { makeUserRepositoryMock } from "../../../mocks/user-repository-mock";

const makeSut = () => {
  const userRepositoryMock = makeUserRepositoryMock();
  const loggingMock = makeLoggingMock();
  const sut = new GetUserByIdUseCase(userRepositoryMock, loggingMock);
  return {
    sut,
    userRepositoryMock,
    loggingMock,
  };
};

describe("GetUserByIdUseCase", () => {
  it("Should find user correctly", async () => {
    const mockUser = {
      id: "72",
      username: "Hebert",
      city: "Praia Grande",
      country: "Brasil",
      date_of_birth: "13/10/2004",
      email: "hebertsantosdeve",
      gender: "masculino",
      languages: "Português",
      nationality: "Brasileiro",
      phone: "13996612070",
      postal_code: "11714140",
      state: "São Paulo",
      street: "Rua dos Fundos",
    };
    const { sut, userRepositoryMock } = makeSut();
    userRepositoryMock.loadById.mockResolvedValueOnce(mockUser);
    const result = await sut.execute(mockUser.id);
    expect(result).toEqual(mockUser);
  });

  it("should throw UserNotFoundError if user is not found", async () => {
    const { sut, userRepositoryMock } = makeSut();
    userRepositoryMock.loadById.mockResolvedValueOnce(null);
    await expect(sut.execute("invalid_id")).rejects.toThrow(UserNotFoundError);
  });
  it("should throw an AppError if an unexpected error occurs", async () => {
    const { sut, userRepositoryMock } = makeSut();
    userRepositoryMock.loadById.mockRejectedValueOnce(
      new Error("Database error")
    );
    await expect(sut.execute("1")).rejects.toThrow(AppError);
  });
});
