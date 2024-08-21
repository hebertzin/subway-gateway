import { Request } from "express";
import { ManufacturerCreateInput } from "../repositories/manufacturer";
import { Controller, HttpResponse } from "../domain/controller";
import { IManufacturerService } from "../services/manufacturer";
import { HttpStatusCode } from "../domain/http";

export class ManufacturerController implements Controller {
  constructor(readonly manufacturerService: IManufacturerService) {}

  async handle(request: Request): Promise<HttpResponse> {
    try {
      const data = request.body as ManufacturerCreateInput;
      const manufacturer = await this.manufacturerService.invoke(data);
      return {
        msg: "Manufacturer created successfully",
        statusCode: HttpStatusCode.Created,
        body: manufacturer,
      };
    } catch (error) {
      return {
        msg: "Failed to create manufacturer",
        statusCode: HttpStatusCode.InternalServerError,
        body: error,
      };
    }
  }
}
