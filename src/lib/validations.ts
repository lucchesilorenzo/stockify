import { z } from "zod";

export const authFormSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Invalid email address."),
  password: z
    .string()
    .trim()
    .min(1, "Password is required.")
    .max(20, "Password is too long."),
});

export type TAuthFormSchema = z.infer<typeof authFormSchema>;
