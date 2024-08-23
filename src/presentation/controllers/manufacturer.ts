import { Request } from "express";
import { IManufacturerUseCase } from "../../application/usecases/manufacturer";
import { Controller, HttpResponse } from "../../domain/controller";
import { HttpStatusCode } from "../../domain/http";
import { ManufacturerCreateInput } from "../../infra/repositories/manufacturer";

export class CreateManufacturerController implements Controller {
  constructor(readonly manufacturerService: IManufacturerUseCase) {}

  async handle(request: Request): Promise<HttpResponse> {
    try {
      const data = request.body as ManufacturerCreateInput;
      const manufacturer = await this.manufacturerService.execute(data);
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
