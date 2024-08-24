import { AddManufacturerUseCase } from "../../../application/usecases/manufacturer";
import { LoggerService } from "../../logging/logger";
import { ManufacturerRepository } from "../../repositories/manufacturer";

export const makeDbAddManufacturer = (): AddManufacturerUseCase => {
  const manufacturerRepository = new ManufacturerRepository();
  const loggerService = new LoggerService();
  return new AddManufacturerUseCase(manufacturerRepository, loggerService);
};
