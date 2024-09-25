import { Request } from "express";
import { IAddManufacturerUseCase } from "../../application/usecases/manufacturer";
import { Controller, HttpResponse } from "../../domain/controller";
import { HttpStatusCode } from "../../domain/http";
import { Manufacturer } from "../../domain/manufacturer";

export class AddManufacturerController implements Controller {
  constructor(readonly addManufacturerUseCase: IAddManufacturerUseCase) {}
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
