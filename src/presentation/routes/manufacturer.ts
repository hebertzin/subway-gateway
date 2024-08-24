import { Request, Response, Router } from "express";
import { createManufacturerController } from "../../infra/factory/createManufacturerFactory";
import { DataValidator, ZodValidator } from "../middlewares/zod-error";
import { manufacturerSchemaValidation } from "../validations/manufacturer";

export const manufacturerRoutes = Router();

manufacturerRoutes.post(
  "/",
  new DataValidator(new ZodValidator(manufacturerSchemaValidation)).validate(),
  async (req: Request, res: Response) => {
    const createManufacturerHandler = createManufacturerController();

    const httpResponse = await createManufacturerHandler.handle(req);

    return res.status(httpResponse.statusCode).json({
      message: httpResponse.msg,
      statusCode: httpResponse.statusCode,
      body: httpResponse.body,
    });
  }
);
