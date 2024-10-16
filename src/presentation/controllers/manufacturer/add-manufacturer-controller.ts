import { Request } from "express";
import { Controller, HttpResponse } from "../../../domains/controller";
import { Manufacturer } from "../../../domains/entities/manufacturer";
import { HttpStatusCode } from "../../../domains/http";
import { AddManufacturer } from "../../../domains/usecases/manufacturer/add-manufacturer-use-case";

export class AddManufacturerController implements Controller {
  constructor(readonly addManufacturerUseCase: AddManufacturer) {}
  async handle(request: Request): Promise<HttpResponse> {
    try {
      const data = request.body as Manufacturer;
      const manufacturer = await this.addManufacturerUseCase.execute(data);
      return {
        msg: "Manufacturer created successfully",
        statusCode: HttpStatusCode.Created,
        body: manufacturer,
      };
    } catch (error) {
      return {
        msg: error.message,
        statusCode: error.statusCode,
      };
    }
  }
}
