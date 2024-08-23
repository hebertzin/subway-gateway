import { Request } from "express";
import {
  CreateManufacturerService,
  IManufacturerService,
} from "../../application/usecases/manufacturer";
import { Controller, HttpResponse } from "../../domain/controller";
import { HttpStatusCode } from "../../domain/http";
import { loggerService } from "../../infra/logging/logger";
import {
  ManufacturerCreateInput,
  ManufacturerRepository,
} from "../../infra/repositories/manufacturer";

export class CreateManufacturerController implements Controller {
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
        statusCode: error.statusCode,
      };
    }
  }
}

export const createManufacturerHandler = new CreateManufacturerController(
  new CreateManufacturerService(new ManufacturerRepository(), loggerService)
);
