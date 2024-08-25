import { NextFunction, Request, Response } from "express";
import { ZodError, z } from "zod";
import { HttpStatusCode } from "../../domain/http";
import { Validator } from "../../domain/validator";

export class ZodValidator<T> implements Validator<T> {
  private schema: z.ZodSchema<T>;

  constructor(schema: z.ZodSchema<T>) {
    this.schema = schema;
  }

  validate(data: T): void {
    this.schema.parse(data);
  }
}

export class DataValidator<T> {
  private validator: Validator<T>;

  constructor(validator: Validator<T>) {
    this.validator = validator;
  }

  validate() {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        this.validator.validate(req.body);
        next();
      } catch (error) {
        if (error instanceof ZodError) {
          const errorMessages = error.errors.map((issue) => ({
            message: `${issue.path.join(".")} is ${issue.message}`,
          }));
          res
            .status(HttpStatusCode.BadRequest)
            .json({ error: "Invalid data", details: errorMessages });
        } else {
          res
            .status(HttpStatusCode.InternalServerError)
            .json({ error: "Internal Server Error" });
        }
      }
    };
  }
}

