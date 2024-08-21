import { HttpStatusCode } from "../domain/http";
import { AppError } from "../errors/errors";
import {
  IManufacturerRepository,
  Manufacturer,
  ManufacturerCreateInput,
} from "../repositories/manufacturer";

export interface IManufacturerService {
  invoke(data: ManufacturerCreateInput): Promise<Manufacturer>;
}

export class ManufacturerService implements IManufacturerService {
  constructor(readonly manufacturerRepository: IManufacturerRepository) {}
  async invoke(data: ManufacturerCreateInput): Promise<Manufacturer> {
    try {
      const manufacturer = await this.manufacturerRepository.create(data);
      return manufacturer;
    } catch (error) {
       throw new AppError(
        "Some error has been ocurred trying create a manufacturer",
        HttpStatusCode.InternalServerError
      );
    }
  }
}
