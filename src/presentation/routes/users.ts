import { Router } from "express";
import { adaptRoute } from "../../adapters/express-router-adapter";
import { makeAddUserController } from "../../infra/factory/controllers/add-user-factory";
import { usersValidatorMiddleware } from "../middlewares/users-validator";

export const userRoutes = Router();

userRoutes.post(
  "/",
  usersValidatorMiddleware.validate(),
  adaptRoute(makeAddUserController())
);
