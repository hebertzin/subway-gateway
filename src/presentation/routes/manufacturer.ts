import { Request, Response, Router } from "express";
import { createManufacturerHandler } from "../controllers/manufacturer";
import { DataValidator } from "../middlewares/zod-error";
import { manufacturerSchemaValidation } from "../validations/manufacturer";

export const manufacturerRoutes = Router();

manufacturerRoutes.post(
  "/",
  new DataValidator(manufacturerSchemaValidation).validate(),
  async (req: Request, res: Response) => {
    const httpResponse = await createManufacturerHandler.handle(req);
    res.status(httpResponse.statusCode).json({
      message: httpResponse.msg,
      statusCode: httpResponse.statusCode,
      body: httpResponse.body,
    });
  }
);
