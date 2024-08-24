import { AddManufacturerController } from "../../../presentation/controllers/manufacturer";
import { makeDbAddManufacturer } from "../usecases/add-manufacturer-factory";

export const makeAddManufacturerController = (): AddManufacturerController => {
  const addManufacturerUseCase = makeDbAddManufacturer()
  return new AddManufacturerController(addManufacturerUseCase);
};