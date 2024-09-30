import express, { type Express } from "express";
import { appRoutes } from "./presentation/routes";

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
    this.expressApp.use("/api/v1", appRoutes);
  }

  public start(port: number | string) {
    return this.expressApp.listen(port, () => {});
  }

  public getApp(): Express {
    return this.expressApp;
  }
}
