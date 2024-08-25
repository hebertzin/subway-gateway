import { Router } from "express";
import { adaptRoute } from "../../adapters/express-router-adapter";
import { makeAddManufacturerController } from "../../infra/factory/controllers/add-manufacturer-controller-factory";
import { zodValidator } from "../middlewares/zod-error";

export const manufacturerRoutes = Router();

manufacturerRoutes.post(
  "/",
  zodValidator.validate,
  adaptRoute(makeAddManufacturerController())
);
