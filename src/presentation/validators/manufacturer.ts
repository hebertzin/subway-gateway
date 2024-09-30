import { z } from "zod";
import { brazilianPhoneRegex, brazilianZipCodeRegex } from "../utils/regex";

export const manufacturerSchemaValidation = z.object({
  name: z
    .string({ message: "Name must be a string" })
    .min(1, "Name is required"),
  phone: z
    .string({ message: "Phone must be a string" })
    .min(10, { message: "Phone number must be at least 10 digits" })
    .regex(brazilianPhoneRegex, {
      message:
        "Phone number must be in the format (XX) XXXXX-XXXX or (XX) XXXX-XXXX",
    }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" }),
  street: z.string().min(1, { message: "Street is required" }),
  number: z.string().min(1, { message: "Number is required" }),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().length(2, { message: "State must be a 2-letter code" }),
  zip_code: z
    .string()
    .min(8, { message: "Zip code must be at least 8 characters" })
    .regex(brazilianZipCodeRegex, {
      message: "Zip code must be in the format XXXXX-XXX",
    }),
  website: z
    .string()
    .url({ message: "Must be a valid URL" })
    .min(1, { message: "URL is required" }),
});
