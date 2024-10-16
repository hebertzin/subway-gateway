import { Router } from "express";
import { adaptRoute } from "../../adapters/express-router-adapter";
import { makeAddUserController } from "../../infra/factory/controllers/add-user-factory";

export const userRoutes = Router();

userRoutes.post("/", adaptRoute(makeAddUserController()));
