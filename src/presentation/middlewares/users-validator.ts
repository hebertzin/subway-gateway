import { userSchemaValidation } from "../validators/users";
import { DataValidator, ZodValidator } from "./zod-validator-middleware";

export const usersValidatorMiddleware = new DataValidator(
  new ZodValidator(userSchemaValidation)
);
