import { Request } from "express";
import { Controller, HttpResponse } from "../domain/controller";
import { HttpStatusCode } from "../domain/http";
import { ManufacturerCreateInput } from "../repositories/manufacturer";
import { IManufacturerService } from "../services/manufacturer";

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
        msg: error.message,
        statusCode: error.code,
        body: error,
      };
    }
  }
}
