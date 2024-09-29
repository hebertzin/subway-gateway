import { AddManufacturerUseCase } from "../../../application/usecases/manufacturer/add-manufacturer-use-case";
import { AddManufacturer } from "../../../domain/usecases/add-manufacturer-use-case";
import { ManufacturerRepository } from "../../db/repository/manufacturer-repository";
import { LoggerService } from "../../logging/logger";

export const makeDbAddManufacturer = (): AddManufacturer => {
  const manufacturerRepository = new ManufacturerRepository();
  const loggerService = new LoggerService();
  return new AddManufacturerUseCase(manufacturerRepository, loggerService);
};
