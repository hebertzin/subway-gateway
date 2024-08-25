import { manufacturerSchemaValidation } from "../validations/manufacturer";
import { DataValidator, ZodValidator } from "./zod-validator-middleware";

export const manufacturerValidatorMiddleware = new DataValidator(
  new ZodValidator(manufacturerSchemaValidation)
);
