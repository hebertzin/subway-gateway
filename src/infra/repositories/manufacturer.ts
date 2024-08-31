import { CreateManufacturerInput, Manufacturer } from "../../domain/manufacturer";
import { prisma } from "../database/prisma";

export interface IManufacturerRepository {
  create(data: CreateManufacturerInput): Promise<Manufacturer>;
}

export class ManufacturerRepository implements IManufacturerRepository {
  async create(data: CreateManufacturerInput): Promise<Manufacturer> {
    const manufacturer = await prisma.manufacturer.create({ data });
    return { manufacturer };
  }
}
