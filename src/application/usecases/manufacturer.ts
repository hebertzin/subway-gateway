import { HttpStatusCode } from "../../domain/http";
import { ILogger } from "../../domain/logger";
import { Manufacturer } from "../../domain/manufacturer";
import { IManufacturerRepository } from "../../infra/repositories/manufacturer";
import { AppError } from "../errors/errors";

export interface IAddManufacturerUseCase {
  execute(data: Manufacturer): Promise<Manufacturer>;
}

export class AddManufacturerUseCase implements IAddManufacturerUseCase {
  constructor(
    private readonly manufacturerRepository: IManufacturerRepository,
    private readonly logger: ILogger
  ) {}
  
  async execute(data: Manufacturer): Promise<Manufacturer> {
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
