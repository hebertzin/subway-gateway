import { Manufacturer } from "../../../src/domain/manufacturer";
import { IManufacturerRepository } from "../../../src/infra/repositories/manufacturer";

export class ManufacturerRepositorySpy implements IManufacturerRepository {
  createParams: Manufacturer;
  result: Manufacturer = {
    name: "Fabricante XYZ",
    city: "São Paulo",
    email: "contato@fabricantexyz.com",
    number: "123",
    phone: "+55 (11) 98765-4321",
    state: "SP",
    street: "Avenida Paulista",
    website: "https://www.fabricantexyz.com",
    zip_code: "01310-000",
  };

  async create(data: Manufacturer): Promise<Manufacturer> {
    this.createParams = data;
    return this.result;
  }
}
