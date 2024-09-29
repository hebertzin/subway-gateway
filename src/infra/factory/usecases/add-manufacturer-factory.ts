import { AddManufacturerUseCase } from "../../../application/usecases/manufacturer";
import { AddManufacturer } from "../../../domain/usecases/add-manufacturer-use-case";
import { LoggerService } from "../../logging/logger";
import { ManufacturerRepository } from "../../repositories/manufacturer";

export const makeDbAddManufacturer = (): AddManufacturer => {
  const manufacturerRepository = new ManufacturerRepository();
  const loggerService = new LoggerService();
  return new AddManufacturerUseCase(manufacturerRepository, loggerService);
};
