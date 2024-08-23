import { Request, Response, Router } from "express";
import { createManufacturerHandler } from "../controllers/manufacturer";

export const manufacturerRoutes = Router();

manufacturerRoutes.post("/", async (req: Request, res: Response) => {
  const httpResponse = await createManufacturerHandler.handle(req);
  res.status(httpResponse.statusCode).json({
    message: httpResponse.msg,
    statusCode: httpResponse.statusCode,
    body: httpResponse.body,
  });
});
