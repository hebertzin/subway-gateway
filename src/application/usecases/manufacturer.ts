import { HttpStatusCode } from "../../domain/http";
import { ILogger } from "../../domain/logger";
import {
  IManufacturerRepository,
  Manufacturer,
  ManufacturerCreateInput,
} from "../../infra/repositories/manufacturer";
import { AppError } from "../errors/errors";

export interface IManufacturerUseCase {
  execute(data: ManufacturerCreateInput): Promise<Manufacturer>;
}

export class CreateManufacturerUseCase implements IManufacturerUseCase {
  constructor(
    private readonly manufacturerRepository: IManufacturerRepository,
    private readonly logger: ILogger
  ) {}

  async execute(data: ManufacturerCreateInput): Promise<Manufacturer> {
    try {
      const manufacturer = await this.manufacturerRepository.create(data);
      return manufacturer;
    } catch (error) {
      this.logger.error(`Error when trying to create manufacturer: ${error}`);
      throw new AppError(
        "An error occurred while trying to create a manufacturer",
        HttpStatusCode.InternalServerError
      );
    }
  }
}
