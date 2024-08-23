import { CreateManufacturerUseCase } from '../../application/usecases/manufacturer';
import { ILogger } from '../../domain/logger';
import { CreateManufacturerController } from '../../presentation/controllers/manufacturer';
import { LoggerService } from '../logging/logger';
import { ManufacturerRepository } from '../repositories/manufacturer';

export class CreateManufacturerFactory {
  private manufacturerRepository: ManufacturerRepository;
  private loggerService: ILogger;


  constructor() {
    this.manufacturerRepository = new ManufacturerRepository();
    this.loggerService = new LoggerService();
  }

  public create(): CreateManufacturerController {
    const createManufacturerUseCase = new CreateManufacturerUseCase(
      this.manufacturerRepository,
      this.loggerService
    );

    const createManufacturerController = new CreateManufacturerController(createManufacturerUseCase);

    return createManufacturerController;
  }
}
