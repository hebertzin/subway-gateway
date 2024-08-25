import { Manufacturer, ManufacturerCreateInput } from "../../domain/manufacturer";
import { prisma } from "../database/prisma";

export interface IManufacturerRepository {
  create(data: ManufacturerCreateInput): Promise<Manufacturer>;
}

export class ManufacturerRepository implements IManufacturerRepository {
  async create(data: ManufacturerCreateInput): Promise<Manufacturer> {
    const manufacturer = await prisma.manufacturer.create({ data });
    return { manufacturer };
  }
}
