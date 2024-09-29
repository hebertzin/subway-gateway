import { Manufacturer } from "../entities/manufacturer";

export interface AddManufacturerRepository {
  create(data: Manufacturer): Promise<Manufacturer>;
}
