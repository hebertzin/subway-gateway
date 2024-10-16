import { AddManufacturerUseCase } from "../../../../application/usecases/manufacturer/add-manufacturer-use-case";
import { AddManufacturer } from "../../../../domains/usecases/manufacturer/add-manufacturer-use-case";
import { ManufacturerRepository } from "../../../db/repository/manufacturer-repository";
import { LoggerService } from "../../../logging/logger";

export const makeDbAddManufacturer = (): AddManufacturer => {
  const manufacturerRepository = new ManufacturerRepository();
  const logging = new LoggerService();
  return new AddManufacturerUseCase(manufacturerRepository, logging);
};
