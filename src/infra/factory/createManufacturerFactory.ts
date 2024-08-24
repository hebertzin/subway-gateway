import { AddManufacturerUseCase } from "../../application/usecases/manufacturer";
import { CreateManufacturerController } from "../../presentation/controllers/manufacturer";
import { LoggerService } from "../logging/logger";
import { ManufacturerRepository } from "../repositories/manufacturer";

export const createManufacturerController = (): CreateManufacturerController => {
  const manufacturerRepository = new ManufacturerRepository();
  const loggerService = new LoggerService();
  const createManufacturerUseCase = new AddManufacturerUseCase(
    manufacturerRepository,
    loggerService
  );
  return new CreateManufacturerController(createManufacturerUseCase);
};