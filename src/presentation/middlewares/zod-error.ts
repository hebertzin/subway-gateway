import { NextFunction, Request, Response } from 'express';
import { ZodError, z } from 'zod';
import { HttpStatusCode } from '../../domain/http';

export class DataValidator<T extends z.ZodTypeAny> {
  private schema: T;

  constructor(schema: T) {
    this.schema = schema;
  }

  validate() {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        this.schema.parse(req.body);
        next();
      } catch (error) {
        if (error instanceof ZodError) {
          const errorMessages = error.errors.map((issue) => ({
            message: `${issue.path.join('.')} is ${issue.message}`,
          }));
          res
            .status(HttpStatusCode.BadRequest)
            .json({ error: 'Invalid data', details: errorMessages });
        } else {
          res
            .status(HttpStatusCode.InternalServerError)
            .json({ error: 'Internal Server Error' });
        }
      }
    };
  }
}