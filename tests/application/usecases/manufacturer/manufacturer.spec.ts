import { describe, expect, it, vi } from "vitest";
import { AppError } from "../../../../src/application/errors/errors";
import {
  AddManufacturerUseCase,
  IAddManufacturerUseCase,
} from "../../../../src/application/usecases/manufacturer";
import { ILogger } from "../../../../src/domain/logger";
import { CreateManufacturerInput } from "../../../../src/domain/manufacturer";
import { ManufacturerRepositorySpy } from "../../../infra/repositories/manufacturer";

const logger: ILogger = {
  error: vi.fn(),
  info: vi.fn(),
  warn: vi.fn(),
  debug: vi.fn(),
  log: vi.fn(),
};

type SutTypes = {
  sut: IAddManufacturerUseCase;
  manufacturerRepositorySpy: ManufacturerRepositorySpy;
};

const makeSut = (): SutTypes => {
  const manufacturerRepositorySpy = new ManufacturerRepositorySpy();
  const sut = new AddManufacturerUseCase(manufacturerRepositorySpy, logger);
  return {
    sut,
    manufacturerRepositorySpy,
  };
};

describe("AddManufacturerUseCase", () => {
  it("should create a manufacturer successfully", async () => {
    const { sut, manufacturerRepositorySpy } = makeSut();

    const input: CreateManufacturerInput = {
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

    const result = await sut.execute(input);

    expect(result).toEqual(manufacturerRepositorySpy.result);
    expect(manufacturerRepositorySpy.createParams).toEqual(input);
  });

  it("should throw an error if creating manufacturer fails", async () => {
    const { sut, manufacturerRepositorySpy } = makeSut();

    const input: CreateManufacturerInput = {
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
    manufacturerRepositorySpy.create = vi
      .fn()
      .mockRejectedValueOnce(new Error(errorMessage));

    await expect(sut.execute(input)).rejects.toThrow(AppError);
    expect(logger.error).toHaveBeenCalledWith(
      `Error when trying to create manufacturer: Error: ${errorMessage}`
    );
  });
});
