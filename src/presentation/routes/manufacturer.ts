import { Router } from "express";
import { adaptRoute } from "../../adapters/express-router-adapter";
import { makeAddManufacturerController } from "../../infra/factory/controllers/add-manufacturer-controller-factory";
import { manufacturerValidatorMiddleware } from "../middlewares/manufacturer-validator";

export const manufacturerRoutes = Router();

manufacturerRoutes.post(
  "/",
  manufacturerValidatorMiddleware.validate(),
  adaptRoute(makeAddManufacturerController())
);
