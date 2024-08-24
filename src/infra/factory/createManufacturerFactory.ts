import { AddManufacturerUseCase } from "../../application/usecases/manufacturer";
import { AddManufacturerController } from "../../presentation/controllers/manufacturer";
import { LoggerService } from "../logging/logger";
import { ManufacturerRepository } from "../repositories/manufacturer";

export const createManufacturerController = (): AddManufacturerController => {
  const manufacturerRepository = new ManufacturerRepository();
  const loggerService = new LoggerService();
  const createManufacturerUseCase = new AddManufacturerUseCase(
    manufacturerRepository,
    loggerService
  );
  return new AddManufacturerController(createManufacturerUseCase);
};