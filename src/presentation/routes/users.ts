import { Router } from "express";
import { adaptRoute } from "../../adapters/express-router-adapter";
import { makeAddUserController } from "../../infra/factory/controllers/users/add-user-factory";
import { makeGetUsersController } from "../../infra/factory/controllers/users/get-users-factory";
import { usersValidatorMiddleware } from "../middlewares/users-validator";

export const userRoutes = Router();

userRoutes.post(
  "/",
  usersValidatorMiddleware.validate(),
  adaptRoute(makeAddUserController())
);

userRoutes.get(
  "/",
  adaptRoute(makeGetUsersController())
);
