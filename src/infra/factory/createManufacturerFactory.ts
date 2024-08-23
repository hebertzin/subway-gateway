import { CreateManufacturerUseCase } from "../../application/usecases/manufacturer";
import { ILogger } from "../../domain/logger";
import { CreateManufacturerController } from "../../presentation/controllers/manufacturer";
import { LoggerService } from "../logging/logger";
import { IManufacturerRepository, ManufacturerRepository } from "../repositories/manufacturer";

class CreateManufacturerFactoryController {
  constructor(
    private readonly manufacturerRepository: IManufacturerRepository,
    private readonly loggerService: ILogger
  ) {}

  public create(): CreateManufacturerController {
    const createManufacturerUseCase = new CreateManufacturerUseCase(
      this.manufacturerRepository,
      this.loggerService
    );

    return new CreateManufacturerController(createManufacturerUseCase);
  }
}

export const createManufacturerFactoryController = new CreateManufacturerFactoryController(
  new ManufacturerRepository(),
  new LoggerService()
);