import { Manufacturer } from "../entities/manufacturer";

export interface AddManufacturer {
  execute(data: Manufacturer): Promise<Manufacturer>;
}
