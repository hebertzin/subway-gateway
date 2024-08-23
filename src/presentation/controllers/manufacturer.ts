import { Request } from "express";
import { z } from "zod";
import { Controller, HttpResponse } from "../../domain/controller";
import { HttpStatusCode } from "../../domain/http";
import { loggerService } from "../../logging/logger";
import {
    ManufacturerCreateInput,
    ManufacturerRepository,
} from "../../repositories/manufacturer";
import {
    CreateManufacturerService,
    IManufacturerService,
} from "../../services/manufacturer";

const manufacturerSchemaValidation = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(9, "Phone number must be at least 10 digits"),
  email: z.string().email("Invalid email address"),
  street: z.string().min(1, "Street is required"),
  number: z.string().min(1, "Number is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().length(2, "State must be a 2-letter code"),
  zip_code: z.string().min(1, "zip code is required"),
  website: z.string().url("Invalid website URL"),
});

export class CreateManufacturerController implements Controller {
  constructor(readonly manufacturerService: IManufacturerService) {}

  async handle(request: Request): Promise<HttpResponse> {
    try {
      const data = manufacturerSchemaValidation.parse(
        request.body
      ) as ManufacturerCreateInput;
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
