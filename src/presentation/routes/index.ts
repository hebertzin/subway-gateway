import { Router } from "express";
import { manufacturerRoutes } from "./manufacturer";
import { userRoutes } from "./users";

export const appRoutes = Router();

appRoutes.use("/manufacturer", manufacturerRoutes);
appRoutes.use("/users", userRoutes);
