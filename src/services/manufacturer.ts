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
      const manufacturer = await this.manufacturerRepository.create(data);
      return manufacturer;
  }
}
