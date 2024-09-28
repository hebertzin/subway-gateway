import express, { type Express } from "express";
import { init } from "./infra/database/prisma-client";
import { manufacturerRoutes } from "./presentation/routes/manufacturer";

export class ExpressApp {
  private expressApp: Express;

  constructor() {
    this.expressApp = express();
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.expressApp.use(express.json());
  }

  private routes() {
    this.expressApp.use("/manufacturer", manufacturerRoutes);
  }

  public start(port: number | string) {
     init().catch((err) => {
      return err;
    });
    return this.expressApp.listen(port, () => {});
  }

  public getApp(): Express {
    return this.expressApp;
  }
}
