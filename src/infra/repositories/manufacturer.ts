import type { Manufacturer } from "../../domain/manufacturer";
import { prisma } from "../database/prisma-client";

export interface IManufacturerRepository {
  create(data: Manufacturer): Promise<Manufacturer>;
}
export class ManufacturerRepository implements IManufacturerRepository {
  async create(data: Manufacturer): Promise<Manufacturer> {
    const manufacturer = await prisma.manufacturer.create({
      data: {
        ...data,
      },
    });
    return manufacturer;
  }
}
