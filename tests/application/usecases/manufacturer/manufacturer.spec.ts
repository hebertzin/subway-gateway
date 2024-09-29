import { describe, expect, it, vi } from "vitest";
import { AppError } from "../../../../src/application/errors/errors";
import {
  AddManufacturerUseCase,
  IAddManufacturerUseCase,
} from "../../../../src/application/usecases/manufacturer";
import { Manufacturer } from "../../../../src/domain/entities/manufacturer";
import { ILogger } from "../../../../src/domain/logger";

const logger: ILogger = {
  error: vi.fn(),
  info: vi.fn(),
  warn: vi.fn(),
  debug: vi.fn(),
  log: vi.fn(),
};

const manufacturerRepositoryMock = {
  create: vi.fn(),
};

const makeSut = (): { sut: IAddManufacturerUseCase } => {
  const sut = new AddManufacturerUseCase(manufacturerRepositoryMock, logger);
  return { sut };
};

describe("AddManufacturerUseCase", () => {
  it("should create a manufacturer successfully", async () => {
    const { sut } = makeSut();
    const input: Manufacturer = {
      name: "Fabricante XYZ",
      city: "São Paulo",
      email: "contato@fabricantexyz.com",
      number: "123",
      phone: "+55 (11) 98765-4321",
      state: "SP",
      street: "Avenida Paulista",
      website: "https://www.fabricantexyz.com",
      zip_code: "01310-000",
    };
    const resultManufacturer: Manufacturer = {
      ...input,
    };
    manufacturerRepositoryMock.create.mockResolvedValueOnce(resultManufacturer);
    const result = await sut.execute(input);
    expect(result).toEqual(resultManufacturer);
    expect(manufacturerRepositoryMock.create).toHaveBeenCalledWith(input);
  });

  it("should throw an error if creating manufacturer fails", async () => {
    const { sut } = makeSut();
    const input: Manufacturer = {
      name: "Fabricante XYZ",
      city: "São Paulo",
      email: "contato@fabricantexyz.com",
      number: "123",
      phone: "+55 (11) 98765-4321",
      state: "SP",
      street: "Avenida Paulista",
      website: "https://www.fabricantexyz.com",
      zip_code: "01310-000",
    };
    const errorMessage = "Simulated create error";
    manufacturerRepositoryMock.create.mockRejectedValueOnce(new Error(errorMessage));
    await expect(sut.execute(input)).rejects.toThrow(AppError);
    expect(logger.error).toHaveBeenCalledWith(
      `Error when trying to create manufacturer: Error: ${errorMessage}`
    );
  });
});
