import { Request } from "express";
import { Controller, HttpResponse } from "../../domain/controller";
import { Manufacturer } from "../../domain/entities/manufacturer";
import { HttpStatusCode } from "../../domain/http";
import { AddManufacturer } from "../../domain/usecases/manufacturer/add-manufacturer-use-case";

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
