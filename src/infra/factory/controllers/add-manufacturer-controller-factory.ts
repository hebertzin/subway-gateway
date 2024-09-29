import { Controller } from "../../../domain/controller";
import { AddManufacturerController } from "../../../presentation/controllers/manufacturer";
import { makeDbAddManufacturer } from "../usecases/add-manufacturer-factory";

export const makeAddManufacturerController = (): Controller => {
  const addManufacturerUseCase = makeDbAddManufacturer()
  return new AddManufacturerController(addManufacturerUseCase);
};
