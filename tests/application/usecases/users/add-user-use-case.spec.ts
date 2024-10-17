import { describe, expect, it } from "vitest";
import {
  AppError,
  UserAlreadyExistError,
} from "../../../../src/application/errors/errors";
import { AddUserUseCase } from "../../../../src/application/usecases/users/add-user-use-case";
import { makeHashMock } from "../../../mocks/hash-mock";
import { makeLoggingMock } from "../../../mocks/logging-mock";
import { mockUser } from "../../../mocks/user-mock";
import { makeUserRepositoryMock } from "../../../mocks/user-repository-mock";

const makeSut = () => {
  const userRepositoryMock = makeUserRepositoryMock();
  const hashMock = makeHashMock();
  const loggingMock = makeLoggingMock();
  const sut = new AddUserUseCase(userRepositoryMock, loggingMock, hashMock);
  return {
    sut,
    userRepositoryMock,
    hashMock,
    loggingMock,
  };
};

describe("AddUserUseCase", () => {
  it("should return error if user already exist", async () => {
    const { sut, userRepositoryMock, loggingMock } = makeSut();
    userRepositoryMock.loadByEmail.mockResolvedValueOnce(mockUser);
    await expect(sut.execute(mockUser)).rejects.toThrow(UserAlreadyExistError);
    expect(loggingMock.warn).toHaveBeenCalledWith(
      "Could not create user because it already exists"
    );
  });

  it("should create and return a user successfully", async () => {
    const hashedPassword = "hashed_password";
    const { sut, userRepositoryMock, hashMock } = makeSut();
    userRepositoryMock.loadByEmail.mockResolvedValueOnce(null);
    userRepositoryMock.add.mockResolvedValueOnce({
      ...mockUser,
      password: hashedPassword,
    });
    hashMock.hash.mockResolvedValueOnce(hashedPassword);
    const expectedUser = { ...mockUser, password: hashedPassword };
    const result = await sut.execute(mockUser);
    expect(result).toEqual(expectedUser);
    expect(hashMock.hash).toHaveBeenCalledWith(mockUser.password);
    expect(expectedUser.password).not.toBe(mockUser.password);
    expect(userRepositoryMock.add).toHaveBeenCalledWith(expectedUser);
  });

  it("should throw an AppError if an unexpected error occurs", async () => {
    const { sut, userRepositoryMock, loggingMock } = makeSut();
    userRepositoryMock.add.mockRejectedValueOnce(new Error("Database error"));
    await expect(sut.execute(mockUser)).rejects.toThrow(AppError);
    expect(loggingMock.error).toHaveBeenCalledWith(
      expect.stringContaining(
        "Some error has been ocurred trying create a new user"
      )
    );
  });
});
