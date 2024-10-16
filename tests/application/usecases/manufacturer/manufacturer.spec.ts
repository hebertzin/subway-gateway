import { describe, expect, it, vi } from "vitest";
import { AppError } from "../../../../src/application/errors/errors";
import { AddManufacturerUseCase } from "../../../../src/application/usecases/manufacturer/add-manufacturer-use-case";
import { Manufacturer } from "../../../../src/domains/entities/manufacturer";
import { Logging } from "../../../../src/domains/logger";
import { AddManufacturer } from "../../../../src/domains/usecases/manufacturer/add-manufacturer-use-case";

const logger: Logging = {
  error: vi.fn(),
  info: vi.fn(),
  warn: vi.fn(),
  debug: vi.fn(),
  log: vi.fn(),
};

const manufacturerRepositoryMock = {
  create: vi.fn(),
};

const makeSut = (): { sut: AddManufacturer } => {
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
    expect(manufacturerRepositoryMock.create).toHaveBeenCalledWith(input);
    expect(result).toEqual(resultManufacturer);
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
    manufacturerRepositoryMock.create.mockRejectedValueOnce(
      new Error("Simulated create error")
    );
    await expect(sut.execute(input)).rejects.toThrow(AppError);
  });
});
