import { z } from "zod";

export const authLoginSchema = z.object({
  email: z.string().email("Sorry, but that email is invalid.").min(2, { message: "Email must be 2 characters" }),
});

export type AuthLoginFormValues = z.infer<typeof authLoginSchema>