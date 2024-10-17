import { describe, expect, it } from "vitest";
import { AppError, UserNotFoundError } from "../../../../src/application/errors/errors";
import { UpdateUserUseCase } from "../../../../src/application/usecases/users/update-user-use-case";
import { makeHashMock } from "../../../mocks/hash-mock";
import { makeLoggingMock } from "../../../mocks/logging-mock";
import { makeUserRepositoryMock } from "../../../mocks/user-repository-mock";

const makeSut = () => {
  const userRepositoryMock = makeUserRepositoryMock();
  const loggingMock = makeLoggingMock();
  const hashMock = makeHashMock();

  const sut = new UpdateUserUseCase(userRepositoryMock, loggingMock, hashMock);
  return {
    sut,
    userRepositoryMock,
    loggingMock,
    hashMock,
  };
};

describe("UpdateUserUseCase", () => {
  it("Should update user successfully", async () => {
    const { sut, userRepositoryMock, loggingMock, hashMock } = makeSut();
    const mockUserId = "72";
    const userData = { username: "NewUsername", password: "newpassword" };
    userRepositoryMock.loadById.mockResolvedValueOnce({ id: mockUserId });
    hashMock.hash.mockResolvedValueOnce("hashedPassword");
    userRepositoryMock.update.mockResolvedValueOnce({
      id: mockUserId,
      ...userData,
      password: "hashedPassword",
    });
    const result = await sut.execute(mockUserId, userData);
    expect(userRepositoryMock.update).toHaveBeenCalledWith(mockUserId, {
      ...userData,
      password: "hashedPassword",
    });
    expect(loggingMock.info).toHaveBeenCalledWith("User updated successfully");
    expect(result).toEqual({
      id: mockUserId,
      ...userData,
      password: "hashedPassword",
    });
  });

  it("Should throw UserNotFoundError if user does not exist", async () => {
    const { sut, userRepositoryMock, loggingMock } = makeSut();
    const mockUserId = "invalid_id";
    const userData = { username: "NewUsername" };
    userRepositoryMock.loadById.mockResolvedValueOnce(null);
    await expect(sut.execute(mockUserId, userData)).rejects.toThrow(
      UserNotFoundError
    );
    expect(loggingMock.warn).toHaveBeenCalledWith("User not found");
  });

  it("Should throw AppError if an error occurs during update", async () => {
    const { sut, userRepositoryMock, loggingMock, hashMock } = makeSut();
    const mockUserId = "72";
    const userData = { username: "NewUsername", password: "newpassword" };
    userRepositoryMock.loadById.mockResolvedValueOnce({ id: mockUserId });
    hashMock.hash.mockResolvedValueOnce("hashedPassword");
    userRepositoryMock.update.mockRejectedValueOnce(new Error("Update error"));
    await expect(sut.execute(mockUserId, userData)).rejects.toThrow(AppError);
    expect(loggingMock.error).toHaveBeenCalledWith(
      expect.stringContaining("Error occurred while updating user")
    );
  });
});
