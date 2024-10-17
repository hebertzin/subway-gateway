import { describe, expect, it } from "vitest";
import {
      AppError,
      UserNotFoundError,
} from "../../../../src/application/errors/errors";
import { DeleteUserUseCase } from "../../../../src/application/usecases/users/delete-user-use-case";
import { makeLoggingMock } from "../../../mocks/logging-mock";
import { makeUserRepositoryMock } from "../../../mocks/user-repository-mock";

const makeSut = () => {
  const userRepositoryMock = makeUserRepositoryMock();
  const loggingMock = makeLoggingMock();
  const sut = new DeleteUserUseCase(userRepositoryMock, loggingMock);
  return {
    sut,
    userRepositoryMock,
    loggingMock,
  };
};

describe("DeleteUserUseCase", () => {
  it("Should delete user successfully", async () => {
    const { sut, userRepositoryMock } = makeSut();
    const mockUserId = "72";
    userRepositoryMock.loadById.mockResolvedValueOnce({ id: mockUserId });
    await sut.execute(mockUserId);
    expect(userRepositoryMock.delete).toHaveBeenCalledWith(mockUserId);
  });

  it("Should throw UserNotFoundError if user does not exist", async () => {
    const { sut, userRepositoryMock } = makeSut();
    const mockUserId = "invalid_id";
    userRepositoryMock.loadById.mockResolvedValueOnce(null);
    await expect(sut.execute(mockUserId)).rejects.toThrow(UserNotFoundError);
  });

  it("Should throw AppError if an error occurs during deletion", async () => {
    const { sut, userRepositoryMock, loggingMock } = makeSut();
    const mockUserId = "72";
    userRepositoryMock.loadById.mockResolvedValueOnce({ id: mockUserId });
    userRepositoryMock.delete.mockRejectedValueOnce(
      new Error("Deletion error")
    );
    await expect(sut.execute(mockUserId)).rejects.toThrow(AppError);
    expect(loggingMock.error).toHaveBeenCalledWith(
      expect.stringContaining("Error while delete user")
    );
  });
});
