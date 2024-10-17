import { describe, expect, it } from "vitest";
import { AppError } from "../../../../src/application/errors/errors";
import { GetUsersUseCase } from "../../../../src/application/usecases/users/get-users-use-case";
import { makeLoggingMock } from "../../../mocks/logging-mock";
import { makeUserRepositoryMock } from "../../../mocks/user-repository-mock";

const makeSut = () => {
  const userRepositoryMock = makeUserRepositoryMock();
  const loggingMock = makeLoggingMock();
  const sut = new GetUsersUseCase(userRepositoryMock, loggingMock);
  return {
    sut,
    userRepositoryMock,
    loggingMock,
  };
};

describe("GetUsersUseCase", () => {
  it("Should retrieve users successfully with pagination", async () => {
    const { sut, userRepositoryMock } = makeSut();

    const filters = { city: "Praia Grande" };
    const page = 1;
    const pageSize = 10;
    const mockUsers = [
      { id: "1", username: "Hebert" },
      { id: "2", username: "John" },
    ];
    const totalItems = 25; 
    const expectedTotalPages = Math.ceil(totalItems / pageSize);

    userRepositoryMock.count.mockResolvedValueOnce(totalItems);
    userRepositoryMock.get.mockResolvedValueOnce(mockUsers);
    const result = await sut.execute(filters, page, pageSize);

    expect(result).toEqual({
      hasNextPage: page < expectedTotalPages,
      hasPreviousPage: page > 1,
      page,
      pageSize,
      totalPages: expectedTotalPages,
      totalItems,
      users: mockUsers,
    });
    expect(userRepositoryMock.count).toHaveBeenCalledWith(filters);
    expect(userRepositoryMock.get).toHaveBeenCalledWith(filters, 0, pageSize);
  });

  it("Should throw AppError if an error occurs while retrieving users", async () => {
    const { sut, userRepositoryMock, loggingMock } = makeSut();
    const filters = { city: "Praia Grande" };
    const page = 1;
    const pageSize = 10;
    userRepositoryMock.count.mockRejectedValueOnce(new Error("Database error"));
    await expect(sut.execute(filters, page, pageSize)).rejects.toThrow(
      AppError
    );
    expect(loggingMock.error).toHaveBeenCalledWith(
      expect.stringContaining("Ocurred an error while retrieve users")
    );
  });
});
