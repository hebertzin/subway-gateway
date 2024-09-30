import { Router } from "express";
import { manufacturerRoutes } from "./manufacturer";

export const appRoutes = Router();

appRoutes.use("/manufacturer", manufacturerRoutes);
