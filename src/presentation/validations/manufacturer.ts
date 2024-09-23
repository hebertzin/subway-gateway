import z from "zod";

export const manufacturerSchemaValidation = z.object({
  name: z
    .string({ message: "Name must be a string" })
    .min(1, "Name is required"),
  phone: z
    .string({ message: "Pone must be a string" })
    .min(9, "Phone number must be at least 10 digits"),
  email: z
    .string()
    .email("Invalid email address")
    .min(1, { message: "Email is required" }),
  street: z.string().min(1, "Street is required"),
  number: z.string().min(1, "Number is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().length(2, "State must be a 2-letter code"),
  zip_code: z.string().min(1, "zip code is required"),
  website: z.string().url("Invalid website URL").min(1, { message: "Url is required"}),
});
