import { Manufacturer } from "../manufacturer";

export interface AddManufacturer {
  execute(data: Manufacturer): Promise<Manufacturer>;
}
