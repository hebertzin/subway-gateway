import { Request, Response, Router } from "express";
import { CreateManufacturerFactory } from "../../infra/factory/createManufacturerFactory";
import { DataValidator } from "../middlewares/zod-error";
import { manufacturerSchemaValidation } from "../validations/manufacturer";

export const manufacturerRoutes = Router();

const createManufacturerFactory = new CreateManufacturerFactory();

manufacturerRoutes.post(
  '/',
  new DataValidator(manufacturerSchemaValidation).validate(),
  async (req: Request, res: Response) => {

    const createManufacturerHandler = createManufacturerFactory.create();

    const httpResponse = await createManufacturerHandler.handle(req);

    return res.status(httpResponse.statusCode).json({
      message: httpResponse.msg,
      statusCode: httpResponse.statusCode,
      body: httpResponse.body,
    });
  }
);