import { Manufacturer } from "../../../domain/entities/manufacturer";
import { HttpStatusCode } from "../../../domain/http";
import { Logging } from "../../../domain/logger";
import { AddManufacturerRepository } from "../../../domain/repositories/manufacturer-repository";
import { AddManufacturer } from "../../../domain/usecases/add-manufacturer-use-case";
import { AppError } from "../../errors/errors";

export class AddManufacturerUseCase implements AddManufacturer {
  constructor(
    readonly manufacturerRepository: AddManufacturerRepository,
    readonly logging: Logging
  ) {}
  async execute(data: Manufacturer): Promise<Manufacturer> {
    try {
      const manufacturer = await this.manufacturerRepository.create(data);
      return manufacturer;
    } catch (error) {
      this.logging.error(`Error when trying to create manufacturer: ${error}`);
      throw new AppError(
        "An error occurred while trying to create a manufacturer",
        HttpStatusCode.InternalServerError
      );
    }
  }
}
