import { Request, Response } from "express";
import { Controller, HttpResponse } from "../domain/controller";

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    try {
      const response: HttpResponse = await controller.handle(req);
      if (response.statusCode >= 200 && response.statusCode <= 299) {
        res.status(response.statusCode).json(response);
      } else {
        res.status(response.statusCode).json({
          error: response.msg,
        });
      }
    } catch (error) {
      return res.status(error.statusCode).json({
        msg: "An unexpected error occurred.",
        error,
      });
    }
  };
};
