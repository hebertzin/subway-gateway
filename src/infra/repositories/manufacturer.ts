import type { Manufacturer } from "../../domain/manufacturer";
import { AddManufacturerRepository } from "../../domain/repositories/manufacturer-repository";
import { prisma } from "../database/prisma-client";

export class ManufacturerRepository implements AddManufacturerRepository {
  async create(data: Manufacturer): Promise<Manufacturer> {
    const manufacturer = await prisma.manufacturer.create({
      data: {
        ...data,
      },
    });
    return manufacturer;
  }
}
