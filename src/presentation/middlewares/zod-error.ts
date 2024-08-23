import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { HttpStatusCode } from "../../domain/http";

class ZodErrorHandler {
  public handle(err: unknown, _req: Request, res: Response, next: NextFunction) {
    if (err instanceof ZodError) {
      const formattedErrors = err.errors.map((e) => ({
        path: e.path.join("."),
        message: e.message,
      }));

      return res.status(HttpStatusCode.BadRequest).json({
        msg: "Validation error",
        errors: formattedErrors,
      });
    }

    next(err);
  }
}

export const zodErrorHandler = new ZodErrorHandler();
