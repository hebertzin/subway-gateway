import { z } from 'zod';
import { brazilianPhoneRegex, brazilianZipCodeRegex } from '../utils/regex';


export const userSchemaValidation = z.object({
  username: z
    .string({ message: "Username must be a string" })
    .min(1, { message: "Username is required" }),
  password: z
    .string({ message: "Password must be a string" })
    .min(6, { message: "Password must be at least 6 characters long" }),
  email: z
    .string({ message: "Email must be a string" })
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" }),
  phone: z
    .string({ message: "Phone must be a string" })
    .min(10, { message: "Phone number must be at least 10 digits" })
    .regex(brazilianPhoneRegex, {
      message: "Phone number must be in the format (XX) XXXXX-XXXX or (XX) XXXX-XXXX",
    }),
  street: z
    .string({ message: "Street must be a string" })
    .min(1, { message: "Street is required" }),
  country: z
    .string({ message: "Country must be a string" })
    .min(1, { message: "Country is required" }),
  nationality: z
    .string({ message: "Nationality must be a string" })
    .min(1, { message: "Nationality is required" }),
  state: z
    .string({ message: "State must be a string" })
    .length(2, { message: "State must be a 2-letter code" }),
  city: z
    .string({ message: "City must be a string" })
    .min(1, { message: "City is required" }),
  postal_code: z
    .string({ message: "Postal code must be a string" })
    .min(5, { message: "Postal code must be at least 5 characters long" })
    .regex(brazilianZipCodeRegex, {
      message: "Postal code must be in the format XXXXX-XXX",
    }),
  gender: z
    .string({ message: "Gender must be a string" })
    .min(1, { message: "Gender is required" }),
  date_of_birth: z
    .string({ message: "Date of birth must be a string" })
    .regex(
      /^\d{2}\/\d{2}\/\d{2}$/,
      { message: "Date of birth must be in the format DD/MM/YY" }
    ),
  languages: z
    .string({ message: "Languages must be a string" })
    .min(1, { message: "Languages is required" }),
});
