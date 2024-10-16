import { Manufacturer } from "../../../domains/entities/manufacturer";
import { HttpStatusCode } from "../../../domains/http";
import { Logging } from "../../../domains/logger";
import { AddManufacturerRepository } from "../../../domains/repository/manufacturer/add-manufacturer-repository";
import { AddManufacturer } from "../../../domains/usecases/manufacturer/add-manufacturer-use-case";
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
