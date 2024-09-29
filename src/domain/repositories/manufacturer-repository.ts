import { Manufacturer } from "../manufacturer";

export interface AddManufacturerRepository {
  create(data: Manufacturer): Promise<Manufacturer>;
}
