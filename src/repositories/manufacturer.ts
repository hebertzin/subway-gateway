import { prisma } from "../database/prisma";

export type Manufacturer =  {
  manufacturer : ManufacturerCreateInput;
}

export type ManufacturerCreateInput = {
  name: string;
  phone: string;
  email: string;
  street: string;
  number: string;
  city: string;
  state: string;
  zip_code: string;
  website: string;
};


export interface IManufacturerRepository {
  create(data: ManufacturerCreateInput): Promise<Manufacturer>;
}

export class ManufacturerRepository implements IManufacturerRepository {
  async create(data: ManufacturerCreateInput): Promise<Manufacturer> {
    const manufacturer = await prisma.manufacturer.create({ data })
    return { manufacturer};
  }
}
