import { Router } from "express";
import { adaptRoute } from "../../adapters/express-router-adapter";
import { makeAddUserController } from "../../infra/factory/controllers/users/add-user-controller-factory";
import { makeDeleteUserController } from "../../infra/factory/controllers/users/delete-user-controller-factory";
import { makeGetUserByIdController } from "../../infra/factory/controllers/users/get-user-by-id-controller-factory";
import { makeGetUsersController } from "../../infra/factory/controllers/users/get-users-controller-factory";
import { makeUpdateUserController } from "../../infra/factory/controllers/users/update-user-controller-factory";
import { usersValidatorMiddleware } from "../middlewares/users-validator";

export const userRoutes = Router();

userRoutes.post(
  "/",
  usersValidatorMiddleware.validate(),
  adaptRoute(makeAddUserController())
);

userRoutes.get("/", adaptRoute(makeGetUsersController()));

userRoutes.get("/:user_id", adaptRoute(makeGetUserByIdController()));

userRoutes.put(
  "/:user_id",
  usersValidatorMiddleware.validate(),
  adaptRoute(makeUpdateUserController())
);

userRoutes.delete("/:user_id", adaptRoute(makeDeleteUserController()));
