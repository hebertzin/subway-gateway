import type { Manufacturer } from "../../../domain/entities/manufacturer";
import { AddManufacturerRepository } from "../../../domain/repositories/manufacturer/add-manufacturer-repository";
import { prisma } from "../prisma-client";

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
